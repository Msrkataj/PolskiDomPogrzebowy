import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const DeceasedInfoForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        deathDate: '',
        birthDate: '',
        pesel: '',
        worked: null,
        pensionCertificate: false,
        pensionDetails: ''
    });
    const [showSaveForm, setShowSaveForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const closeSaveForm = () => setShowSaveForm(false);
    const router = useRouter();

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
            if (!id) {
                console.error('Nie znaleziono ID formularza. Upewnij się, że jest zapisane w local storage.');
                return;
            }

        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('formId') || generateUniqueId();
        localStorage.setItem('formId', id);

        try {
            await setDoc(doc(db, 'forms', id), formData, { merge: true });
            alert('Formularz został zapisany.');
            await router.push('/formularz-drugi'); // Przejście do kolejnego etapu
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };

    const generateUniqueId = () => {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    };

    const handleSaveCredentials = async () => {
        const id = localStorage.getItem('formId');
        if (id) {
            try {
                await setDoc(doc(db, 'forms', id), { email, password }, { merge: true });
                alert('Dane zostały zapisane.');
                setShowSaveForm(false);
            } catch (error) {
                console.error('Błąd zapisu formularza: ', error);
            }
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="deceased-info-form">
                <h2>Informacje o Osobie zmarłej:</h2>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="name">Imię</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Imię"
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="surname">Nazwisko</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="Nazwisko"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="deathDate">Data śmierci</label>
                        <input
                            type="date"
                            id="deathDate"
                            name="deathDate"
                            value={formData.deathDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="birthDate">Data urodzin</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-item">
                        <label htmlFor="pesel">PESEL</label>
                        <input
                            type="text"
                            id="pesel"
                            name="pesel"
                            value={formData.pesel}
                            onChange={handleChange}
                            placeholder="PESEL"
                        />
                    </div>
                </div>
                <div className="form-group form-group-down">
                    <label>
                        <input
                            type="checkbox"
                            name="pensionCertificate"
                            checked={formData.pensionCertificate}
                            onChange={handleChange}
                        />
                        Zaświadczenie, że na dzień zgonu podlegało się składkom emerytalno-rentowym
                    </label>
                    {formData.pensionCertificate && (
                        <div className="additional-info">
                            <label htmlFor="pensionDetails">Szczegóły zaświadczenia</label>
                            <input
                                type="text"
                                id="pensionDetails"
                                name="pensionDetails"
                                value={formData.pensionDetails}
                                onChange={handleChange}
                                placeholder="Wprowadź szczegóły"
                            />
                        </div>
                    )}
                </div>
                <div className="form-group form-group-down">
                    <div className="info-bubble-second-mobile">
                        <p>Nie pamiętasz? Potrzebujesz więcej czasu?</p>
                        <p className="save-link" onClick={() => setShowSaveForm(true)}>Zapisz formularz tutaj
                            i dokończ później</p>
                    </div>
                    <h2>Czy Osoba pracowała?</h2>
                    <div className="radio-group">
                        <label className={`radio-label ${formData.worked === 'Tak' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="worked"
                                value="Tak"
                                checked={formData.worked === 'Tak'}
                                onChange={handleChange}
                            />
                            Tak
                        </label>
                        <label className={`radio-label ${formData.worked === 'Nie' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="worked"
                                value="Nie"
                                checked={formData.worked === 'Nie'}
                                onChange={handleChange}
                            />
                            Nie
                        </label>
                    </div>
                </div>
            </form>
            <div className="info-bubble info-bubble-first">
                <p>Twoje Dane, Nasza Odpowiedzialność</p>
                <p>Chronimy Twoje dane z najwyższą starannością. Zapewniamy, że wszelkie informacje są przechowywane
                    bezpiecznie i z zachowaniem pełnej poufności.</p>
            </div>
            <div className="info-bubble info-bubble-second">
                <p>Nie pamiętasz? Potrzebujesz więcej czasu?</p>
                <p className="save-link" onClick={() => setShowSaveForm(true)}>Zapisz formularz tutaj
                    i dokończ później</p>
            </div>
            {showSaveForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Zapisz formularz</h2>
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                            />
                            <label>Hasło</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Hasło"
                            />
                            <button onClick={handleSaveCredentials}>Zapisz</button>
                            <button onClick={closeSaveForm}>Zamknij</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeceasedInfoForm;
