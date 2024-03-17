import mongoose from "mongoose";

const { Schema } = mongoose;

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
    // Add other student details as needed
});

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
    students: [studentSchema], // Embed the student schema to represent many students in a location
    
    // Add other location details as needed
});
const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;
