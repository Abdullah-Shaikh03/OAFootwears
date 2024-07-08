const mailer = require('nodemailer');

const sendMail = async ({email, subject, text}) => {
    try{
        const transporter = mailer.createTransport
        ({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
        }})
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: text
        }

        const mailRes = await transporter.sendMail(mailOptions)
        return mailRes

    }
    catch(error){
        throw new Error(error.message)
        console.log(Error)
    }
}

module.exports = sendMail;