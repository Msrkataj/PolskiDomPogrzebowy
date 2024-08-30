import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Uwagi from './Comments';
import useFetchFuneralHomeData from './FetchFuneralHomeData';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const Dashboard = () => {
    const funeralHome = useFetchFuneralHomeData(); // Użycie hooka do pobrania danych
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
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

    // Fetch orders function wrapped in useCallback
    const fetchOrders = useCallback(async () => {
        if (!funeralHome) return;

        try {
            const q = query(collection(db, 'forms'), where('funeralHomeName', '==', funeralHome.funeralHomeName));
            const querySnapshot = await getDocs(q);

            let ordersData = [];
            querySnapshot.forEach((doc) => {
                ordersData.push({ id: doc.id, ...doc.data() });
            });

            // Sortowanie zamówień po timestamp, od najnowszych do najstarszych
            ordersData = ordersData.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());

            setOrders(ordersData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    }, [funeralHome]);

    // Sprawdzenie autoryzacji użytkownika i pobranie zamówień
    useEffect(() => {
        const checkUserAuthAndFetchOrders = async () => {
            const userRole = localStorage.getItem('userRole');
            if (!userRole || userRole !== 'funeralHome') {
                router.push('/login');
            } else {
                await fetchOrders(); // Inicjalizacja danych
            }
        };

        checkUserAuthAndFetchOrders();
    }, [funeralHome, router, fetchOrders]); // Dodaj router i fetchOrders jako zależności

    // Subskrypcja na zmiany zamówień
    useEffect(() => {
        if (funeralHome) {
            const unsubscribe = onSnapshot(
                query(collection(db, 'forms'), where('funeralHomeName', '==', funeralHome.funeralHomeName)),
                (snapshot) => {
                    let updatedOrders = [];
                    snapshot.forEach((doc) => {
                        updatedOrders.push({ id: doc.id, ...doc.data() });
                    });

                    // Sortowanie zamówień po timestamp, od najnowszych do najstarszych
                    updatedOrders = updatedOrders.sort((a, b) => {
                        const dateA = a.timestamp ? a.timestamp.toDate() : new Date(0);
                        const dateB = b.timestamp ? b.timestamp.toDate() : new Date(0);
                        return dateB - dateA;
                    });

                    setOrders(updatedOrders);
                }
            );

            return () => unsubscribe();
        }
    }, [funeralHome]); // fetchOrders nie jest potrzebne jako zależność

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

    const calculateProgress = (status) => {
        const statusIndex = statusOptions.indexOf(status);
        return Math.round(((statusIndex + 1) / statusOptions.length) * 100);
    };

    const ProgressIndicator = ({ progress }) => (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
                {progress}%
            </div>
        </div>
    );

    const handleStatusChange = async (orderId, newStatus) => {
        const orderRef = doc(db, 'forms', orderId);
        await updateDoc(orderRef, { status: newStatus });

        console.log(`Powiadomienie do klienta: status zmieniony na ${newStatus}`);
    };

    const handleRowSelect = (orderId) => {
        if (selectedRows.includes(orderId)) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
    };

    const formatDate = (order) => {
        if (order.timestamp) {
            return dayjs(order.timestamp.toDate()).format('DD.MM.YYYY HH:mm');
        }
        return 'Brak daty';
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

    useEffect(() => {
        const statusHelpElement = document.querySelector('.status-help');
        const tooltip = document.querySelector('.status-tooltip');

        if (statusHelpElement && tooltip) {
            const handleMouseEnter = () => {
                const rect = statusHelpElement.getBoundingClientRect();
                tooltip.style.top = `${rect.top + window.scrollY - 150}px`;
                tooltip.style.left = `${rect.left + window.scrollX + rect.width - 300}px`;
                tooltip.style.display = 'block';
            };

            const handleMouseLeave = () => {
                tooltip.style.display = 'none';
            };

            statusHelpElement.addEventListener('mouseenter', handleMouseEnter);
            statusHelpElement.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                statusHelpElement.removeEventListener('mouseenter', handleMouseEnter);
                statusHelpElement.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    // Paginacja
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>

    return (
        <div className="dashboardContainer">
            <h1>Witamy w Twoim Panelu Domu Pogrzebowego</h1>
            <div className="funeralHomeInfo">
                <Image
                    src={funeralHome.logoUrl}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="funeralHomeLogo"
                />
                <div className="funeralHomeDetails">
                    <h2>{funeralHome.funeralHomeName}</h2>
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
                        <th>Skrót Zamówienia</th>
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
                        <th>Progres</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((order) => (
                            <tr key={order.id} className={selectedRows.includes(order.id) ? 'selected' : ''}>
                                <td><input type="checkbox" checked={selectedRows.includes(order.id)}
                                           onChange={() => handleRowSelect(order.id)}/></td>
                                <td>{formatDate(order)}</td>
                                <td>{order.name} {order.surname}</td>
                                <td
                                    className="clickableName"
                                    onClick={() => handleActionSelect(order.id, 'clientDetails')}
                                >
                                    {order.authorizedPerson?.name || 'Brak danych'}
                                </td>
                                <td>{order.phone}</td>
                                <td>{order.formType}</td>
                                <td><Uwagi formId={order.id} formDate={order.date}/></td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        {statusOptions.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <ProgressIndicator progress={calculateProgress(order.status)}/>
                                </td>
                                <td>
                                    <div className="cogButtonWrapper">
                                        <button className="cogButton" onClick={() => toggleActionDropdown(order.id)}>
                                            <FontAwesomeIcon icon={faCog}/>
                                        </button>
                                        {activeActionDropdown === order.id && (
                                            <div className="actionDropdown">
                                                <div className="button"
                                                     onClick={() => handleActionSelect(order.id, 'clientDetails')}>Zobacz
                                                    szczegóły klienta
                                                </div>
                                                <div className="button"
                                                     onClick={() => handleActionSelect(order.id, 'orderDetails')}>Zobacz
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
                            <td colSpan="9" style={{textAlign: 'center'}}>
                                Brak zamówień do wyświetlenia.
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

export default Dashboard;
