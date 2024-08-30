import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            const q = query(collection(db, 'admin'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('Email or password is incorrect');
                setIsLoading(false);
                return;
            }

            if (querySnapshot.size > 1) {
                alert('Multiple accounts found with this email. Please contact support.');
                setIsLoading(false);
                return;
            }

            const doc = querySnapshot.docs[0];
            const data = doc.data();
            const isPasswordValid = await bcrypt.compare(password, data.password);

            if (isPasswordValid) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userId', doc.id);
                localStorage.setItem('loginTime', Date.now());
                router.push('/admin/panel');
            } else {
                alert('Email or password is incorrect');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            alert('An error occurred while logging in. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Admin Login</h2>
                <div className="login-form-group">
                    <label>Login:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-form-group">
                    <label>Hasło:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isLoading && <div className="spinner"></div>}
                <button type="submit">Zaloguj się</button>
            </form>
        </div>
    );
};

export default AdminLogin;
