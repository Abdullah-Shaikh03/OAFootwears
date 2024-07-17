// src/app/api/contact.js

import nodemailer from 'nodemailer';

export async function POST(req, res) {
  const { email, phone, storeDetails, message } = await req.json();

  if (!email || !phone || !storeDetails || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your preferred email service
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL, // or any email where you want to receive the contact form details
    subject: 'New Contact Form Submission',
    text: `Email: ${email}\nPhone: ${phone}\nStore Details: ${storeDetails}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
