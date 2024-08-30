import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-delete">
            <div className="modal-delete__overlay">
                <div className="modal-delete__container">
                    <h2 className="modal-delete__title">Czy na pewno chcesz usunąć ten formularz?</h2>
                    <div className="mmodal-delete__actions">
                        <button className="modal-delete__button modal__button--cancel" onClick={onClose}>Anuluj</button>
                        <button className="modal-delete__button modal__button--confirm" onClick={onConfirm}>Usuń</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
