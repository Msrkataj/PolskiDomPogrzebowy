import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import {collection, doc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query; // Pobieramy token z URL
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);

    // Funkcja sprawdzająca ważność tokena
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                setLoading(true);
                try {
                    // Szukamy domu pogrzebowego na podstawie tokena
                    const q = query(collection(db, 'domyPogrzebowe'), where('resetToken', '==', token));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const funeralHomeDoc = querySnapshot.docs[0];
                        const data = funeralHomeDoc.data();

                        // Sprawdzamy, czy token jeszcze nie wygasł
                        const tokenExpirationDate = data.resetTokenExpires.toDate();
                        if (tokenExpirationDate > new Date()) {
                            setTokenValid(true);
                        } else {
                            setErrorMessage('Token wygasł.');
                        }
                    } else {
                        setErrorMessage('Nieprawidłowy token.');
                    }
                } catch (error) {
                    console.error('Błąd podczas weryfikacji tokena:', error);
                    setErrorMessage('Wystąpił błąd podczas weryfikacji tokena.');
                } finally {
                    setLoading(false);
                }
            }
        };

        verifyToken();
    }, [token]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage('Hasła nie są takie same.');
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage('Hasło musi mieć co najmniej 6 znaków.');
            return;
        }

        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            // Szukamy domu pogrzebowego z odpowiednim tokenem
            const q = query(collection(db, 'domyPogrzebowe'), where('resetToken', '==', token));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const funeralHomeDoc = querySnapshot.docs[0];
                const funeralHomeRef = doc(db, 'domyPogrzebowe', funeralHomeDoc.id);

                // Haszowanie nowego hasła przed zapisem do bazy (opcjonalnie)
                const hashedPassword = await bcrypt.hash(newPassword, 10);

                // Zapisujemy nowe hasło, usuwamy token i datę wygaśnięcia tokena
                await updateDoc(funeralHomeRef, {
                    password: hashedPassword,
                    resetToken: null,
                    resetTokenExpires: null,
                });

                setSuccessMessage('Hasło zostało zmienione.');
                setTimeout(() => {
                    router.push('/login'); // Przekierowanie do strony logowania po zmianie hasła
                }, 3000);
            } else {
                setErrorMessage('Nie znaleziono konta.');
            }
        } catch (error) {
            console.error('Błąd podczas zmiany hasła:', error);
            setErrorMessage('Wystąpił błąd podczas zmiany hasła.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="reset-password-container">
                <h2>Resetowanie hasła</h2>

                {loading && <p>Ładowanie...</p>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                {tokenValid ? (
                    <form onSubmit={handlePasswordChange}>
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
                            <label htmlFor="confirmPassword">Potwierdź nowe hasło</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading}>
                            Zmień hasło
                        </button>
                    </form>
                ) : (
                    !loading && <p>Nieprawidłowy lub wygasły token.</p>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
