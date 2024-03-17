import Location from "@/models/Location";
import { NextResponse } from "next/server";

export const PUT = async (request: any) => {
    const { locationId, studentId, newName, newAge,level,Image } = await request.json();

    let location = await Location.findOne({ locationId: locationId });

    if (!location) {
        return new NextResponse("Location not found", { status: 404 });
    }

    const studentIndex:any = location.students.findIndex((student:any) => String(student.studentId) === studentId);

    if (studentIndex === -1) {
        return new NextResponse("Student not found in location", { status: 404 });
    }

    location.students[studentIndex].name = newName;
    location.students[studentIndex].age = newAge;
    location.students[studentIndex].level = level;
    location.students[studentIndex].Image = Image;


    try {
        await location.save();
        return new NextResponse("Student details updated successfully", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};
