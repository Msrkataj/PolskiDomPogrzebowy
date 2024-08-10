import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const useAuthMiddleware = (requiredRole) => {
    const router = useRouter();
    const [roleChecked, setRoleChecked] = useState(false);

    useEffect(() => {
        const checkUserRole = async () => {
            if (typeof window !== 'undefined') {
                const userRole = localStorage.getItem('userRole');
                const userId = localStorage.getItem('userId');
                const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
                const currentTime = Date.now();
                const ONE_DAY_MS = 24 * 60 * 60 * 1000;

                if (!userRole || isNaN(loginTime) || currentTime - loginTime > ONE_DAY_MS) {
                    router.push('/login');
                } else if (userRole !== requiredRole) {
                    router.push('/login');
                } else {
                    if (requiredRole === 'funeralHome') {
                        const userDocRef = doc(db, 'domyPogrzebowe', userId);
                        const userDocSnap = await getDoc(userDocRef);
                        if (userDocSnap.exists()) {
                            const userData = userDocSnap.data();
                            if (!userData.ownerName || !userData.city || !userData.street) {
                                setRoleChecked(false);
                            } else {
                                setRoleChecked(true);
                            }
                        } else {
                            router.push('/login');
                        }
                    } else {
                        setRoleChecked(true);
                    }
                }
            }
        };

        checkUserRole();
    }, [router, requiredRole]);

    return roleChecked;
};

export default useAuthMiddleware;
