import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const ChangePassword = () => {
    const [userData, setUserData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null); // Przechowuje ID użytkownika

    // Pobieramy ID użytkownika z localStorage
    useEffect(() => {
        // Sprawdzamy, czy kod jest wykonywany po stronie klienta
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);
        }
    }, []);
    // Funkcja do pobrania danych użytkownika z Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const userDocRef = doc(db, 'domyPogrzebowe', userId);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        setErrorMessage('Nie znaleziono użytkownika.');
                    }
                } catch (error) {
                    console.error('Błąd podczas pobierania danych użytkownika:', error);
                    setErrorMessage('Wystąpił błąd podczas pobierania danych.');
                }
            }
        };

        fetchUserData();
    }, [userId]);

    // Funkcja do aktualizacji hasła
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Sprawdzanie, czy oba nowe hasła są takie same
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Nowe hasło i potwierdzenie hasła muszą być takie same.');
            return;
        }

        // Sprawdzanie, czy wprowadzono obecne hasło
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setErrorMessage('Wszystkie pola są wymagane.');
            return;
        }

        setLoading(true);

        try {
            // Sprawdzanie, czy bieżące hasło jest poprawne
            const isPasswordCorrect = await bcrypt.compare(currentPassword, userData.password);

            if (!isPasswordCorrect) {
                setErrorMessage('Bieżące hasło jest nieprawidłowe.');
                setLoading(false);
                return;
            }

            // Zaszyfrowanie nowego hasła przy użyciu bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);

            // Aktualizacja hasła w Firestore
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            await updateDoc(userDocRef, { password: hashedNewPassword });

            setSuccessMessage('Hasło zostało pomyślnie zmienione.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } catch (error) {
            console.error('Błąd podczas aktualizacji hasła:', error);
            setErrorMessage('Wystąpił błąd podczas zmiany hasła.');
        }

        setLoading(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div className="change-password-container">
            <h2>Zmień hasło</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Obecne hasło</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Nowe hasło</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmNewPassword">Potwierdź nowe hasło</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Zmieniam hasło...' : 'Zmień hasło'}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
