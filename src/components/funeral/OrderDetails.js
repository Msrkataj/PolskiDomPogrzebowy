import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Link from "next/link";
import Image from 'next/image';

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

                    const initialPreparedItems = data.selectedItems.reduce((acc, item, index) => {
                        acc[index] = item.prepared || false;
                        return acc;
                    }, {});
                    setLoading(false);
                    setPreparedItems(initialPreparedItems);
                } else {
                    console.error('Nie znaleziono zamówienia.');
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

        const updatedItems = orderDetails.selectedItems.map((item, idx) => {
            if (index === idx) {
                return { ...item, prepared: newPreparedItems[index] };
            }
            return item;
        });

        const docRef = doc(db, 'forms', orderId);
        await updateDoc(docRef, { selectedItems: updatedItems });
    };
console.log(orderDetails)
    const calculateTotal = () => {
        return orderDetails.selectedItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>
    const goToClientDetails = () => {
        router.push(`/funeral/client-details?clientId=${orderDetails.authorizedPerson?.id}`);
    };

    return (
        <div className="orderDetailsContainer">
            <Link className="back-link" href="/funeral/panel">
                Wróć do zleceń
            </Link>
            <h1>Szczegóły zamówienia</h1>
            <p><strong>Imię i Nazwisko Zmarłego:</strong> {orderDetails.name} {orderDetails.surname}</p>
            <p>
                <strong>Imię i Nazwisko Zamawiającego:</strong>
                <span className="clientLink" onClick={goToClientDetails}>
                    {orderDetails.authorizedPerson?.name || 'Brak danych'}
                </span>
            </p>
            <p><strong>Imię Zamawiającego:</strong> {orderDetails.authorizedPerson?.name && orderDetails.authorizedPerson?.surname || 'Brak danych'}</p>
            <p><strong>Numer kontaktowy:</strong> {orderDetails.phone}</p>
            <p><strong>Typ pogrzebu::</strong> {orderDetails.formType}</p>
            <p><strong>Kto dostarcza ubranie::</strong> {orderDetails.clothingOption}</p>
            <p><strong>Czy dochowujemy do grobu::</strong> {orderDetails.burialOption}</p>
            <p><strong>Ceremonia religijna:</strong> {orderDetails.religiousCeremony}</p>

            <h2>Asortyment wybrany przez klienta</h2>
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
                                // Sprawdzenie, czy imageUrls istnieje i jest tablicą
                                Array.isArray(item.imageUrls) && item.imageUrls.length > 0 ? (
                                    <Image
                                        src={item.imageUrls[0]}  // Użycie pierwszego elementu z tablicy imageUrls
                                        alt={item.name || 'Produkt'}  // Domyślny tekst alternatywny
                                        className="productThumbnail"
                                        width={100}  // Ustawienia szerokości obrazu
                                        height={100}  // Ustawienia wysokości obrazu
                                        style={{ objectFit: 'cover' }}  // Styl dopasowania obrazu
                                    />
                                ) : (
                                    // Jeśli imageUrls nie jest tablicą, ale istnieje jako pojedynczy URL
                                    typeof item.imageUrls === 'string' && item.imageUrls.trim() !== '' ? (
                                        <Image
                                            src={item.imageUrls}  // Bezpośrednie użycie URL
                                            alt={item.name || 'Produkt'}  // Domyślny tekst alternatywny
                                            className="productThumbnail"
                                            width={100}  // Ustawienia szerokości obrazu
                                            height={100}  // Ustawienia wysokości obrazu
                                            style={{ objectFit: 'cover' }}  // Styl dopasowania obrazu
                                        />
                                    ) : (
                                        <span>Brak obrazu</span>  // Jeśli brak imageUrls, wyświetl tekst
                                    )
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
            <div className="totalSection">
                <h3>Łączna wartość asortymentu: {calculateTotal()} zł</h3>
            </div>
        </div>
    );
};

export default OrderDetails;
