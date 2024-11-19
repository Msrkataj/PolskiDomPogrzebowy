import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, phoneNumber, preferredTime } = req.body;

        // Sprawdzenie, czy wszystkie wymagane dane są podane
        if (!firstName || !lastName || !phoneNumber || !preferredTime) {
            return res.status(400).json({ error: 'Brak wymaganych danych' });
        }

        // Konfiguracja Nodemailer z użyciem SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'poldompogrzebowy@gmail.com',  // Twoje konto Gmail
                pass: process.env.EMAIL_APP_PASSWORD,  // Hasło aplikacji Gmail
            },
        });

        const mailOptions = {
            from: `"Wsparcie" <poldompogrzebowy@gmail.com>`,  // Adres e-mail serwera
            to: 'poldompogrzebowy@gmail.com',  // Ostateczny odbiorca wiadomości (administrator)
            subject: `Prośba o kontakt: ${firstName} ${lastName}`,
            html: `
                <h2>Prośba o kontakt z psychologiem</h2>
                <p><strong>Imię:</strong> ${firstName}</p>
                <p><strong>Nazwisko:</strong> ${lastName}</p>
                <p><strong>Numer telefonu:</strong> ${phoneNumber}</p>
                <p><strong>Preferowana pora kontaktu:</strong> ${preferredTime}</p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'E-mail został wysłany.' });
        } catch (error) {
            console.error('Błąd podczas wysyłania e-maila:', error);
            res.status(500).json({ error: 'Błąd podczas wysyłania e-maila' });
        }
    } else {
        res.status(405).json({ error: 'Metoda niedozwolona' });
    }
}
