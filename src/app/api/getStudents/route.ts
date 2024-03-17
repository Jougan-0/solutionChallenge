import Location from "@/models/Location";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const GET = async () => {
    await connect();

    try {
        const locations = await Location.find({});
        return new NextResponse(JSON.stringify(locations), { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};
