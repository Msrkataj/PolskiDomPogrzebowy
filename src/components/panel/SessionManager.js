import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const SessionManager = () => {
    const router = useRouter();

    useEffect(() => {
        const checkSession = () => {
            if (typeof window !== 'undefined') { // Upewnij się, że kod jest uruchamiany po stronie klienta
                const loginTimestamp = localStorage.getItem('loginTimestamp');
                if (loginTimestamp) {
                    const loginTime = parseInt(loginTimestamp, 10); // Użyj parseInt do konwersji
                    const currentTime = Date.now();
                    const elapsedHours = (currentTime - loginTime) / (1000 * 60 * 60);
                    if (elapsedHours > 24) {
                        logout();
                    }
                }
            }
        };

        const logout = () => {
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('loginTimestamp');
            router.push('/login');
        };

        checkSession();
        const intervalId = setInterval(checkSession, 60000); // Sprawdzaj co minutę

        return () => clearInterval(intervalId); // Sprzątanie po komponencie
    }, [router]);

    return null;
};

export default SessionManager;
