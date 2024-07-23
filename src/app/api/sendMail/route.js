import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const { email, phone, storeDetails, message } = await req.json();


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Enquiry from O&A Footwears',
      text: `
        Email: ${email}
        Phone: ${phone}
        Store Details: ${storeDetails}
        Message: ${message}
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', result);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
