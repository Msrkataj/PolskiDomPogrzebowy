import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const useFetchFuneralHomeData = () => {
    const [funeralHome, setFuneralHome] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchFuneralHomeData = async () => {
            const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
            if (!userId) {
                router.push('/login');
                return;
            }

            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                setFuneralHome(docSnap.data());
            } else {
                console.error('No such document!');
            }
        };

        fetchFuneralHomeData();
    }, [router]);

    return funeralHome;
};

export default useFetchFuneralHomeData;
