import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/router';
import Link from "next/link";
import { setCookie } from 'nookies';

const ClientLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const q = query(collection(db, 'forms'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('Nie znaleziono użytkownika o podanym adresie e-mail.');
                return;
            }

            let loginSuccessful = false; // Flaga kontrolująca

            for (const doc of querySnapshot.docs) {
                const data = doc.data();

                if (!data.password) {
                    alert('Błąd: brak hasła w bazie danych.');
                    return;
                }

                const isPasswordValid = await bcrypt.compare(password, data.password);
                if (isPasswordValid) {
                    loginSuccessful = true;
                    localStorage.setItem('userRole', 'client');
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userId', doc.id);
                    localStorage.setItem('formId', doc.id);
                    localStorage.setItem('loginTime', Date.now().toString());
                    alert('Zalogowano pomyślnie.');
                    await router.push("client/panel");
                    break; // Przerywamy pętlę po pomyślnym logowaniu
                }
            }

            if (!loginSuccessful) {
                alert('Nieprawidłowe hasło.');
            }

        } catch (error) {
            console.error('Błąd logowania:', error);
            alert('Wystąpił błąd podczas logowania.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h1>Logowanie Panelu Klienta</h1>
                <div className="login-form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-form-group">
                    <label>Hasło</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Link href={"/zapomniane-haslo-uzytkownik"} className="forgot-password">Zapomniałeś hasła?</Link>
                </div>
                <div className="actions">
                    <button type="submit" className="login-button">Zaloguj się</button>
                </div>
                <div className="links">
                    <Link href="/szukaj" className="register-link">Jeśli chcesz zalożyć konto,<br/>wyślij zgłoszenie</Link>
                </div>
            </form>
            <div className="funeral-home-box">
                <Link href="/login-dom" className="funeral-home-box-link">Logowanie Panelu Domu Pogrzebowego</Link>
            </div>
        </div>
    );
};

export default ClientLogin;
