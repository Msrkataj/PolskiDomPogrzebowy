import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const InsuranceForm = () => {
    const [formData, setFormData] = useState({
        insurance: '',
        certificateNumber: '',
        noCertificate: false,
        authorizedPerson: {
            name: '',
            pesel: '',
            idNumber: ''
        },
        deathCertificate: '',
        funeralAuthority: '',
        authorizationDetails: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('formId');
            if (id) {
                const docRef = doc(db, 'forms', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('authorizedPerson.')) {
            const key = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                authorizedPerson: {
                    ...prevState.authorizedPerson,
                    [key]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('formId');
        if (id) {
            try {
                await setDoc(doc(db, 'forms', id), formData, { merge: true });
                alert('Formularz został zapisany.');
                // Możesz przekierować użytkownika do innej strony
            } catch (error) {
                console.error('Błąd zapisu formularza: ', error);
            }
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="insurance-form">
                <h2>Czy osoba zmarła była ubezpieczona w:</h2>
                <div className="radio-group">
                    <label className={`radio-label ${formData.insurance === 'ZUS' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="insurance"
                            value="ZUS"
                            checked={formData.insurance === 'ZUS'}
                            onChange={handleChange}
                        />
                        ZUS
                    </label>
                    <label className={`radio-label ${formData.insurance === 'KRUS' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="insurance"
                            value="KRUS"
                            checked={formData.insurance === 'KRUS'}
                            onChange={handleChange}
                        />
                        KRUS
                    </label>
                    <label className={`radio-label ${formData.insurance === 'MSWiA' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="insurance"
                            value="MSWiA"
                            checked={formData.insurance === 'MSWiA'}
                            onChange={handleChange}
                        />
                        MSWiA
                    </label>
                    <label className={`radio-label ${formData.insurance === 'Inne' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="insurance"
                            value="Inne"
                            checked={formData.insurance === 'Inne'}
                            onChange={handleChange}
                        />
                        Inne
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="certificateNumber">Numer świadczenia</label>
                    <input
                        type="text"
                        id="certificateNumber"
                        name="certificateNumber"
                        value={formData.certificateNumber}
                        onChange={handleChange}
                        placeholder="Numer świadczenia"
                        disabled={formData.noCertificate}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="noCertificate"
                            checked={formData.noCertificate}
                            onChange={handleChange}
                        />
                        Brak świadczeń?
                    </label>
                </div>
                <h2>Osoba udzielająca pełnomocnictwa:</h2>
                <div className="form-group">
                    <label htmlFor="authorizedPerson.name">Imię i Nazwisko</label>
                    <input
                        type="text"
                        id="authorizedPerson.name"
                        name="authorizedPerson.name"
                        value={formData.authorizedPerson.name}
                        onChange={handleChange}
                        placeholder="Imię i Nazwisko"
                    />
                    <label htmlFor="authorizedPerson.pesel">PESEL</label>
                    <input
                        type="text"
                        id="authorizedPerson.pesel"
                        name="authorizedPerson.pesel"
                        value={formData.authorizedPerson.pesel}
                        onChange={handleChange}
                        placeholder="PESEL"
                    />
                    <label htmlFor="authorizedPerson.idNumber">Numer dowodu</label>
                    <input
                        type="text"
                        id="authorizedPerson.idNumber"
                        name="authorizedPerson.idNumber"
                        value={formData.authorizedPerson.idNumber}
                        onChange={handleChange}
                        placeholder="Numer dowodu"
                    />
                </div>
                <div className="form-group">
                </div>
                <div className="info-text">
                    <p className="save-link">Sprawdź jak wypełnić</p>
                </div>
                <button type="submit" className="submit-button">Zapisz i wyślij</button>
            </form>
        </div>
    );
};

export default InsuranceForm;
