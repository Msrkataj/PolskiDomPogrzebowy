import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import Link from "next/link";

const FuneralHomeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const q = query(collection(db, 'domyPogrzebowe'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('Email or password is incorrect');
                return;
            }

            querySnapshot.forEach(async (doc) => {
                const data = doc.data();
                const isPasswordValid = await bcrypt.compare(password, data.password);

                if (isPasswordValid) {
                    localStorage.setItem('userRole', 'funeralHome');
                    localStorage.setItem('email', email);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userId', doc.id);
                    localStorage.setItem('loginTime', Date.now().toString());
                    await checkFirstLogin(doc.id);
                } else {
                    alert('Email or password is incorrect');
                }
            });
        } catch (error) {
            console.error('Error logging in: ', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    const checkFirstLogin = async (userId) => {
        const userDocRef = doc(db, 'domyPogrzebowe', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log(userData)
            if (!userData.ownerName || !userData.city || !userData.street) {
                await router.push('/funeral/first');
            } else {
                await router.push('/funeral/panel');
            }
        } else {
            await router.push('/login');
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
                    <Link href={"/form"} className="forgot-password">Zapomniałeś hasła?</Link>
                </div>
                <div className="actions">
                    <button type="submit" className="login-button">Zaloguj się</button>
                </div>
                <div className="links">
                    <Link href="/register" className="register-link">Jeszcze nie masz konta?<br/>
                        Wyślij wniosek</Link>
                </div>
            </form>
            <div className="funeral-home-box">
                <Link href="/login" className="funeral-home-box-link">Logowanie do panelu klienta</Link>
            </div>
        </div>
    );
};

export default FuneralHomeLogin;
