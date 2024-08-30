import React, {useEffect, useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import {db} from '../../../firebase';
import {collection, query, where, getDocs, onSnapshot, doc, updateDoc} from 'firebase/firestore';
import dayjs from 'dayjs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import Uwagi from './Comments';
import useFetchFuneralHomeData from './FetchFuneralHomeData';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
const Clients = () => {
    const funeralHome = useFetchFuneralHomeData(); // Użycie hooka do pobrania danych
    const [orders, setOrders] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusOptions, setStatusOptions] = useState([
        'Nowe zgłoszenie',
        'Weryfikacja danych',
        'Oczekiwanie na dokumenty',
        'Planowanie ceremonii',
        'Potwierdzenie terminu',
        'Przygotowanie miejsca pochówku',
        'Oczekiwanie na odbiór trumny/urny',
        'Przygotowanie ciała',
        'Ceremonia pogrzebowa',
        'Zakończone'
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeActionDropdown, setActiveActionDropdown] = useState(null);
    const itemsPerPage = 20;
    const router = useRouter();
    const statusDescriptions = {
        'Nowe zgłoszenie': 'Nowe, jeszcze nieprzetworzone zamówienie.',
        'Weryfikacja danych': 'Zamówienie jest w trakcie weryfikacji danych.',
        'Oczekiwanie na dokumenty': 'Oczekiwanie na dostarczenie brakujących dokumentów.',
        'Planowanie ceremonii': 'Ustalane są szczegóły ceremonii pogrzebowej.',
        'Potwierdzenie terminu': 'Termin ceremonii został potwierdzony z klientem.',
        'Przygotowanie miejsca pochówku': 'Trwają przygotowania do ceremonii w miejscu pochówku.',
        'Oczekiwanie na odbiór trumny/urny': 'Czekamy na dostawę lub odbiór wybranego asortymentu.',
        'Przygotowanie ciała': 'Ciało zmarłego jest przygotowywane do pochówku lub kremacji.',
        'Ceremonia pogrzebowa': 'Ceremonia pogrzebowa jest w trakcie realizacji.',
        'Zakończone': 'Wszystkie czynności związane z zamówieniem zostały zakończone.'
    };
    const fetchOrders = useCallback(async () => {
        if (!funeralHome) return;

        try {
            const q = query(collection(db, 'forms'), where('funeralHomeName', '==', funeralHome.funeralHomeName));
            const querySnapshot = await getDocs(q);

            const ordersData = [];
            querySnapshot.forEach((doc) => {
                ordersData.push({ id: doc.id, ...doc.data() });
            });

            setOrders(ordersData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    }, [funeralHome]); // Zależność od funeralHome

    useEffect(() => {
        if (funeralHome) {
            fetchOrders(); // Teraz bezpieczne wywołanie z useEffect

            const unsubscribe = onSnapshot(
                query(collection(db, 'forms'), where('funeralHomeName', '==', funeralHome.funeralHomeName)),
                (snapshot) => {
                    const updatedOrders = [];
                    snapshot.forEach((doc) => {
                        updatedOrders.push({ id: doc.id, ...doc.data() });
                    });
                    setOrders(updatedOrders);
                }
            );

            return () => unsubscribe();
        }
    }, [funeralHome, fetchOrders]);

    const toggleActionDropdown = (orderId) => {
        setActiveActionDropdown(activeActionDropdown === orderId ? null : orderId);
    };

    const handleActionSelect = (orderId, action) => {
        if (action === 'clientDetails') {
            router.push(`/funeral/client-details?clientId=${orderId}`);
        } else if (action === 'orderDetails') {
            router.push(`/funeral/order-details?orderId=${orderId}`);
        }
        setActiveActionDropdown(null);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        const orderRef = doc(db, 'forms', orderId);
        await updateDoc(orderRef, {status: newStatus});

        console.log(`Powiadomienie do klienta: status zmieniony na ${newStatus}`);
    };

    const handleRowSelect = (orderId) => {
        if (selectedRows.includes(orderId)) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
    };

    const formatDate = (date) => {
        return dayjs(date).format('DD.MM.YYYY HH:mm');
    };

    const handleAddCustomStatus = () => {
        const customStatus = prompt('Wprowadź nowy status:');
        if (customStatus) {
            setStatusOptions([...statusOptions, customStatus]);
        }
    };

    const handleShowDetails = (orderId) => {
        router.push(`/funeral/manage?formId=${orderId}`);
    };


    // Paginacja
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>;

    return (
        <div className="dashboardContainer">
            <h1>Witamy w Twoim Panelu Domu Pogrzebowego</h1>
            <div className="funeralHomeInfo">
                {funeralHome && funeralHome.logoUrl && (
                    <Image
                        src={funeralHome.logoUrl}
                        alt="Logo"
                        width={100}  // Szerokość obrazu (dostosuj według potrzeb)
                        height={100}  // Wysokość obrazu (dostosuj według potrzeb)
                        className="funeralHomeLogo"
                        style={{ objectFit: 'contain' }}  // Dodaj stylizację CSS dla `objectFit`
                    />
                )}
                <div className="funeralHomeDetails">
                    {funeralHome && funeralHome.funeralHomeName && (
                        <h2>{funeralHome.funeralHomeName}</h2>
                    )}
                </div>
            </div>
            <div className="orderTableContainer">
                <table className="orderTable">
                    <thead>
                    <tr>
                        <th><input type="checkbox"
                                   onChange={(e) => setSelectedRows(e.target.checked ? orders.map(order => order.id) : [])}/>
                        </th>
                        <th>Data Złożenia</th>
                        <th>Imię i Nazwisko Zmarłego</th>
                        <th>Imię i Nazwisko Zamawiającego</th>
                        <th>Numer Kontaktowy</th>
                        <th>Kiedy będą załatwiane dokumenty?</th>
                        <th>Uwagi</th>
                        <th>
                            <div className="status-header">
                                <label>Status</label>
                                <div className="status-help">
                                    <FontAwesomeIcon icon={faQuestionCircle} className="help-icon"/>
                                    <div className="status-tooltip">
                                        {Object.entries(statusDescriptions).map(([status, description], index) => (
                                            <div key={index}>
                                                <strong>{status}:</strong> {description}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((order) => (
                        <tr key={order.id} className={selectedRows.includes(order.id) ? 'selected' : ''}>
                            <td><input type="checkbox" checked={selectedRows.includes(order.id)}
                                       onChange={() => handleRowSelect(order.id)}/></td>
                            <td>{formatDate(order.date)}</td>
                            <td>{order.name} {order.surname}</td>
                            <td className="name-row">
    <span
        className="clickableName"
        onClick={() => handleActionSelect(order.id, 'clientDetails')}
    >
        {order.authorizedPerson?.name || 'Brak danych'}
    </span>
                            </td>
                            <td>{order.phone}</td>
                            <td>{order.documents}</td>
                            <td><Uwagi formId={order.id} formDate={order.date}/></td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    title={order.status}  // Dodanie title, aby pełny tekst był widoczny na hover
                                >
                                    {statusOptions.map((status, index) => (
                                        <option key={index} value={status} title={status}>{status}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <div className="cogButtonWrapper">
                                    <button className="cogButton" onClick={() => toggleActionDropdown(order.id)}>
                                        <FontAwesomeIcon icon={faCog}/>
                                    </button>
                                    {activeActionDropdown === order.id && (
                                        <div className="actionDropdown">
                                            <div className="button" onClick={() => handleActionSelect(order.id, 'clientDetails')}>Zobacz
                                                szczegóły klienta
                                            </div>
                                            <div className="button" onClick={() => handleActionSelect(order.id, 'orderDetails')}>Zobacz
                                                zamówienie klienta
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>
                                Brak klientów do wyświetlenia.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {/* Dodajemy paginację */}
                <div className="pagination">
                    {[...Array(Math.ceil(orders.length / itemsPerPage)).keys()].map(number => (
                        <button key={number} onClick={() => paginate(number + 1)} className="paginationButton">
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={handleAddCustomStatus} className="addStatusButton">Dodaj własny status</button>
        </div>
    );
};

export default Clients;
