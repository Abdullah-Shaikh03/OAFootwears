import dbConfig from "@/db/dbConfig";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

dotenv.config();

export async function POST(req) {
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

        const { email, password } = body;
        const user = await userModel.findOne({ email });

        if (!user || !bcryptjs.compareSync(password, user.password)) {
            return NextResponse.json({ message: 'Email or password is wrong' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
