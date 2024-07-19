import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: process.env.PORT || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, phone, storeDetails, message } = req.body;

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: 'abd971153@gmail.com',
      subject: 'Contact Form Submission',
      text: `
        Email: ${email}
        Phone: ${phone}
        Store Details: ${storeDetails}
        Message: ${message}
      `,
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent:', result);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
