import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import { collection, getDocs, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Uwagi from '../funeral/Comments';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import FilterComponent from "@/components/admin/FilterComponent";
import DeleteButton from "@/components/admin/DeleteButton";
import AuthGuard from "@/components/panel/AuthGuard";

const Dashboard = () => {
    const [loading, setLoading] = useState(true); // Dodano stan ładowania
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
    const [filteredOrders, setFilteredOrders] = useState([]);
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

    const fetchOrders = async () => {
        const querySnapshot = await getDocs(collection(db, 'forms'));
        const ordersData = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => {
                const dateA = a.timestamp ? a.timestamp.toDate() : dayjs(a.date, "DD.MM.YYYY HH:mm").toDate();
                const dateB = b.timestamp ? b.timestamp.toDate() : dayjs(b.date, "DD.MM.YYYY HH:mm").toDate();
                return dateB - dateA;
            });
        setOrders(ordersData);
        setFilteredOrders(ordersData);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();

        const unsubscribe = onSnapshot(collection(db, 'forms'), (snapshot) => {
            const updatedOrders = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => {
                    const dateA = a.timestamp ? a.timestamp.toDate() : dayjs(a.date, "DD.MM.YYYY HH:mm").toDate();
                    const dateB = b.timestamp ? b.timestamp.toDate() : dayjs(b.date, "DD.MM.YYYY HH:mm").toDate();
                    return dateB - dateA;
                });
            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            setOrders([]);  // Resetowanie stanu przed ponownym załadowaniem danych
            fetchOrders();  // Ponowne załadowanie danych
        };

        // Nasłuchiwanie na zmianę trasy
        router.events.on('routeChangeComplete', handleRouteChange);

        // Czyszczenie nasłuchiwacza po odmontowaniu komponentu
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    const toggleActionDropdown = (orderId) => {
        setActiveActionDropdown(activeActionDropdown === orderId ? null : orderId);
    };

    const handleActionSelect = (orderId, action) => {
        if (action === 'clientDetails') {
            router.push(`/admin/client-details?clientId=${orderId}`);
        } else if (action === 'orderDetails') {
            router.push(`/admin/order-details?orderId=${orderId}`);
        }
        setActiveActionDropdown(null);
    };

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
        // Sprawdź, czy jest timestamp i użyj go
        if (order.timestamp) {
            return dayjs(order.timestamp.toDate()).format('DD.MM.YYYY HH:mm');
        }
        // Jeśli nie ma timestamp, użyj pola date
        if (order.date) {
            return dayjs(order.date, "DD.MM.YYYY HH:mm").format('DD.MM.YYYY HH:mm');
        }
        // Jeśli żadna z powyższych opcji nie jest dostępna, zwróć "Brak daty"
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
    const handleFilterChange = (filters) => {
        console.log("Filters applied:", filters);
        const { funeralHomeName, startDate, endDate } = filters;
        let filtered = [...orders];

        if (funeralHomeName) {
            filtered = filtered.filter(order =>
                order.funeralHomeName?.toLowerCase().includes(funeralHomeName.toLowerCase())
            );
        }

        if (startDate) {
            filtered = filtered.filter(order =>
                order.timestamp
                    ? dayjs(order.timestamp.toDate()).isAfter(dayjs(startDate))
                    : dayjs(order.date, "DD.MM.YYYY HH:mm").isAfter(dayjs(startDate))
            );
        }

        if (endDate) {
            filtered = filtered.filter(order =>
                order.timestamp
                    ? dayjs(order.timestamp.toDate()).isBefore(dayjs(endDate).endOf('day'))
                    : dayjs(order.date, "DD.MM.YYYY HH:mm").isBefore(dayjs(endDate).endOf('day'))
            );
        }

        console.log("Filtered orders:", filtered);
        setFilteredOrders(filtered);
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
    // Paginacja
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>

    return (
        <div className="dashboardContainer">
            <FilterComponent onFilterChange={handleFilterChange} />
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
                        <th>Dom Pogrzebowy</th>
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
                    {currentItems.map((order) => (
                        <tr key={order.id} className={selectedRows.includes(order.id) ? 'selected' : ''}>
                            <td><input type="checkbox" checked={selectedRows.includes(order.id)}
                                       onChange={() => handleRowSelect(order.id)}/></td>
                            <td>{formatDate(order)}</td>
                            <td>{order.name} {order.surname}</td>
                            <td>{order.authorizedPerson?.name || 'Brak danych'}</td>
                            <td>{order.phone}</td>
                            <td>{order.formType}</td>
                            <td>{order.funeralHomeName || 'Brak danych'}</td>
                            {/* Dodanie domu pogrzebowego */}
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
                                            <DeleteButton orderId={order.id} onDelete={(id) => {
                                                setOrders(orders.filter(order => order.id !== id));
                                                setFilteredOrders(filteredOrders.filter(order => order.id !== id));
                                            }}/> {/* Użycie komponentu DeleteButton */}
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
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
const DashboardWithAuth = () => (
    <AuthGuard>
        <Dashboard />
    </AuthGuard>
);

export default DashboardWithAuth;
