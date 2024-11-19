// pages/api/send-email.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, subject, message } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ error: 'Brak wymaganych danych' });
        }

        // Konfiguracja Nodemailer z użyciem SMTP i Hasła Aplikacji
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'poldompogrzebowy@gmail.com',
                pass: process.env.EMAIL_APP_PASSWORD, // Używamy hasła aplikacji
            },
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            return res.status(400).json({ error: 'Nieprawidłowy adres e-mail' });
        }

        // Ustawienia e-maila
        const mailOptions = {
            from: '"Polski Dom Pogrzebowy" <poldompogrzebowy@gmail.com>',
            to: to,
            subject: subject,
            html: message,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'E-mail został wysłany' });
        } catch (error) {
            console.error('Błąd podczas wysyłania e-maila:', error);
            res.status(500).json({ error: 'Błąd podczas wysyłania e-maila' });
        }
    } else {
        res.status(405).json({ error: 'Metoda niedozwolona' });
    }
}
