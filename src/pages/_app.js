import '../../styles/globals.scss';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';  // Importujemy next/head do zarządzania tagami w <head>
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any"/>
                <link rel="icon" type="image/webp" sizes="32x32" href="/favicon.webp"/>
                <link rel="icon" type="image/webp" sizes="16x16" href="/favicon.webp"/>
                <link rel="apple-touch-icon" href="/favicon.ico"/>
                <link rel="manifest" href="/favicon.webp"/>
                <title>Polski Dom Pogrzebowy - Wyszukiwarka domów pogrzebowych i formalności online</title>
                <meta
                    name="description"
                    content="Polski Dom Pogrzebowy to kompleksowe narzędzie umożliwiające wyszukiwanie domów pogrzebowych w pobliżu i załatwianie wszelkich formalności online. Zaufaj profesjonalizmowi i doświadczeniu."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Polski Dom Pogrzebowy - Wyszukiwarka domów pogrzebowych" />
                <meta property="og:description" content="Znajdź najbliższe domy pogrzebowe i załatw wszystkie formalności online. Polski Dom Pogrzebowy - Twój partner w trudnych chwilach." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy24.pl" />
                <meta property="og:image" content="https://polskidompogrzebowy24.pl/og-image.jpg" />
                <meta property="og:locale" content="pl_PL" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Polski Dom Pogrzebowy - Wyszukiwarka domów pogrzebowych" />
                <meta name="twitter:description" content="Znajdź najbliższe domy pogrzebowe i załatw wszystkie formalności online. Polski Dom Pogrzebowy - Twój partner w trudnych chwilach." />
                <meta name="twitter:image" content="https://polskidompogrzebowy24.pl/og-image.jpg" />
            </Head>

            {/* Script Section for Google Maps */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                strategy="lazyOnload"
            />

            {/* Main Component Rendering */}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
