import React from 'react';

const StarRating = ({ rating }) => {
    const totalStars = 5;

    if (rating === undefined) {
        return <p>Brak oceny</p>;
    }

    const filledStars = Math.round(rating);

    return (
        <div className="star-rating">
            <p>Ocena: </p>
            {Array.from({ length: totalStars }, (_, index) => (
                <span key={index} className={index < filledStars ? 'filled' : ''}>
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
