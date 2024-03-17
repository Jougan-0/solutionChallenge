import Location from "@/models/Location";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
interface Student {
    studentId: string;
    name: string;
    age: number;
    level: number;
    _id: string;
  }

  function filterStudentsByName(locationData: { students: Student[] }, nameToFilter: string): Student[] {
    return locationData.students.filter(student => student.name === nameToFilter);
}
async function editStudent(locationId:any,studentId:any,age:any,level:any) {
    const response = await fetch('http://localhost:3000/api/editStudent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locationId:locationId , studentId:studentId , newAge: parseInt(age),level:parseInt(level)}),
    });
  
    if (response.ok) {
        return new NextResponse("Edit the value", { status: 200 });

    } else {
        return new NextResponse("error editing the values", { status: 400 });
    }
  };

  async function addStudent(locationName:any, studentName:any, age:any, level:any) {
    const response = await fetch('http://localhost:3000/api/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locationName, studentName, age, level }),
    });

    if (response.ok) {
        return new NextResponse("Student added", { status: 200 });

    } else {
        return new NextResponse("error editing the values", { status: 400 });
    }
  };
export const POST = async (request: any) => {
    const { locationId,locationName, StudentName, StudentAge, StudentLevel } = await request.json();
    await connect();
  
    try {
        if (locationId===0){
                addStudent(locationName,StudentName,StudentAge,StudentLevel)
                return new NextResponse("Data added", { status: 200 });
        }
      const locationInfo = await Location.findOne({ locationId });
        const filteredStudents = filterStudentsByName(locationInfo, StudentName);
        if (filteredStudents.length === 0) {
          addStudent(locationInfo.name,StudentName,StudentAge,StudentLevel)
          return new NextResponse("Data added", { status: 200 });
        } else {
          const student = filteredStudents[0]; 
          editStudent(locationInfo.locationId,student.studentId,StudentAge,StudentLevel)
          return new NextResponse("Data edited", { status: 200 });
        }
      
    } catch (err) {
    
      return new NextResponse(JSON.stringify({ err }), { status: 500 });
    }
  };
  