import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from "next/link";
import StarRating from "@/components/search/StarRating";
import { useRouter } from 'next/router';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { homeId } = router.query; // Pobieranie ID z URL

    useEffect(() => {
        const fetchReviews = async () => {
            if (!homeId) {
                console.error('Brak identyfikatora domu pogrzebowego.');
                return;
            }

            const docRef = doc(db, 'domyPogrzebowe', homeId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setReviews(data.reviews || []);
            } else {
                console.error('Nie znaleziono dokumentu.');
            }

            setLoading(false);
        };

        fetchReviews();
    }, [homeId]); // homeId jako zależność, aby ponownie wykonać funkcję przy każdej zmianie ID w URL

    if (loading) {
        return <p>Ładowanie opinii...</p>;
    }

    return (
        <div className="container">
            <div className="reviews-container">
                <Link className="back-link back-button" href="/admin/funerals">
                    Wróć do domów pogrzebowych
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
            </div>
        </div>
    );
};

export default Reviews;
