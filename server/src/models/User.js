import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
