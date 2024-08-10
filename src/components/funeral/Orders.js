import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs, getDoc, doc, where, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import Link from 'next/link';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                router.push('/login');
                return;
            }

            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                console.error('No such document!');
                return;
            }

            const funeralHomeName = userDocSnap.data().funeralHomeName;

            const q = query(collection(db, 'forms'), where('funeralHomeName', '==', funeralHomeName));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersData);
            setLoading(false);
        };

        fetchOrders();
    }, [router]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('pl-PL', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) {
        return <p>Ładowanie zleceń...</p>;
    }

    return (
        <div className="orders">
            <Link className="back-link" href="/funeral/panel">
                Wróć do zleceń
            </Link>
            <h1>Twoje zlecenia</h1>
            <div className="orders-section">
                <h3>Nowe zlecenia</h3>
                {orders.filter(order => new Date(order.date) > new Date()).length > 0 ? (
                    orders.filter(order => new Date(order.date) > new Date()).map(order => (
                        <div key={order.id} className="order-box">
                            <p>Data zgłoszenia: {formatDate(order.date)}</p>
                            <p>Imię i Nazwisko Osoby zmarłej: <strong>{order.name} {order.surname}</strong></p>
                            <p>Aktualny status: <span className={order.status === 'Do zgłoszenia' ? 'status-red' : ''}>{order.status}</span></p>
                            <Link href={`/funeral/manage?formId=${order.id}`}>
                                <button className="manage-button">Zarządzaj</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="order-box">Brak zleceń</p>
                )}
            </div>
            <div className="orders-section">
                <h3>Rozpoczęte zlecenia</h3>
                {orders.filter(order => order.status === 'W trakcie' || order.status === 'Rozpoczęte').length > 0 ? (
                    orders.filter(order => order.status === 'W trakcie' || order.status === 'Rozpoczęte').map(order => (
                        <div key={order.id} className="order-box">
                            <p>Data zgłoszenia: {formatDate(order.date)}</p>
                            <p>Imię i Nazwisko Osoby zmarłej: <strong>{order.name} {order.surname}</strong></p>
                            <p>Aktualny status: <span className={order.status === 'W trakcie' ? 'status-yellow' : ''}>{order.status}</span></p>
                            <Link href={`/funeral/manage?formId=${order.id}`}>
                                <button className="manage-button">Zarządzaj</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="order-box">Brak zleceń</p>
                )}
            </div>
            <div className="orders-section">
                <h3>Zakończone zlecenia</h3>
                {orders.filter(order => order.status === 'Zakończone').length > 0 ? (
                    orders.filter(order => order.status === 'Zakończone').map(order => (
                        <div key={order.id} className="order-box">
                            <p>Data zgłoszenia: {formatDate(order.date)}</p>
                            <p>Imię i Nazwisko Osoby zmarłej: <strong>{order.name} {order.surname}</strong></p>
                            <p>Aktualny status: <span className="status-green">{order.status}</span></p>
                            <Link href={`/funeral/manage?formId=${order.id}`}>
                                <button className="manage-button">Zarządzaj</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="order-box">Brak zleceń</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
