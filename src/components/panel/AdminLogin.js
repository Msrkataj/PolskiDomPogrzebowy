import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const q = query(collection(db, 'admins'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('Email or password is incorrect');
                return;
            }

            querySnapshot.forEach(async (doc) => {
                const data = doc.data();
                const isPasswordValid = await bcrypt.compare(password, data.passwordHash);

                if (isPasswordValid) {
                    localStorage.setItem('userRole', 'admin');
                    localStorage.setItem('userId', doc.id);
                    localStorage.setItem('loginTime', Date.now());
                    router.push('/admin/dashboard');
                } else {
                    alert('Email or password is incorrect');
                }
            });
        } catch (error) {
            console.error('Error logging in: ', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Admin Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
