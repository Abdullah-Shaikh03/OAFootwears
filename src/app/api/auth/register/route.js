import dbConfig from "@/db/dbConfig";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


dotenv.config();

const POST = async (req) => {

    try {
        await dbConfig();
        const { phone, email, password, storeDetails } = await req.body;
        const user = await userModel.findOne({ email })

        if (user){
            return NextResponse.json({ message: 'User already exists' }, 400)
        }

        const salt = await bcryptjs.genSalt(process.env.SALT);

        const newUser = new userModel({
            phone,
            storeDetails,
            email,
            password: await bcryptjs.hash(password, salt)
        }).save();

        console.log(newUser)

        alert('User registered Return to login page.')
        
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, 500)
    }
}