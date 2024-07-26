import '../styles/styles.scss';
import React, { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setShowing(true);
    }, []);

    if (!showing) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <>
                <Component {...pageProps} />
            </>
        );
    }
}

export default MyApp;
