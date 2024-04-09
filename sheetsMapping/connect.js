const mongoose = require('mongoose');
const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');
const Mongo_url = `mongodb+srv://shlokmishr08:${process.argv[3]}@cluster0.evqge0k.mongodb.net/?retryWrites=true&w=majority`;
const credentials = JSON.parse(Buffer.from(process.argv[2], 'base64').toString('utf-8'));
const { Schema } = mongoose;

const locationInfoSchema = new Schema({
  locationId: {
      type: String,
      unique: true,
      required: true,
  },
  locationName: {
      type: String,
      unique:false,
      required: true,
  },
});

const LocationInfo = mongoose.models.LocationInfo || mongoose.model("LocationInfo", locationInfoSchema);


const studentSchema = new Schema({
  studentId: {
      type: String,
      required: true,
      unique: true,
  },
  name: String,
  age: Number,
  level:Number,
  Image:String,
  fatherName:String,
  school:String,
  division:String,
  phoneNumber:Number,
});


function filterStudentsByName(locationData, nameToFilter) {
  const filteredStudents = [];
  for (let i = 0; i < locationData.students.length; i++) {
    const student = locationData.students[i];
    if (student.name === nameToFilter) {
      filteredStudents.push(student);
    }
  }
  return filteredStudents;
}

const locationSchema = new Schema({
  locationId: {
      type: String,
      required: true,
      unique: true,
  },
  name: {
      type: String,
      unique: true,
      required: true,
  },
  students: [studentSchema],
});
const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(Mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Mongoose Connection successfully established.")
  } catch (error) {
    throw new Error("Error connecting to Mongoose")
  }
};


const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

const getLocationId = async (locationName) => {
  await connect();
  let locationId=0
  try {
    const location = await LocationInfo.findOne({ locationName });
    if (location) {
      const locationId = location.locationId;
      return { status: 200, body: JSON.stringify({ locationId }) };
    } else {
      return { status: 301, body: JSON.stringify({ locationId }) };
    }
  } catch (err) {
    return { status: 500, body: "Error finding location" };
  }
};
const addStudent=async(currentlocationId,locationName,StudentName,StudentAge,StudentLevel,FatherName,PhNumber,Class,School)=>{
  await connect();
  const studentId = uuidv4();
  try {
      let location = await Location.findOne({ name: locationName });
          location.students.push({ studentId, name: StudentName, age: StudentAge,level:StudentLevel,FatherName:FatherName,phoneNo:PhNumber,class:Class,school:School });
      await location.save();
      return { status: 200, body: "Student added successfully" };
    } catch (err) {
      return { status: 500, body: {err}};
    }
}
const editStudent=async(locationId, studentId, newName, newAge,level,FatherName,PhNumber,Class,School)=>{
  let location = await Location.findOne({ locationId: locationId });

  if (!location) {
      return { status: 404, body: "Error finding the location" };
  }

  const studentIndex = location.students.findIndex((student) => String(student.studentId) === studentId);

  if (studentIndex === -1) {
    return { status: 404, body: "Student location not found" };
  }

  location.students[studentIndex].name = newName;
  location.students[studentIndex].age = newAge;
  location.students[studentIndex].level = level;
  location.students[studentIndex].FatherName = FatherName;
  location.students[studentIndex].phoneNo = PhNumber;
  location.students[studentIndex].class = Class;
  location.students[studentIndex].school = School;

  try {
      await location.save();
      return { status: 200, body: "Student updated successfully" };
  } catch (err) {
    return { status: 500, body: {err}};
  }
}

const addStudentbyname = async (locationId, locationName, StudentName, StudentAge, StudentLevel,FatherName,PhNumber,Class,School) => {
    await connect();
    try {
        if (locationId===0){
                return { status: 200, body: "Data added" };
              }
      const locationInfo = await Location.findOne({locationId });
        const filteredStudents = filterStudentsByName(locationInfo, StudentName);
        if (filteredStudents.length===0) {
          addStudent(locationId,locationName,StudentName,StudentAge,StudentLevel,FatherName,PhNumber,Class,School )
          return { status: 200, body: "Data added" };
        } else {
          const student = filteredStudents[0]; 
          editStudent(locationId,student.studentId,StudentName,StudentAge,StudentLevel,FatherName,PhNumber,Class,School)
          return { status: 201, body: "Data edited" };
        }
      
    } catch (err) {
    
      return { status: 200, body: {err} };
    }
  
};
async function insertLocation() {
  try {
     const locationResponse = await sheets.spreadsheets.values.get({
       spreadsheetId: '1Dv7-CBdsu-wDpzF3EH5GH3spBXdKo7K_TKqIqRylkiQ',
       range: 'Sheet2!A2:A',
     });
     const locationValues = locationResponse.data.values;
     await connect();
 
     const locationPromises = locationValues.map(async (row) => {
       const [location] = row;
       console.log(location);
       const resp = await getLocationId(location);
       const bodyObj = JSON.parse(resp.body);
       const locationId = bodyObj.locationId;
       if (locationId == 0) {
        const newLocationId = String(uuidv4());
        const locationInfo = new LocationInfo({
           locationId: newLocationId,
           locationName: location,
         });
         const newlocation = new Location({
          name: location,
          locationId: newLocationId,
          students: []
        });
        
        console.log(newlocation);
         await locationInfo.save();
         await newlocation.save();
       }
     });
 
     await Promise.all(locationPromises);
     return
  } catch (err) {
     console.error(err);
     throw err; 
  }
 }
 
async function getSheetValues() {
  try {
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Dv7-CBdsu-wDpzF3EH5GH3spBXdKo7K_TKqIqRylkiQ',
      range: 'Sheet1!A2:H',
    });
    const values = response.data.values;
    await connect();
    if (!values) {
      console.log('No data found.');
      return [];
    } else {
      const Details = values.map((row) => {
        const [name, age, level, locationName,Father,PhNumber,Class,School] = row;
        return { name, age, level, locationName,Father,PhNumber,Class,School  };
      });
      for (const detail of Details) {
        const response = await getLocationId(detail.locationName);
        const bodyObj = JSON.parse(response.body);
        const locationId = bodyObj.locationId;
        const res = await addStudentbyname(
          locationId,
          detail.locationName,
          detail.name,
          detail.age,
          detail.level,
          detail.Father,
          detail.PhNumber,
          detail.Class,
          detail.School
        );
        if (res.status===200){
          console.log(`${detail.name}'s data successfully added to the database`)
        }else if(res.status===201){
          console.log(`${detail.name}'s data successfully edited in the database`)
        }
      };
    }
    setTimeout(() => {
      process.exit(0); 
    }, 20000); 
  } catch (err) {
    console.error('The API returned an error:', err);
    return [];
  }
}
insertLocation().then(()=> getSheetValues()).catch((err)=> console.log(err))

