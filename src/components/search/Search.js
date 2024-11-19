import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import phoneIcon from '../../../public/assets/icons/phone.png';
import Link from "next/link";

const SearchResults = () => {
    const [location, setLocation] = useState('');

    useEffect(() => {
        const storedLocation = localStorage.getItem('location');
        if (storedLocation) {
            setLocation(storedLocation);
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleSearchClick = () => {
        if (location.trim()) {
            localStorage.setItem('location', location);
            window.location.reload();
        }
    };

    return (
        <div className="search-results">
            <h2>Proponowane pobliskie domy pogrzebowe</h2>
            <div className="results-content">
                <span>
                    Na podstawie Twojej lokalizacji, dobraliśmy dla Ciebie najbardziej odpowiedni dom pogrzebowy,
                    z którym mamy podpisaną umowę.<br/> Dzięki temu masz pewność, że otrzymasz najwyższej jakości usługi.
                    <h3>Następnie będziesz prowadzony krok po kroku przez formularz...</h3>
                </span>
                <div className="address-input">
                    <label htmlFor="address">Adres:</label>
                    <input
                        type="text"
                        id="address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearchClick}>Szukaj</button>
                </div>
            </div>
            <div className="contact-section">
                <p>Masz jakieś pytania? Zadzwoń</p>
                <div className="contact-option">
                    <Link href="tel:+48600000000">
                        <Image src={phoneIcon} alt="Phone" width={32} height={32} />
                        <p>+48 600 000 000</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;

