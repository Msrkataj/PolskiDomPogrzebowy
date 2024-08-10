import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.clear();
        router.push('/login');
    }, [router]);

    return null;
};

export default Logout;
