import React, { useState } from 'react';

const servicesList = [
    "Organizacja ceremonii pogrzebowej",
    "Kremacja",
    "Transport zwłok",
    "Pomoc w załatwianiu formalności",
    "Ekshumacja",
    "Usługi florystyczne",
    "Przewozy międzynarodowe",
    "Usługi balsamowania",
    "Odzyskiwanie szczątków",
    "Sprzedaż trumien i urn",
    "Wynajem karawanu",
    "Muzyka pogrzebowa",
    "Dekoracje pogrzebowe"
];

const Modal = ({ services, onSave, onCancel }) => {
    const [selectedServices, setSelectedServices] = useState(services);

    const handleServiceChange = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleSubmit = () => {
        onSave(selectedServices);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edytuj usługi</h2>
                <div className="services">
                    {servicesList.map(service => (
                        <div key={service}>
                            <input
                                type="checkbox"
                                checked={selectedServices.includes(service)}
                                onChange={() => handleServiceChange(service)}
                            />
                            <label>{service}</label>
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button onClick={handleSubmit}>Zapisz</button>
                    <button onClick={onCancel}>Anuluj</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
