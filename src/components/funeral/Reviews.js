import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Importujemy updateDoc do aktualizacji ratingu
import Link from "next/link";
import StarRating from "@/components/search/StarRating";
import AuthGuardFuneral from "@/components/panel/AuthGuardFuneral";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('Brak identyfikatora użytkownika.');
                return;
            }

            const docRef = doc(db, 'domyPogrzebowe', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const reviewsData = data.reviews || [];
                setReviews(reviewsData);

                // Obliczamy średnią ocen, jeśli są dostępne recenzje
                if (reviewsData.length > 0) {
                    const totalRating = reviewsData.reduce((acc, review) => acc + parseInt(review.rating), 0);
                    const avgRating = Math.round(totalRating / reviewsData.length); // Zaokrąglamy do najbliższej liczby całkowitej
                    setAverageRating(avgRating);

                    // Aktualizujemy pole `rating` w Firestore
                    await updateDoc(docRef, { rating: avgRating.toString() }); // Zapisujemy rating jako string
                }
            } else {
                console.error('Nie znaleziono dokumentu.');
            }

            setLoading(false);
        };

        fetchReviews();
    }, []);

    if (loading) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>;

    return (
        <div className="container">
            <div className="reviews-container">
                <Link className="back-link" href="/funeral/panel">
                    Wróć do panelu
                </Link>
                <h2>Opinie</h2>
                {reviews.length === 0 ? (
                    <p>Brak opinii</p>
                ) : (
                    <div className="reviews-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <div className="review-main">
                                    <p className="review-text">&quot;{review.text}&quot;</p>
                                    <span className="review-author">- {review.author}</span>
                                </div>
                                <div className="review-meta">
                                    <span className="review-date">{review.date}</span>
                                    <span className="review-rating"><StarRating rating={review.rating} /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Wyświetlamy średnią ocen, jeśli została obliczona */}
                {averageRating !== null && (
                    <div className="average-rating">
                        <h3>Średnia ocena: {averageRating}/5</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

const DashboardWithAuth = () => (
    <AuthGuardFuneral>
        <Reviews />
    </AuthGuardFuneral>
);

export default DashboardWithAuth;
