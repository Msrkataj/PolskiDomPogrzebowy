import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { db } from '../../../firebase';
import { doc, updateDoc, getDocs, query, where, collection } from 'firebase/firestore';
import dayjs from 'dayjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Brak wymaganych danych.' });
        }

        // Generowanie tokena resetowania hasła
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = dayjs().add(24, 'hour').toDate(); // Token ważny przez 24 godziny

        try {
            // Znalezienie domu pogrzebowego na podstawie e-maila
            const q = query(collection(db, 'forms'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return res.status(404).json({ error: 'Client o podanym adresie e-mail nie istnieje.' });
            }

            const funeralHomeDoc = querySnapshot.docs[0]; // Zakładam, że e-mail jest unikalny
            const funeralHomeRef = doc(db, 'forms', funeralHomeDoc.id);

            // Zapisz token i datę wygaśnięcia w bazie danych domu pogrzebowego
            await updateDoc(funeralHomeRef, {
                resetToken: resetToken,
                resetTokenExpires: resetTokenExpires,
            });

            // Konfiguracja transportera Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'poldompogrzebowy@gmail.com',
                    pass: process.env.EMAIL_APP_PASSWORD,  // Hasło aplikacji Gmail
                },
            });

            // Ustawienia wiadomości e-mail
            const mailOptions = {
                from: '"Polski Dom Pogrzebowy" <poldompogrzebowy@gmail.com>',
                to: email,
                subject: 'Resetowanie hasła',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <div style="text-align: center; padding: 20px; background-color: #f7f7f7;">
                            <img src="https://polskidompogrzebowy.pl/assets/logo-black.png" alt="Polski Dom Pogrzebowy" style="width: 200px; height: auto;" />
                        </div>
                        <div style="padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; margin: 20px;">
                            <h2 style="color: #333;">Resetowanie hasła</h2>
                            <p style="font-size: 16px; color: #555;">
                                Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w serwisie <strong>Polski Dom Pogrzebowy</strong>.
                                Aby zresetować swoje hasło, kliknij w poniższy przycisk:
                            </p>
                            <div style="text-align: center; margin: 20px 0;">
                                <a href="http://localhost:3000/reset-password-client?token=${resetToken}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                    Resetuj hasło
                                </a>
                            </div>
                            <p style="font-size: 14px; color: #777;">
                                Ten link wygaśnie za 24 godziny. Jeśli nie prosiłeś o resetowanie hasła, zignoruj ten e-mail.
                            </p>
                        </div>
                        <div style="text-align: center; padding: 20px; background-color: #f7f7f7; font-size: 12px; color: #999;">
                            © 2024 Polski Dom Pogrzebowy. Wszelkie prawa zastrzeżone.
                        </div>
                    </div>
                `,
            };

            // Wysyłanie wiadomości e-mail
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'E-mail został wysłany.' });

        } catch (error) {
            console.error('Błąd podczas przetwarzania żądania:', error);
            res.status(500).json({ error: 'Błąd podczas wysyłania e-maila.' });
        }
    } else {
        res.status(405).json({ error: 'Metoda niedozwolona.' });
    }
}
