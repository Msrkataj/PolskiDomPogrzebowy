import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import Image from "next/image";
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

const TransportModal = ({ isOpen, onClose, funeralHome }) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check for existing ID in localStorage
        let localFormId = localStorage.getItem('formId');
        if (!localFormId) {
            // If no ID exists, create a new one and store it
            localFormId = `form-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('formId', localFormId);
        }

        // Ensure the ID is also stored in Firestore if not already present
        const ensureIdInFirestore = async () => {
            const formDocRef = doc(db, 'forms', localFormId);
            const formSnap = await getDoc(formDocRef);

            if (!formSnap.exists()) {
                // Create a new document with the ID in Firestore
                await setDoc(formDocRef, { id: localFormId });
            }
        };

        ensureIdInFirestore();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const localFormId = localStorage.getItem('formId');
        const formData = {
            funeralHomeName: funeralHome.funeralHomeName,
            phone: phone || null,
            email: email || null,
            password: password || null,
            date: new Date().toISOString(),
        };

        try {
            const formDocRef = doc(db, 'forms', localFormId);
            await setDoc(formDocRef, formData, { merge: true });

            // Save form data to LocalStorage
            localStorage.setItem('formData', JSON.stringify(formData));

            alert('Formularz został zapisany.');
            onClose();
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };

    const handleCompleteFormNow = async () => {
        const localFormId = localStorage.getItem('formId');
        const formattedDate = format(new Date(), 'dd.MM.yyyy HH:mm');
        const formData = {
            funeralHomeName: funeralHome.funeralHomeName,
            phone: phone || null,
            email: email || null,
            password: password || null,
            date: formattedDate,
        };

        try {
            const formDocRef = doc(db, 'forms', localFormId);
            await setDoc(formDocRef, formData, { merge: true });

            // Save form data to LocalStorage
            localStorage.setItem('formData', JSON.stringify(formData));

            // Redirect to form page
            router.push('/form');
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content modal-content-main">
                <h2 className="modal-content-main-h2">Czy potrzebujesz pilnie transportu ciała?</h2>
                <p>
                    Zdajemy sobie sprawę, że ciało zmarłego może znajdować się w domu i wymaga natychmiastowego
                    przewiezienia do zakładu pogrzebowego. Prosimy o potwierdzenie, abyśmy mogli zapewnić odpowiednią pomoc.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Potrzebuję natychmiastowego transportu</h3>
                        <p>Zadzwoń tutaj, aby jak najszybciej zamówić transport</p>
                        <div className="contact-info">
                            {/*<span>*/}
                            {/*    <Image src={"/assets/icons/phone.png"} alt="phone" width={24} height={24} />*/}
                            {/*    <p>{funeralHome.phone}</p>*/}
                            {/*</span>*/}
                            <p>{funeralHome.funeralHomeName}</p>
                        </div>
                        <div className="form-section-contact">
                            <label htmlFor="phone">Podaj swój numer telefonu, dla ułatwienia kontaktu</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="000 000 000"
                            />
                            <button type="submit">Zgłoś</button>
                        </div>
                    </div>
                    <div className="form-section form-section-contact">
                        <h3>Zapisz dane i wróć później, aby załatwić wszystkie formalności</h3>
                        <label htmlFor="email">E-mail</label>
                        <span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                            />
                        </span>
                        <label htmlFor="password">Hasło</label>
                        <span>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Hasło"
                            />
                        </span>
                        <span>
                            <button className="button-save" type="submit">Zapisz</button>
                        </span>
                        <button  className="form-section-contact-button-end" type="button" onClick={handleCompleteFormNow}>
                            <p>Chcę dokończyć wypełnianie formularza teraz</p>
                        </button>
                    </div>
                </form>
                <p onClick={onClose} className="close-button">Zamknij</p>
            </div>
        </div>
    );
};

export default TransportModal;