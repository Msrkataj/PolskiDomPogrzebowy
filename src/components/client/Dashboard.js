import React, {useEffect, useMemo, useState} from 'react';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [incompleteForms, setIncompleteForms] = useState([]);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(null);
    const router = useRouter();

    const fieldTranslations =  useMemo(() => ({
        formType: 'Typ formularza',
        insurance: 'Ubezpieczenie',
        documents: 'Dokumenty',
        deathDate: 'Data śmierci',
        pensionCertificate: 'Zaświadczenie o emeryturze/rencie',
        pensionDetails: 'Szczegóły emerytalne',
        pesel: 'PESEL',
        religiousCeremony: 'Ceremonia religijna',
        name: 'Imię',
        surname: 'Nazwisko',
        who: 'Osoba sporządzająca akt zgonu',
        worked: 'Status zatrudnienia',
    }), []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedRole = localStorage.getItem('userRole');
            setRole(storedRole);
        }
    }, []);

    useEffect(() => {
        if (role) {
            const userRole = localStorage.getItem('userRole');
            const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
            const currentTime = Date.now();
            const ONE_DAY_MS = 24 * 60 * 60 * 1000;

            if (!userRole || isNaN(loginTime) || currentTime - loginTime > ONE_DAY_MS) {
                router.push('/login');
            } else if (userRole !== role) {
                router.push('/login');
            }
        }
    }, [role, router]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (typeof window !== 'undefined') {
                const userId = localStorage.getItem('userId');
                const userEmail = localStorage.getItem('userEmail');
                setEmail(userEmail);

                try {
                    const docRef = doc(db, 'forms', userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const missingFields = [];

                        ['formType', 'insurance', 'documents', 'deathDate', 'pensionCertificate', 'pensionDetails', 'pesel', 'religiousCeremony', 'name', 'surname', 'who', 'worked'].forEach((field) => {
                            if (!data[field]) missingFields.push(fieldTranslations[field] || field);
                        });

                        if (missingFields.length > 0) {
                            setIncompleteForms([{ ...data, missingFields, id: docSnap.id }]);
                        }

                        const submissionDate = data.timestamp && typeof data.timestamp.toDate === 'function'
                            ? data.timestamp.toDate().toLocaleString()
                            : 'Brak daty';

                        const formSentMessage = `Formularz został wysłany.`;

                        const alreadyNotified = notifications.some(
                            (notification) => notification.message === formSentMessage
                        );

                        if (!alreadyNotified) {
                            setNotifications(prevNotifications => [
                                ...prevNotifications,
                                {
                                    date: submissionDate,
                                    message: formSentMessage,
                                    isFormSent: true,
                                }
                            ]);
                        }

                        if (data.notifications) {
                            setNotifications(prevNotifications => [
                                ...prevNotifications,
                                ...data.notifications.map(notification => {
                                    const timestamp = notification.timestamp;

                                    const dateString = timestamp && typeof timestamp.toDate === 'function'
                                        ? timestamp.toDate().toLocaleString()
                                        : new Date(timestamp).toLocaleString();

                                    const message = `${notification.message}`;
                                    const notificationAlreadyExists = prevNotifications.some(
                                        (n) => n.message === message && n.date === dateString
                                    );
                                    if (!notificationAlreadyExists) {
                                        return {
                                            date: dateString,
                                            message: message,
                                            isFormSent: false,
                                        };
                                    }
                                    return null;
                                }).filter(notification => notification !== null)
                            ]);
                        }
                    } else {
                        console.error('Nie znaleziono dokumentu dla użytkownika o ID:', userId);
                    }
                } catch (error) {
                    console.error('Błąd pobierania danych:', error);
                }
            }
        };

        fetchUserData();
    }, [fieldTranslations, notifications]);

    const sortedNotifications = notifications
        .filter(notification => !notification.isFormSent)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const formSentNotification = notifications.find(notification => notification.isFormSent);

    return (
        <div className="dashboard">
            <h1>Witamy w Twoim Panelu Klienta</h1>
            <div className="user-info">
                <p>{email}</p>
                <span className="settings-icon">⚙️</span>
            </div>
            <div className="notifications-client">
                <h2>Twoje Powiadomienia</h2>
                {incompleteForms.length > 0 && (
                    <div className="notification-client warning">
                        <span>❗</span> Proszę uzupełnić brakujące dane w formularzu!
                        <ul>
                            {incompleteForms.map((form) => (
                                <li key={form.id}>
                                    Osoba zmarła: {form.name + " " + form.surname} - Brakujące pola: {form.missingFields.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {sortedNotifications.map((notification, index) => (
                    <div className="notification-client" key={index}>
                        {notification.date} - {notification.message}
                    </div>
                ))}
                {formSentNotification && (
                    <div className="notification-client">
                        {formSentNotification.date} - {formSentNotification.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
