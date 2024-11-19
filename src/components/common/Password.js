import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'; // Zmieniono na useRouter

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter(); // Poprawne użycie routera

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/send-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSuccessMessage('E-mail z linkiem do resetowania hasła został wysłany.');
                setTimeout(() => {
                    router.push('/login-dom'); // Przekierowanie do strony logowania po zmianie hasła
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Nie udało się wysłać e-maila. Sprawdź, czy adres jest poprawny.');
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania e-maila:', error);
            setErrorMessage('Wystąpił problem z wysyłaniem e-maila.');
        }
    };

    return (
        <div className="container">
            <div className="reset-password-container">
                <h2>Resetowanie hasła</h2>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Podaj swój adres e-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Wyślij link do resetowania hasła</button>
                    <button className="reset-password-container-back">
                        <Link href="/login-dom" >Wróć do logowania</Link>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestPasswordReset;
