import dbConfig from "@/db/dbConfig";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/navigation";

dotenv.config();

const GET = async (req, res) => {


    try {
        await dbConfig();
        const { email, password } = await req.body;
        const user = await userModel.findOne({ email})

        if (!user || !bcryptjs.compareSync(password, user.password)) {
            return NextResponse.json({ message: 'Email or password is wrong' }, 400)
        }
        
        return NextResponse.json({ message: 'Login successful' }, 200)

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, 500)
    }
}
