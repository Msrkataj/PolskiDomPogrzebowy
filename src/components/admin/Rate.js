import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AuthGuard from "@/components/panel/AuthGuard";

const Rate = () => {
    const [reviews, setReviews] = useState([]);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [message, setMessage] = useState('');
    const [sortMessage, setSortMessage] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            const querySnapshot = await getDocs(collection(db, 'reviews'));
            const reviewsData = [];
            querySnapshot.forEach((doc) => {
                const review = doc.data();
                reviewsData.push({ id: doc.id, ...review });
            });
            setReviews(reviewsData);
        };
        fetchReviews();
    }, []);

    const handleToggleAdmin = async (id, currentStatus) => {
        const reviewDoc = doc(db, 'reviews', id);
        await updateDoc(reviewDoc, { admin: !currentStatus });
        setReviews(reviews.map(review => review.id === id ? { ...review, admin: !currentStatus } : review));
        setMessage(currentStatus ? 'Recenzja została dezaktywowana.' : 'Recenzja została aktywowana.');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleDeleteReview = async (id) => {
        const reviewDoc = doc(db, 'reviews', id);
        await deleteDoc(reviewDoc);
        setReviews(reviews.filter(review => review.id !== id));
        setMessage('Recenzja została usunięta.');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleSort = (field) => {
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);

        const sortedReviews = [...reviews].sort((a, b) => {
            if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setReviews(sortedReviews);

        const fieldName = {
            author: 'Autorzy',
            date: 'Data',
            rate: 'Ocena',
            admin: 'Aktywność'
        }[field];

        setSortMessage(`Sortujesz według: ${fieldName} (${direction === 'asc' ? 'rosnąco' : 'malejąco'})`);
        setTimeout(() => setSortMessage(''), 4000);
    };

    const renderSortArrow = (field) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="container">
            <div className="rate">
                <h2 className="rate__title">Zarządzanie opiniami</h2>
                {message && <p className="rate__message">{message}</p>}
                {sortMessage && <p className="rate__sort-message">{sortMessage}</p>}
                <p>Sortowanie, odbywa się poprzez naciśnięcie nazwy kolumny</p>

                <table className="rate__table">
                    <thead>
                    <tr>
                        <th onClick={() => handleSort('author')}>Autor {renderSortArrow('author')}</th>
                        <th onClick={() => handleSort('date')}>Data {renderSortArrow('date')}</th>
                        <th onClick={() => handleSort('rate')}>Ocena {renderSortArrow('rate')}</th>
                        <th>Treść</th>
                        <th onClick={() => handleSort('admin')}>Aktywny {renderSortArrow('admin')}</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td>{review.author}</td>
                            <td>
                                {review.date && review.date.seconds
                                    ? new Date(review.date.seconds * 1000).toLocaleDateString('pl-PL')
                                    : 'Brak daty'}
                            </td>
                            <td>{review.rate}</td>
                            <td>{review.text}</td>
                            <td>
                                {review.admin ? null : (
                                    <button
                                        className="rate__btn rate__btn--activate"
                                        onClick={() => handleToggleAdmin(review.id, review.admin)}
                                    >
                                        Aktywuj
                                    </button>
                                )}
                                {review.admin && (
                                    <button
                                        className="rate__btn rate__btn--deactivate"
                                        onClick={() => handleToggleAdmin(review.id, review.admin)}
                                    >
                                        Dezaktywuj
                                    </button>
                                )}
                            </td>
                            <td>
                                <button
                                    className="rate__btn rate__btn--delete"
                                    onClick={() => handleDeleteReview(review.id)}
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RateWithAuth = () => (
    <AuthGuard>
        <Rate />
    </AuthGuard>
);

export default RateWithAuth;