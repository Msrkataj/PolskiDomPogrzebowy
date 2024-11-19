import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fullName, email, phone, subject, message } = req.body;

        // Sprawdzenie, czy wszystkie wymagane dane są podane
        if (!fullName || !email || !phone || !subject || !message) {
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

        // Stylizacja wiadomości HTML
        const mailOptions = {
            from: `"${fullName}" <poldompogrzebowy@gmail.com>`,  // Adres e-mail serwera
            replyTo: email,  // Adres e-mail użytkownika do odpowiedzi
            to: 'poldompogrzebowy@gmail.com',  // Ostateczny odbiorca wiadomości (administrator)
            subject: `Nowa wiadomość od ${fullName}: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <div style="text-align: center; padding-bottom: 20px;">
                        <img src="https://polskidompogrzebowy.pl/assets/logo-black.png" alt="Polski Dom Pogrzebowy" style="width: 250px; height: auto;" />
                    </div>
                    <h2 style="color: #333; text-align: center;">Nowa wiadomość z formularza kontaktowego</h2>
                    <p style="font-size: 16px; color: #555;">Otrzymano nową wiadomość z formularza kontaktowego:</p>
                    <table style="width: 100%; font-size: 16px; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Imię i Nazwisko:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${fullName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Telefon:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Temat:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Wiadomość:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${message}</td>
                        </tr>
                    </table>
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="font-size: 14px; color: #999;">Wiadomość wysłana przez formularz kontaktowy <a href="https://polskidompogrzebowy.pl" style="color: #4CAF50; text-decoration: none;">Polski Dom Pogrzebowy</a></p>
                                            <p style="font-size: 14px; color: #999;">Odpowiedź, będzie automatycznie kierowana do ${email}</p>
                    </div>
                </div>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Wiadomość została wysłana!' });
        } catch (error) {
            console.error('Błąd podczas wysyłania e-maila:', error);
            res.status(500).json({ error: 'Błąd podczas wysyłania e-maila' });
        }
    } else {
        res.status(405).json({ error: 'Metoda niedozwolona' });
    }
}
