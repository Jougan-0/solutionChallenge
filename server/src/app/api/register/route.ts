import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { email, password,firstName,lastName,phoneNumber,city,address } = await request.json();

    await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        city,
        address
    });

    try {
        await newUser.save();
        return new NextResponse("user is registered", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
}