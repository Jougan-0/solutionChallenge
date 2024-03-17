import Location from "@/models/Location";
import { NextResponse } from "next/server";
import connect from "@/utils/db"
import { v4 as uuidv4 } from "uuid";

export const POST = async (request: any) => {
    const {  locationName} = await request.json();
    await connect();
    const locationId = uuidv4();
    const newLocation = new Location({
        locationId:locationId,
        name: locationName,
        students: [],
    });

    try {
        await newLocation.save();
        return new NextResponse("Student added to location successfully", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};
