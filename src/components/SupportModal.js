import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const SupportModal = ({ isOpen, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to validate phone number with Polish country code +48
    const validatePhoneNumber = (number) => {
        const phoneRegex = /^\+48\d{9}$/; // Validates +48 followed by 9 digits
        return phoneRegex.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the phone number
        if (!validatePhoneNumber(phoneNumber)) {
            setErrorMessage('Numer telefonu musi zaczynać się od +48 i zawierać 9 cyfr.');
            return;
        }

        try {
            // Zapisz dane w Firestore
            await addDoc(collection(db, 'wsparcie'), {
                firstName,
                lastName,
                phoneNumber,
                preferredTime,
            });

            // Wyślij dane do serwera, aby wysłać e-mail
            const response = await fetch('/api/send-support-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber,
                    preferredTime,
                }),
            });

            if (response.ok) {
                alert('Formularz został wysłany oraz e-mail został wysłany');
            } else {
                alert('Wysłanie e-maila nie powiodło się.');
            }

            onClose();
        } catch (e) {
            console.error('Błąd podczas dodawania dokumentu:', e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-support">
            <div className="modal-content-support">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Skontaktuj się z psychologiem</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Imię:
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Nazwisko:
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Numer telefonu:
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </label>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <label>
                        Preferowana pora kontaktu:
                        <select
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            required
                        >
                            <option value="" disabled>Wybierz porę dnia</option>
                            <option value="Rano (8:00 - 10:00)">Rano (8:00 - 10:00)</option>
                            <option value="Przedpołudnie (10:00 - 12:00)">Przedpołudnie (10:00 - 12:00)</option>
                            <option value="Południe (12:00 - 14:00)">Południe (12:00 - 14:00)</option>
                            <option value="Popołudnie (14:00 - 16:00)">Popołudnie (14:00 - 16:00)</option>
                            <option value="Wieczór (16:00 - 18:00)">Wieczór (16:00 - 18:00)</option>
                        </select>
                    </label>
                    <button type="submit">Wyślij</button>
                </form>
            </div>
        </div>

    );
};

export default SupportModal;