import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const AuthGuardClient = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const verifyUser = async () => {
            const userEmail = localStorage.getItem('userEmail');
            const userRole = localStorage.getItem('userRole');

            if (!userEmail || userRole !== 'client') {
                // Przekieruj na stronę logowania, jeśli nie ma emaila lub rola nie jest admin
                router.push('/login');
                return;
            }

            try {
                // Pobierz dane użytkownika z Firestore na podstawie emaila
                const q = query(collection(db, 'forms'), where('email', '==', userEmail));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // Przekieruj na stronę logowania, jeśli użytkownik nie istnieje
                    router.push('/login');
                    return;
                }

                setAuthenticated(true);
                setLoading(false);
            } catch (error) {
                console.error('Błąd podczas uwierzytelniania:', error);
                router.push('/login');
            }
        };

        verifyUser();
    }, [router]);

    if (loading) {
        return (
            <div className="loadingContainer">
                <div className="loadingSpinner"></div>
                <div className="loadingText">Sprawdzanie uwierzytelnienia...</div>
            </div>
        );
    }
    if (!authenticated) {
        return null;
    }
    return children;
};

export default AuthGuardClient;
