import mongoose from "mongoose";

const { Schema } = mongoose;

const locationInfoSchema = new Schema({
    locationId: {
        type: String,
        unique: true,
        required: true,
    },
    locationName: {
        type: String,
        required: true,
    },
});

const LocationInfo = mongoose.models.LocationInfo || mongoose.model("LocationInfo", locationInfoSchema);

export default LocationInfo;
