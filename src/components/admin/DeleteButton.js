import React, { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import nowego komponentu

const DeleteButton = ({ orderId, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        const orderRef = doc(db, 'forms', orderId);
        await deleteDoc(orderRef);
        console.log(`Formularz o ID ${orderId} został usunięty.`);
        onDelete(orderId);
        setIsModalOpen(false); // Zamknięcie modala po usunięciu
    };

    return (
        <>
            <div className="button" onClick={() => setIsModalOpen(true)}>
                Usuń formularz
            </div>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default DeleteButton;
