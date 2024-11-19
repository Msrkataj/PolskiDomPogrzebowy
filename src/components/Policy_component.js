import React, { useState, useEffect } from 'react';
import Link from "next/link";

const CookieConsent = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const consent = getCookie('cookie_consent');
        if (!consent) {
            setShowModal(true);
        }
    }, []);

    const acceptCookies = () => {
        setCookie('cookie_consent', 'true', 365);
        setShowModal(false);
    };

    const getCookie = (name) => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const setCookie = (name, value, days) => {
        if (typeof document === 'undefined') return;
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    };

    if (!showModal) {
        return null;
    }

    return (
        <div className="cookie-consent">
            <h3>Respektujemy Twoje prawo do prywatności</h3>
            <p>
                Przebywając na stronie, akceptujesz to że używamy pliki cookies w celu zapewnienia poprawnego działania strony oraz dla celów
                analitycznych. Kontynuując korzystanie z serwisu, wyrażasz zgodę na używanie plików
                cookies. Zapewniamy Cię, że Twoje dane są skrupulatnie przechowywane z zachowaniem pełnej poufności.
                <Link href="/polityka-prywatnosci">
                 Dowiedz się więcej w naszej Polityce Prywatności.
            </Link>
        </p>
            <button onClick={acceptCookies}>Akceptuję</button>
        </div>
    );
};

export default CookieConsent;
