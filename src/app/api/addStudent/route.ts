import Location from "@/models/Location";
import LocationInfo from "@/models/LocationInfo";

import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const POST = async (request: any) => {
    const { locationName, studentName, age,level,image } = await request.json();
    await connect();
    
    const studentId = uuidv4();
    try {
        let location = await Location.findOne({ name: locationName });

        if (!location) {
            const locationId = uuidv4();
            
            location = new Location({
                locationId:locationId,
                name: locationName,
                students: [{ studentId, name: studentName, age: age,level:level,Image:image }],
            });

            const locationInfo = new LocationInfo({
                locationId: location.locationId,
                locationName: location.name,
            });
            await locationInfo.save();
        } else {
            location.locationId=location.locationId
            location.students.push({ studentId, name: studentName, age: age,level:level,Image:image });
        }
        await location.save();
        
        
        return new NextResponse("Student added to location successfully", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};
