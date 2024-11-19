// pages/api/send-email.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Brak wymaganych danych' });
        }

        console.log('Hasło aplikacji:', process.env.EMAIL_APP_PASSWORD); // Usuń w produkcji

        // Konfiguracja Nodemailer z użyciem SMTP i Hasła Aplikacji
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'poldompogrzebowy@gmail.com',
                pass: process.env.EMAIL_APP_PASSWORD, // Używamy hasła aplikacji
            },
        });
        console.log('Hasło aplikacji:', process.env.EMAIL_APP_PASSWORD); // Usuń w produkcji

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Nieprawidłowy adres e-mail' });
        }

        // Ustawienia e-maila
        const mailOptions = {
            from: '"Polski Dom Pogrzebowy" <poldompogrzebowy@gmail.com>',
            to: email,
            subject: 'Twoje dane do logowania',
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://polskidompogrzebowy.pl/assets/logo.webp" alt="Polski Dom Pogrzebowy" style="width: 40%; height: auto;" />
        </div>

        <h2 style="text-align: center; color: #333;">Witaj w Polskim Domu Pogrzebowym!</h2>

        <p style="color: #555; font-size: 16px;">
          Twoje konto zostało pomyślnie utworzone, a poniżej znajdziesz dane do logowania:
        </p>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0; font-size: 16px;"><strong>Hasło:</strong> ${password}</p>
        </div>

        <p style="color: #555; font-size: 16px;">
          Aby zalogować się na swoje konto, kliknij poniższy link:
        </p>

        <div style="text-align: center; margin: 20px 0;">
          <a href="https://polskidompogrzebowy.pl/login-dom" style="padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Zaloguj się</a>
        </div>

        <p style="color: #555; font-size: 16px;">
          Po zalogowaniu się, przeprowadzimy Cię przez proces rejestracji w panelu administracyjnym Twojego domu pogrzebowego.
        </p>

        <p style="color: #555; font-size: 16px;">
          Dziękujemy za zaufanie i dołączenie do naszej platformy. Jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy, nie wahaj się z nami skontaktować.
        </p>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #888; font-size: 14px;">© 2024 Polski Dom Pogrzebowy</p>
          <p style="color: #888; font-size: 14px;">Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    `,
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
