// components/SupportModal.js
import { useState } from 'react';
import {db} from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const SupportModal = ({ isOpen, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [preferredTime, setPreferredTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'wsparcie'), {
                firstName,
                lastName,
                phoneNumber,
                preferredTime,
            });
            alert('Formularz został wysłany');
            onClose();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-support">
            <div className="modal-content">
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
