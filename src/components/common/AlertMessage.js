import React from 'react';

const AlertMessage = ({ message, type }) => {
    if (!message) return null;

    const getAlertStyle = () => {
        switch (type) {
            case 'success':
                return 'alert-success';
            case 'error':
                return 'alert-error';
            default:
                return 'alert-info';
        }
    };

    return (
        <div className={`alert ${getAlertStyle()}`}>
            {message}
        </div>
    );
};

export default AlertMessage;
