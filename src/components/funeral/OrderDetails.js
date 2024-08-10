import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const OrderDetails = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (orderId) {
            const fetchOrderDetails = async () => {
                const docRef = doc(db, 'forms', orderId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setOrderDetails(docSnap.data());
                } else {
                    console.error('Nie znaleziono zamówienia.');
                }
            };

            fetchOrderDetails();
        }
    }, [orderId]);

    if (!orderDetails) return <div>Ładowanie szczegółów...</div>;

    return (
        <div className="orderDetailsContainer">
            <h1>Szczegóły zamówienia</h1>
            <p><strong>Imię i Nazwisko Zmarłego:</strong> {orderDetails.name} {orderDetails.surname}</p>
            <p><strong>Imię i Nazwisko Zamawiającego:</strong> {orderDetails.authorizedPerson?.name || 'Brak danych'}</p>
            <p><strong>PESEL Zamawiającego:</strong> {orderDetails.authorizedPerson?.pesel || 'Brak danych'}</p>
            <p><strong>Data urodzenia:</strong> {orderDetails.birthDate}</p>
            <p><strong>Data śmierci:</strong> {orderDetails.deathDate}</p>
            <p><strong>Numer kontaktowy:</strong> {orderDetails.phone}</p>
            <p><strong>Adres:</strong> {orderDetails.street}, {orderDetails.city}</p>
            <p><strong>Opcja pogrzebu:</strong> {orderDetails.burialOption}</p>
            <p><strong>Ceremonia religijna:</strong> {orderDetails.religiousCeremony}</p>
            <p><strong>Numer świadczenia:</strong> {orderDetails.certificateNumber}</p>
            {/* Dodaj inne potrzebne szczegóły */}
        </div>
    );
};

export default OrderDetails;
