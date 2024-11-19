import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import Link from "next/link";

const FuneralHomeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const q = query(collection(db, 'domyPogrzebowe'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('Email or password is incorrect');
                setIsLoading(false);
                return;
            }

            for (const docSnap of querySnapshot.docs) {
                const data = docSnap.data();
                const isPasswordValid = await bcrypt.compare(password, data.password);

                if (isPasswordValid) {
                    // Pobieramy `funeralHomeName` i zapisujemy w localStorage
                    const funeralHomeName = data.funeralHomeName || ''; // Zakładamy, że `funeralHomeName` istnieje w danych
                    localStorage.setItem('userRole', 'funeralHome');
                    localStorage.setItem('funeralHomeName', funeralHomeName); // Zapisujemy nazwę domu pogrzebowego
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userId', docSnap.id);
                    localStorage.setItem('loginTime', Date.now().toString());

                    // Sprawdź, czy profil jest kompletny
                    await checkFirstLogin(docSnap.id);
                } else {
                    alert('Email or password is incorrect');
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            alert('An error occurred while logging in. Please try again.');
            setIsLoading(false);
        }
    };

    const checkFirstLogin = async (userId) => {
        try {
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (!userData.isProfileComplete) {
                    await router.push('/funeral/first');
                } else {
                    await router.push('/funeral/panel');
                }
            } else {
                await router.push('/login');
            }
        } catch (error) {
            console.error('Error checking first login: ', error);
            await router.push('/login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h1>Logowanie do Panelu domu pogrzebowego</h1>
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
                    <Link href="/zapomniane-haslo" className="forgot-password">Zapomniałeś hasła?</Link>
                </div>
                {isLoading && <div className="spinner"></div>}
                <div className="actions">
                    <button type="submit" className="login-button">Zaloguj się</button>
                </div>
                <div className="links">
                    <Link href="/dolacz-formularz" className="register-link">Jeszcze nie masz konta?<br/>Wyślij wniosek</Link>
                </div>
            </form>
            <div className="funeral-home-box">
                <Link href="/login" className="funeral-home-box-link">Logowanie do panelu klienta</Link>
            </div>
        </div>
    );
};

export default FuneralHomeLogin;
