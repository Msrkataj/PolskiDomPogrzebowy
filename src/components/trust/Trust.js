import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import StarRating from '../search/StarRating';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const ZaufaliNam = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        author: '',
        email: '',
        rate: 0,
        text: ''
    });
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            const querySnapshot = await getDocs(collection(db, 'reviews'));
            const reviewsData = [];
            querySnapshot.forEach((doc) => {
                const review = doc.data();
                if (review.admin) {
                    reviewsData.push(review);
                }
            });
            setReviews(reviewsData);
        };
        fetchReviews();
    }, []);

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleStarClick = (rate) => {
        setNewReview({ ...newReview, rate });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewToSave = {
            ...newReview,
            date: Timestamp.now(), // Save date as a Firestore Timestamp
            verification: false,
            admin: false // Default admin to false
        };

        // Check if the email exists in the 'forms' collection
        const formsSnapshot = await getDocs(collection(db, 'forms'));
        formsSnapshot.forEach((doc) => {
            const formData = doc.data();
            if (formData.email === newReview.email) {
                reviewToSave.verification = true;
            }
        });

        await addDoc(collection(db, 'reviews'), reviewToSave);
        setNewReview({
            author: '',
            email: '',
            rate: 0,
            text: ''
        });

        // Show the success message
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000); // Hide after 2 seconds
    };


    return (
        <div className="container reviews">
            <div id="opinie" className="review-section">
                <h2 className="review-title">Zaufali nam</h2>
                <p className="review-description">
                    Jesteśmy dumni, że tak wiele osób i firm zaufało nam w tych trudnych momentach.
                </p>
                <p className="review-description">
                    Poniżej znajdą Państwo opinie naszych klientów oraz listę domów pogrzebowych, z którymi współpracujemy.
                </p>
                <p className="review-description">
                    Ich pozytywne doświadczenia są dla nas największą motywacją do dalszego doskonalenia naszych usług.
                </p>
                <AutoplaySlider
                    animation="cubeAnimation"
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={6000}
                >
                    {reviews
                        .filter((review) => review.author && review.rate && review.text) // Filter out empty reviews
                        .map((review, index) => (
                            <div key={index} className="review-card">
                                <p className="review-author">{review.author}</p>
                                <p className="review-date">{new Date(review.date.seconds * 1000).toLocaleDateString('pl-PL')} - {review.verification && <span className="verified">Zweryfikowana opinia</span>}</p>
                                <StarRating rating={review.rate} />
                                <p className="review-text">{review.text}</p>
                            </div>
                        ))}
                </AutoplaySlider>
                <div id="podziel-sie" className="share-opinion">
                    <h3>Podziel się swoją opinią</h3>
                    <p>Twoja opinia jest dla nas bardzo ważna. Podziel się swoimi doświadczeniami i pomóż nam stać się jeszcze lepszymi.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="author"
                            placeholder="Imię"
                            value={newReview.author}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newReview.email}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="star-rating">
                            <p>Twoja ocena:</p>
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    className={star <= newReview.rate ? 'filled' : ''}
                                    onClick={() => handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            name="text"
                            placeholder="Twoja opinia"
                            value={newReview.text}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <button type="submit">Wyślij</button>
                    </form>
                    {showMessage && (
                        <div className="success-message">
                            Twoja opinia została pomyślnie wysłana i oczekuje na weryfikację.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ZaufaliNam;

