import React from 'react';
import { useRouter } from 'next/router';

const ClientActions = () => {
    const router = useRouter();

    return (
        <div className="actions">
            <button onClick={() => router.push('/new-submission')}>Nowe zgłoszenie</button>
            <button onClick={() => router.push('/contact-consultant')}>Twój osobisty konsultant</button>
        </div>
    );
};

export default ClientActions;
