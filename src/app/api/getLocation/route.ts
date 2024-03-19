import Location from "@/models/LocationInfo";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";

export const POST = async (req: NextRequest) => {
    await connect();

    try {
        const locations = await Location.find({});
        return new NextResponse(JSON.stringify(locations), { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};
