import Location from "@/models/LocationInfo";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const POST = async (request: any) => {
  const { locationName } = await request.json();

  await connect();

  try {
    const location = await Location.findOne({ locationName });
    if (location) {
      const locationId = location.locationId; 
      console.log("LocationId:", locationId);
      return new NextResponse(JSON.stringify({ locationId }), { status: 200 });
    } else {
      console.log("Location not found");
      return new NextResponse("Location not found", { status: 301 });
    }
  } catch (err) {
    console.error("Error finding location:", err);
    return new NextResponse("Error finding location", { status: 500 });
  }
};
