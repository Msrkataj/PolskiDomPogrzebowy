import React, {useState, useEffect} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../../../firebase'; // Adjust the path as needed
import dayjs from 'dayjs';

const AdminDashboard = () => {
    const [funeralHomesCount, setFuneralHomesCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [submissionsCount, setSubmissionsCount] = useState(0);
    const [monthlySubmissionsCount, setMonthlySubmissionsCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            const funeralHomesQuery = query(collection(db, 'domyPogrzebowe'));
            const formsQuery = query(collection(db, 'forms'));

            const [funeralHomesSnapshot, formsSnapshot] = await Promise.all([
                getDocs(funeralHomesQuery),
                getDocs(formsQuery)
            ]);

            // Liczba domów pogrzebowych, które mają określone pola
            const validFuneralHomes = funeralHomesSnapshot.docs.filter(doc => {
                const data = doc.data();
                return data.funeralHomeName && data.city && data.ownerName && data.latitude && data.longitude;
            });
            setFuneralHomesCount(validFuneralHomes.length);

            // Liczba klientów (formularzy) z danymi email i password
            const validClients = formsSnapshot.docs.filter(doc => {
                const data = doc.data();
                return data.email && data.password;
            });
            setClientsCount(validClients.length);

            // Liczba zgłoszeń (formularzy) z danymi funeralHomeName oraz phone
            const validSubmissions = formsSnapshot.docs.filter(doc => {
                const data = doc.data();
                return data.funeralHomeName && data.phone;
            });
            setSubmissionsCount(validSubmissions.length);

            // Liczba zgłoszeń w bieżącym miesiącu
            const currentMonth = dayjs().month(); // bieżący miesiąc (0-based index, czyli styczeń to 0)
            const currentYear = dayjs().year(); // bieżący rok

            const monthlySubmissions = formsSnapshot.docs.filter(doc => {
                const data = doc.data();
                let submissionDate = null;

                // Pobieranie daty jako timestamp
                if (data.timestamp && data.timestamp.toDate) {
                    submissionDate = dayjs(data.timestamp.toDate()); // Konwersja timestampu na obiekt Date i potem na dayjs
                }

                if (!submissionDate) return false;

                console.log(`Document ID: ${doc.id}, Date: ${submissionDate}, Month: ${submissionDate.month() === currentMonth}, Year: ${submissionDate.year() === currentYear}`);
                return submissionDate.month() === currentMonth && submissionDate.year() === currentYear;
            });

            setMonthlySubmissionsCount(monthlySubmissions.length);
        };

        fetchStats();
    }, []);

    return (
        <div className="container">
            <h1>Witamy w Panelu Administratora</h1>
            <div className="admin-dashboard">
                <div className="stats-grid">
                    <div className="stat-card">
                        <h2>Liczba Domów Pogrzebowych</h2>
                        <p>{funeralHomesCount}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Liczba Klientów</h2>
                        <p>{clientsCount}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Liczba Zgłoszeń</h2>
                        <p>{submissionsCount}</p>
                    </div>
                    <div className="stat-card">
                        <h2>Zgłoszenia w Tym Miesiącu</h2>
                        <p>{monthlySubmissionsCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
