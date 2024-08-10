import '../../styles/globals.scss';
import React, { useEffect, useState } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import getConfig from 'next/config';
import { LoadScript } from '@react-google-maps/api';
const libraries = ['places'];

const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
            <Component {...pageProps} />
        </LoadScript>
    );
}

export default MyApp;
