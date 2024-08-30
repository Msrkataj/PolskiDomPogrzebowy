import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Join = () => {
    const [formData, setFormData] = useState({
        city: '',
        email: '',
        street: '',
        funeralHomeName: '',
        postalCode: '',
        phone: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'application'), formData);
            setMessage('Twoje zgłoszenie zostało pomyślnie wysłane. Dostaniesz potwierdzenie drogą mailową lub telefonicznie');
            setTimeout(() => setMessage(''), 20000);
            setFormData({
                city: '',
                email: '',
                street: '',
                funeralHomeName: '',
                postalCode: '',
                phone: ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div className="join">
            <div className="join__wrapper">
                <h1 className="join__title">Formularz zgłoszeniowy</h1>
                <p>Dołącz do nas!</p>
                {message && <p className="join__message">{message}</p>}
                <form className="join__form" onSubmit={handleSubmit}>
                    <div className="join__form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="join__form-group">
                        <label htmlFor="funeralHomeName">Nazwa domu pogrzebowego</label>
                        <input
                            type="text"
                            id="funeralHomeName"
                            name="funeralHomeName"
                            value={formData.funeralHomeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="join__form-group">
                        <label htmlFor="street">Ulica</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="join__form-group">
                        <label htmlFor="city">Miejscowość</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="join__form-group">
                        <label htmlFor="postalCode">Kod pocztowy</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="join__form-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="join__form-submit">Wyślij</button>
                </form>
            </div>
        </div>
    );
};

export default Join;
