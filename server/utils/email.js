const nodemailer = require('nodemailer');

// Initialize Transporter
// This uses a test account by default, or real SMTP credentials from .env
const createTransporter = async () => {
    // If we have real credentials in .env, use them (e.g., Gmail, SendGrid, Mailtrap)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    // Otherwise, create a temporary test account using Ethereal (great for local testing)
    const testAccount = await nodemailer.createTestAccount();
    console.log(`[Email] Switched to Ethereal Testing Mail. User: ${testAccount.user}`);
    
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
};

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = await createTransporter();
        
        const mailOptions = {
            from: '"Sagar Raj Green" <noreply@sagarrajagro.com>',
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        
        // Nodemailer provides a preview URL if using ethereal test accounts
        if (!process.env.SMTP_HOST) {
            console.log("Email Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        return info;
    } catch (error) {
        console.error("Failed to send email: ", error);
        throw error;
    }
};

module.exports = {
    sendEmail
};
