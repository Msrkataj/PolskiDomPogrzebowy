import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Link from "next/link";
import Image from 'next/image';
import AuthGuardFuneral from "@/components/panel/AuthGuardFuneral";

const OrderDetails = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [orderDetails, setOrderDetails] = useState(null);
    const [preparedItems, setPreparedItems] = useState({});
    const [loading, setLoading] = useState(true);

    const categoryNames = {
        coffins: 'Trumny',
        urns: 'Urny',
        wreaths: 'Wieńce Kwiatowe',
        crosses: 'Krzyże',
        plaques: 'Tabliczki',
        music: 'Odprawy Muzyczne'
    };

    useEffect(() => {
        if (orderId) {
            const fetchOrderDetails = async () => {
                const docRef = doc(db, 'forms', orderId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setOrderDetails(data);

                    // Sprawdzamy, czy selectedItems istnieje i jest tablicą przed użyciem reduce
                    const initialPreparedItems = Array.isArray(data.selectedItems)
                        ? data.selectedItems.reduce((acc, item, index) => {
                            acc[index] = item.prepared || false;
                            return acc;
                        }, {})
                        : {};  // Jeśli selectedItems nie istnieje, zwracamy pusty obiekt

                    setPreparedItems(initialPreparedItems);
                    setLoading(false);
                } else {
                    console.error('Nie znaleziono zamówienia.');
                    setLoading(false);  // Ustawiamy loading na false, jeśli zamówienie nie istnieje
                }
            };
            fetchOrderDetails();
        }
    }, [orderId]);

    const handleItemToggle = async (index) => {
        const newPreparedItems = {
            ...preparedItems,
            [index]: !preparedItems[index]
        };
        setPreparedItems(newPreparedItems);

        const updatedItems = Array.isArray(orderDetails.selectedItems)
            ? orderDetails.selectedItems.map((item, idx) => {
                if (index === idx) {
                    return { ...item, prepared: newPreparedItems[index] };
                }
                return item;
            })
            : [];  // Jeśli selectedItems nie istnieje, zwracamy pustą tablicę

        const docRef = doc(db, 'forms', orderId);
        await updateDoc(docRef, { selectedItems: updatedItems });
    };

    const calculateTotal = () => {
        // Sprawdzamy, czy selectedItems istnieje i jest tablicą przed użyciem reduce
        return Array.isArray(orderDetails?.selectedItems)
            ? orderDetails.selectedItems.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2)
            : '0.00';  // Zwracamy 0.00, jeśli selectedItems nie istnieje
    };

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>;

    const goToClientDetails = () => {
        router.push(`/funeral/client-details?clientId=${orderDetails?.authorizedPerson?.id}`);
    };

    return (
        <div className="orderDetailsContainer">
            <Link className="back-link" href="/funeral/panel">
                Wróć do zleceń
            </Link>
            <h1>Szczegóły zamówienia</h1>
            <p><strong>Imię i Nazwisko Zmarłego:</strong> {orderDetails?.name} {orderDetails?.surname}</p>
            <p>
                <strong>Imię i Nazwisko Zamawiającego:</strong>
                <span className="clientLink" onClick={goToClientDetails}>
                    {orderDetails?.authorizedPerson?.name || 'Brak danych'}
                </span>
            </p>
            <p><strong>Numer kontaktowy:</strong> {orderDetails?.phone}</p>
            <p><strong>Typ pogrzebu:</strong> {orderDetails?.formType}</p>
            <p><strong>Kto dostarcza ubranie:</strong> {orderDetails?.clothingOption}</p>
            <p><strong>Czy dochowujemy do grobu:</strong> {orderDetails?.burialOption}</p>
            <p><strong>Ceremonia religijna:</strong> {orderDetails?.religiousCeremony}</p>
            <p><strong>Zakład pogrzebowy:</strong> {orderDetails?.funeralHomeName}</p>
            <p><strong>Cmentarz:</strong> {orderDetails?.graveCemetery}</p>
            <p><strong>Szczegóły grobu:</strong> {orderDetails?.graveDetails}</p>
            <p><strong>Imię osoby pochowanej:</strong> {orderDetails?.gravePersonName}</p>
            <h2>Asortyment wybrany przez klienta</h2>
            {Array.isArray(orderDetails?.selectedItems) && orderDetails.selectedItems.length > 0 ? (
                <table className="productTable">
                    <thead>
                    <tr>
                        <th>Miniaturka</th>
                        <th>Kategoria</th>
                        <th>Nazwa</th>
                        <th>Cena</th>
                        <th>Przygotowano</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderDetails.selectedItems.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.category !== 'music' ? (
                                    Array.isArray(item.imageUrls) && item.imageUrls.length > 0 ? (
                                        <Image
                                            src={item.imageUrls[0]}
                                            alt={item.name || 'Produkt'}
                                            className="productThumbnail"
                                            width={100}
                                            height={100}
                                            style={{objectFit: 'cover'}}
                                        />
                                    ) : (
                                        <span>Brak obrazu</span>
                                    )
                                ) : (
                                    <span>Brak obrazu</span>
                                )}
                            </td>
                            <td>{categoryNames[item.category]}</td>
                            <td>{item.name}</td>
                            <td>{item.price} zł</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={preparedItems[index] || false}
                                    onChange={() => handleItemToggle(index)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Brak wybranego asortymentu.</p>
            )}

            <div className="totalSection">
                <h3>Łączna wartość asortymentu: {calculateTotal()} zł</h3>
            </div>
        </div>
    );
};

const DashboardWithAuth = () => (
    <AuthGuardFuneral>
        <OrderDetails/>
    </AuthGuardFuneral>
);

export default DashboardWithAuth;
