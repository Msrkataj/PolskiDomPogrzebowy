import React from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

const ClientActions = ({ handleOpenChat }) => {
    const router = useRouter();

    return (
        <div className="actions">
            <button>
                <Link href="/formularz-pierwszy" className="register-link">Nowe zgłoszenie</Link>
            </button>
            <button onClick={handleOpenChat}>Twój osobisty konsultant</button>
        </div>
    );
};

export default ClientActions;
