const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Konfiguracja transportera Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Możesz użyć innego dostawcy lub SMTP
    auth: {
        user: 'poldompogrzebowy@gmail.com', // Twój e-mail
        pass: 'coih rrgh vxep aslc', // Twoje hasło do e-maila
    },
});



exports.sendEmail = functions.https.onCall(async (data, context) => {
    const { to, subject, text } = data;

    const mailOptions = {
        from: 'poldompogrzebowy@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email: ', error);
        return { success: false, error: error.message };
    }
});
