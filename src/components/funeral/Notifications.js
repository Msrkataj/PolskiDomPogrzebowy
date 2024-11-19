import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const Notifications = ({ notifications, formCreatedTimestamp }) => {
    const [sortedNotifications, setSortedNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 10;

    useEffect(() => {
        if (notifications.length > 0) {
            const sorted = [...notifications].sort((a, b) => {
                const dateA = a.timestamp ? (typeof a.timestamp.toDate === 'function' ? a.timestamp.toDate() : new Date(a.timestamp)) : new Date();
                const dateB = b.timestamp ? (typeof b.timestamp.toDate === 'function' ? b.timestamp.toDate() : new Date(b.timestamp)) : new Date();
                return dateB - dateA; // Sort by newest first
            });
            setSortedNotifications(sorted);
        }
    }, [notifications]);


    // Calculate the indices for the current page
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = sortedNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="notifications-section">
            <h2>Powiadomienia</h2>
            <ul>
                {currentNotifications.map((notification, index) => (
                    <li key={index}>
                        <strong>
                            {dayjs(notification.timestamp?.toDate ? notification.timestamp.toDate() : notification.timestamp).format('DD.MM.YYYY HH:mm')}:
                        </strong>
                        {notification.message}
                    </li>
                ))}
            </ul>
            {/* Pagination Controls */}
            <div className="pagination-controls">
                {Array.from({length: Math.ceil(sortedNotifications.length / notificationsPerPage)}, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
