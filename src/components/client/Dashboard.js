import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import {useRouter} from "next/router";

const Dashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [incompleteForms, setIncompleteForms] = useState([]);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(null);
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedRole = localStorage.getItem('userRole');
            setRole(storedRole);
        }
    }, []);
    console.log(role)
;

    useEffect(() => {
        if (role) {
            const userRole = localStorage.getItem('userRole');
            const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
            const currentTime = Date.now();
            const ONE_DAY_MS = 24 * 60 * 60 * 1000;

            console.log('Middleware check:', { userRole, loginTime, currentTime });

            if (!userRole || isNaN(loginTime) || currentTime - loginTime > ONE_DAY_MS) {
                console.log('User not authenticated or session expired');
                router.push('/login');
            } else if (userRole !== role) {
                console.log(`User role does not match: requiredRole(${role}) !== userRole(${userRole})`);
                router.push('/login');
            } else {
                console.log('User authenticated');
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
                            if (!data[field]) missingFields.push(field);
                        });

                        if (missingFields.length > 0) {
                            setIncompleteForms([{ ...data, missingFields, id: docSnap.id }]);
                        }

                        const submissionDate = new Date(data.date).toLocaleString();
                        const formSentMessage = `${submissionDate} - Formularz został wysłany.`;

                        const alreadyNotified = notifications.some(
                            (notification) => notification.message === formSentMessage
                        );

                        if (!alreadyNotified) {
                            setNotifications(prevNotifications => [
                                ...prevNotifications,
                                {
                                    date: data.date,
                                    message: formSentMessage,
                                }
                            ]);
                        }

                        if (data.notifications) {
                            setNotifications(prevNotifications => [
                                ...prevNotifications,
                                ...data.notifications.map(notification => {
                                    const message = `${new Date(notification.date).toLocaleString()} - ${notification.message}`;
                                    const notificationAlreadyExists = prevNotifications.some(
                                        (n) => n.message === message
                                    );
                                    if (!notificationAlreadyExists) {
                                        return {
                                            date: notification.date,
                                            message: message,
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
    }, [notifications]);

    const sortedNotifications = notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="dashboard">
            <h1>Witamy w Twoim Panelu Klienta</h1>
            <div className="user-info">
                <p>{email}</p>
                <span className="settings-icon">⚙️</span>
            </div>
            <div className="notifications">
                <h2>Twoje Powiadomienia</h2>
                {incompleteForms.length > 0 && (
                    <div className="notification warning">
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
                    <div className="notification" key={index}>
                        {notification.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
