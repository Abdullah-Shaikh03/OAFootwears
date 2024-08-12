import dbConfig from "@/db/dbConfig";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

dotenv.config();

export const POST = async (req) => {
    try {
        await dbConfig();

        const contentType = req.headers.get('content-type');
        let body;

        if (contentType === 'application/json') {
            body = await req.json();
        } else if (contentType === 'application/x-www-form-urlencoded') {
            const formData = await req.text();
            body = Object.fromEntries(new URLSearchParams(formData));
        } else {
            return NextResponse.json({ message: 'Unsupported content type' }, { status: 415 });
        }

        const { phone, email, password, storeDetails, roles } = body;
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(parseInt(process.env.SALT, 10));
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await new User({
            phone,
            storeDetails,
            email,
            password: hashedPassword,
            roles: roles || ["user"], // Assign roles or default to "user"
        }).save();

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
};
