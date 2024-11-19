// Dashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faQuestionCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import Uwagi from './Comments';
import useFetchFuneralHomeData from './FetchFuneralHomeData';
import Image from 'next/image';
import AuthGuardFuneral from "@/components/panel/AuthGuardFuneral";
import Link from "next/link";

const Dashboard = () => {
    const funeralHome = useFetchFuneralHomeData();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState({});
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

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);
    const [previousStatus, setPreviousStatus] = useState('');
    const [orderToUpdate, setOrderToUpdate] = useState(null);

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
    const [statusPercentages, setStatusPercentages] = useState({
        'Nowe zgłoszenie': 10,
        'Weryfikacja danych': 20,
        'Oczekiwanie na dokumenty': 30,
        'Planowanie ceremonii': 40,
        'Potwierdzenie terminu': 50,
        'Przygotowanie miejsca pochówku': 60,
        'Oczekiwanie na odbiór trumny/urny': 70,
        'Przygotowanie ciała': 80,
        'Ceremonia pogrzebowa': 90,
        'Zakończone': 100
    });

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

            // Inicjalizacja statusów zamówień
            setOrderStatuses(ordersData.reduce((acc, order) => {
                acc[order.id] = order.status || '';
                return acc;
            }, {}));

        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    }, [funeralHome]);

    useEffect(() => {
        const checkUserAuthAndFetchOrders = async () => {
            const userRole = localStorage.getItem('userRole');
            if (!userRole || userRole !== 'funeralHome') {
                router.push('/login');
            } else {
                await fetchOrders();
            }
        };

        checkUserAuthAndFetchOrders();
    }, [funeralHome, router, fetchOrders]);

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

                    // Aktualizacja statusów zamówień
                    setOrderStatuses(prevStatuses => {
                        const newStatuses = { ...prevStatuses };
                        updatedOrders.forEach(order => {
                            newStatuses[order.id] = order.status || '';
                        });
                        return newStatuses;
                    });
                }
            );

            return () => unsubscribe();
        }
    }, [funeralHome]);

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
        return statusPercentages[status] || 0;  // Domyślnie 0% jeśli status nie został znaleziony
    };

    const ProgressIndicator = ({ progress }) => (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
                {progress}%
            </div>
        </div>
    );

    const handleStatusChange = (orderId, newStatus) => {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        if (newStatus === 'Zakończone') {
            // Przywróć poprzedni status w interfejsie
            setOrderStatuses(prevStatuses => ({
                ...prevStatuses,
                [orderId]: prevStatuses[orderId]
            }));

            // Pokaż modal potwierdzenia
            setShowConfirmationModal(true);
            setOrderIdToUpdate(orderId);
            setPreviousStatus(orderStatuses[orderId]);
            setOrderToUpdate(order);
        } else {
            // Aktualizuj status od razu
            updateOrderStatus(orderId, newStatus);

            // Aktualizuj stan lokalny
            setOrderStatuses(prevStatuses => ({
                ...prevStatuses,
                [orderId]: newStatus
            }));
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        const orderRef = doc(db, 'forms', orderId);
        await updateDoc(orderRef, { status: newStatus });

        // Aktualizuj stan lokalny
        setOrderStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: newStatus
        }));

        console.log(`Powiadomienie do klienta: status zmieniony na ${newStatus}`);
    };

    const handleConfirmStatusChange = async () => {
        if (orderIdToUpdate) {
            // Aktualizuj status na 'Zakończone'
            await updateOrderStatus(orderIdToUpdate, 'Zakończone');

            // Wyślij e-mail do klienta
            await sendEmailToClient(orderToUpdate);

            // Zamknij modal
            setShowConfirmationModal(false);
            setOrderIdToUpdate(null);
            setPreviousStatus('');
            setOrderToUpdate(null);
        }
    };

    const handleCancelStatusChange = () => {
        if (orderIdToUpdate && previousStatus) {
            // Przywróć poprzedni status w interfejsie
            setOrderStatuses(prevStatuses => ({
                ...prevStatuses,
                [orderIdToUpdate]: previousStatus
            }));

            // Zamknij modal
            setShowConfirmationModal(false);
            setOrderIdToUpdate(null);
            setPreviousStatus('');
            setOrderToUpdate(null);
        }
    };

    const sendEmailToClient = async (order) => {
        const clientEmail = order.email;

        const emailData = {
            to: clientEmail,
            subject: 'Prośba o opinię - Polski Dom Pogrzebowy',
            message: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="text-align: center; color: #333;">Prośba o opinię</h2>
                    <p>Szanowni Państwo,</p>
                    <p>Chcielibyśmy poznać Państwa opinię na temat świadczonych przez nas usług. Państwa feedback jest dla nas niezwykle ważny i pomoże nam w dalszym doskonaleniu naszych usług.</p>
                    <p>Prosimy o poświęcenie chwili na wypełnienie krótkiej ankiety.</p>
                    <p><a href="https://polskidompogrzebowy.pl/ankieta?id=${order.id}" style="background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none;">Wypełnij ankietę</a></p>
                    <p>Z poważaniem,<br/>Polski Dom Pogrzebowy</p>
                </div>
            `,
        };

        try {
            const response = await fetch('/api/send-email-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('E-mail został wysłany pomyślnie.', order.id);
            } else {
                console.error('Błąd podczas wysyłania e-maila:', result.error);
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania e-maila:', error);
        }
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

    const handleManageStatuses = () => {
        setShowStatusModal(true);
    };

    const [newStatusPercentage, setNewStatusPercentage] = useState(0);

    const handlePercentageChange = (status, newPercentage) => {
        setStatusPercentages(prev => ({
            ...prev,
            [status]: newPercentage
        }));
    };

    const handleAddCustomStatus = () => {
        if (newStatus && !statusOptions.includes(newStatus)) {
            setStatusOptions([...statusOptions, newStatus]);
            setStatusPercentages(prev => ({
                ...prev,
                [newStatus]: newStatusPercentage
            }));
            setNewStatus('');
            setNewStatusPercentage(0);  // Resetuj po dodaniu
        }
    };

    const handleDeleteStatus = (statusToDelete) => {
        if (window.confirm(`Czy na pewno chcesz usunąć status "${statusToDelete}"?`)) {
            setStatusOptions(statusOptions.filter(status => status !== statusToDelete));
        }
    };

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
            {!funeralHome.profileCompleted ? (
                <div className="button-completed">
                    <Link href={"/funeral/first"} >Nie uzupełniłeś profilu, uzupełnij tutaj i aktywuj</Link>
                </div>

            ) : null}
            {!funeralHome.profileCompleted2 && funeralHome.profileCompleted ? (
                <div className="button-completed">
                    <Link href={"/funeral/first-form"} >Nie uzupełniłeś profilu, uzupełnij tutaj i aktywuj</Link>
                </div>

            ) : null}
            {!funeralHome.profileCompleted3 && funeralHome.profileCompleted && funeralHome.profileCompleted2 ? (
                <div className="button-completed">
                    <Link href={"/funeral/first-summary"} >Nie uzupełniłeś profilu, uzupełnij tutaj i aktywuj</Link>
                </div>
            ) : null}
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
                        <th>Email</th>
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
                                <td>{order.email}</td>
                                <td>{order.phone}</td>
                                <td>{order.formType}</td>
                                <td><Uwagi formId={order.id} formDate={order.date}/></td>
                                <td>
                                    <select
                                        value={orderStatuses[order.id] || ''}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        {statusOptions.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <ProgressIndicator progress={calculateProgress(orderStatuses[order.id])}/>
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
                            <td colSpan="10" style={{textAlign: 'center'}}>
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
            <button onClick={handleManageStatuses} className="manageStatusButton">Zarządzaj statusami</button>
            {/* Modal potwierdzenia zmiany statusu na 'Zakończone' */}
            {showConfirmationModal && (
                <div className="modal-overlay" onClick={() => setShowConfirmationModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Potwierdzenie zmiany statusu</h3>
                        <p>Czy na pewno chcesz zmienić status na "Zakończone"? Spowoduje to wysłanie prośby o opinię do klienta.</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirmStatusChange} className="confirm-button">Akceptuj</button>
                            <button onClick={handleCancelStatusChange} className="cancel-button">Anuluj</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal do zarządzania statusami */}
            {showStatusModal && (
                <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Zarządzaj statusami</h3>
                        <ul className="status-list">
                            {statusOptions.map((status, index) => (
                                <li key={index} className="status-item">
                                    <span>{status}</span>
                                    <div>
                                        <input
                                            type="number"
                                            value={statusPercentages[status]}
                                            onChange={(e) => handlePercentageChange(status, e.target.value)}
                                            className="percentage-input"
                                            min="0" max="100"
                                        />
                                        <button className="delete-status-button"
                                                onClick={() => handleDeleteStatus(status)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="add-status-form">
                            <input
                                type="text"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                placeholder="Nowy status"
                                className="status-input"
                            />
                            <input
                                type="number"
                                value={newStatusPercentage}
                                onChange={(e) => setNewStatusPercentage(e.target.value)}
                                placeholder="Procent dla nowego statusu"
                                className="percentage-input"
                                min="0" max="100"
                            />
                            <button onClick={handleAddCustomStatus} className="add-status-button">Dodaj status</button>
                        </div>
                        <button onClick={() => setShowStatusModal(false)} className="close-modal-button">Zamknij</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardWithAuth = () => (
    <AuthGuardFuneral>
        <Dashboard/>
    </AuthGuardFuneral>
);

export default DashboardWithAuth;
