import React, { useState, useEffect } from 'react';
import { getStorage, ref, listAll } from "firebase/storage";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import dayjs from 'dayjs';

const Uwagi = ({ formId, formDate }) => {
    const [documentError, setDocumentError] = useState('');
    const [dataError, setDataError] = useState('');
    const [message, setMessage] = useState('');
    const [communicate, setCommunicate] = useState('');

    useEffect(() => {
        const checkDocumentsAndData = async () => {
            const storage = getStorage();
            const formRef = ref(storage, `uploaded-documents/${formId}/`);

            try {
                // Sprawdzenie liczby folderów (dokumentów) w Storage
                const result = await listAll(formRef);
                const folderCount = result.prefixes.length;

                if (folderCount < 5) {
                    setDocumentError('Brak wszystkich dokumentów - Sprawdź przesłane pliki.');
                }

                // Sprawdzenie danych w Firestore
                const docRef = doc(db, 'forms', formId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const requiredFields = [
                        'authorizedPerson.name', 'authorizedPerson.pesel',
                        'birthDate', 'burialOption', 'city', 'clothingOption',
                        'deathDate', 'documents', 'email', 'formType', 'funeralHomeName', 'insurance',
                        'location', 'name', 'pensionCertificate', 'pesel', 'phone', 'graveCemetery',
                        'religiousCeremony', 'street', 'surname', 'who'
                    ];

                    const missingFields = requiredFields.filter(field => {
                        const fieldPath = field.split('.');
                        let value = data;

                        for (let i = 0; i < fieldPath.length; i++) {
                            if (value[fieldPath[i]] === undefined || value[fieldPath[i]] === null) {
                                return true;
                            }
                            value = value[fieldPath[i]];
                        }

                        return false;
                    });

                    if (missingFields.length > 0) {
                        setDataError('Brak wszystkich danych!');
                    } else {
                        setMessage('Wszystkie dane są kompletne');
                    }

                    // Sprawdzenie, czy formularz został przesłany dzisiaj
                    if (dayjs(formDate).isSame(dayjs(), 'day')) {
                        setCommunicate('Nowe zamówienie - wymagana reakcja');
                    }
                } else {
                    setDataError('Nie znaleziono formularza.');
                }
            } catch (error) {
                console.error('Błąd przy sprawdzaniu dokumentów lub danych:', error);
                setDocumentError('Nie udało się sprawdzić dokumentów.');
                setDataError('Nie udało się sprawdzić danych.');
            }
        };

        checkDocumentsAndData();
    }, [formId, formDate]);

    const getShortenedText = (text, maxLength = 50) => {
        if (!text) return '';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const combinedMessages = `
        ${documentError ? documentError + '\n' : ''}
        ${dataError ? dataError + '\n' : ''}
        ${message ? message + '\n' : ''}
        ${communicate ? communicate : ''}
    `.trim();

    return (
        <>
            {documentError && <p className="errorMessage">{documentError}</p>}
            {dataError && <p className="errorMessage">{dataError}</p>}
            {message && <p className="message">{message}</p>}
            {communicate && <p className="communicateMessage">{communicate}</p>}
        </>
    );
};

export default Uwagi;
