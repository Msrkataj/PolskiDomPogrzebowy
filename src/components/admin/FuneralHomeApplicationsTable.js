import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import AuthGuard from "@/components/panel/AuthGuard";

const FuneralHomeApplicationsTable = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [activeActionDropdown, setActiveActionDropdown] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'approve' or 'delete'
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [newApplication, setNewApplication] = useState({
        funeralHomeName: '',
        city: '',
        street: '',
        postalCode: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        const fetchApplications = async () => {
            const querySnapshot = await getDocs(collection(db, 'application'));
            const applicationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setApplications(applicationsData);
        };

        fetchApplications();
    }, []);
    const generatePassword = () => {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    };

    const toggleActionDropdown = (applicationId) => {
        setActiveActionDropdown(activeActionDropdown === applicationId ? null : applicationId);
    };

    const handleApprove = async (application) => {
        setErrorMessage(''); // Reset error message

        if (!validateEmail(application.email)) {
            setErrorMessage('Nieprawidłowy format adresu e-mail.');
            return;
        }

        // Sprawdzanie, czy e-mail już istnieje w domyPogrzebowe i czy isApproved = true
        const emailQuery = query(collection(db, 'application'), where('email', '==', application.email));
        const querySnapshot = await getDocs(emailQuery);

        if (!querySnapshot.empty) {
            // Istnieje użytkownik z tym adresem e-mail
            const existingDocument = querySnapshot.docs[0].data(); // Zakładam, że e-mail jest unikalny

            if (existingDocument.isApproved) {
                // Jeżeli isApproved jest na true, wyświetlamy komunikat i przerywamy
                setErrorMessage('Wniosek z tym adresem e-mail został już zaakceptowany.');
                return;
            }
        }

        // Jeżeli nie istnieje użytkownik z isApproved = true, przechodzimy do akceptacji
        setSelectedApplication(application);
        setModalType('approve');
        setShowModal(true);
    };



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleDelete = (application) => {
        setSelectedApplication(application);
        setModalType('delete');
        setShowModal(true);
    };

    const handleConfirmApprove = async () => {
        if (selectedApplication) {
            const password = generatePassword();
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Dodaj nowy dokument do 'domyPogrzebowe' z polem isApproved = true
            await addDoc(collection(db, 'domyPogrzebowe'), {
                ...selectedApplication,
                password: hashedPassword,
                isApproved: true,  // Nowe pole informujące o akceptacji
                createdAt: dayjs().format('DD.MM.YYYY HH:mm'),
            });

            const applicationRef = doc(db, 'application', selectedApplication.id);
            await updateDoc(applicationRef, {
                accountCreated: true,
                generatedPassword: password,
                isApproved: true,  // Aktualizacja pola w 'application'
            });

            // Wyślij e-mail z informacjami do użytkownika
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: selectedApplication.email,
                        password: password,
                    }),
                });

                if (response.ok) {
                    setShowSuccessMessage(true);
                } else {
                    console.error('Błąd podczas wysyłania e-maila');
                }
            } catch (error) {
                console.error('Błąd podczas wywoływania API:', error);
            }

            setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload();
            }, 3000); // Pokazuj wiadomość przez 3 sekundy

            setShowModal(false);
            setSelectedApplication(null);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedApplication) {
            const applicationRef = doc(db, 'application', selectedApplication.id);
            await deleteDoc(applicationRef);
            setApplications(applications.filter(app => app.id !== selectedApplication.id));
            setShowModal(false);
            setSelectedApplication(null);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedApplication(null);
    };

    const handleCreateNewApplication = async () => {
        await addDoc(collection(db, 'application'), newApplication);
        setShowCreateForm(false);
        window.location.reload();
    };

    const handleChange = (e) => {
        setNewApplication({
            ...newApplication,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="applications-container">
            <Link className="applications-container__back-link" href="/admin/funerals">
                Wróć do domów pogrzebowych
            </Link>
            <h2 className="applications-container__title">Nowe Wnioski o Dom Pogrzebowy</h2>
            <button className="applications-container__create-button" onClick={() => setShowCreateForm(true)}>
                Stwórz Własny Wniosek
            </button>
            {showCreateForm && (
                <div className="modal-overlay-new-funeral" onClick={() => setShowCreateForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-content__title">Stwórz Nowy Wniosek</h3>
                        <input
                            type="text"
                            name="funeralHomeName"
                            placeholder="Nazwa Domu Pogrzebowego"
                            className="modal-content__input"
                            value={newApplication.funeralHomeName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="Miasto"
                            className="modal-content__input"
                            value={newApplication.city}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="street"
                            placeholder="Ulica"
                            className="modal-content__input"
                            value={newApplication.street}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Kod Pocztowy"
                            className="modal-content__input"
                            value={newApplication.postalCode}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="modal-content__input"
                            value={newApplication.email}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefon"
                            className="modal-content__input"
                            value={newApplication.phone}
                            onChange={handleChange}
                        />
                        <div className="modal-content__actions">
                            <button className="modal-content__confirm-button" onClick={handleCreateNewApplication}>
                                Wyślij
                            </button>
                            <button className="modal-content__cancel-button" onClick={() => setShowCreateForm(false)}>
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {showSuccessMessage && (
                <div className="success-message">
                    Wiadomość e-mail została wysłana!
                </div>
            )}
            <div className="table-wrapper">
                <table className="applications-table">
                    <thead>
                    <tr>
                        <th>Nazwa Domu Pogrzebowego</th>
                        <th>Miasto</th>
                        <th>Ulica</th>
                        <th>Kod Pocztowy</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Uwagi</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map((application) => (
                        <tr key={application.id}>
                            <td>{application.funeralHomeName}</td>
                            <td>{application.city}</td>
                            <td>{application.street}</td>
                            <td>{application.postalCode}</td>
                            <td>{application.email}</td>
                            <td>{application.phone}</td>
                            <td>
                                {application.accountCreated ? (
                                    <div>
                                        Konto utworzone<br/>
                                        Hasło: {application.generatedPassword}
                                    </div>
                                ) : (
                                    <div>Brak</div>
                                )}
                            </td>
                            <td>
                                <div className="cogButtonWrapper cogButtonWrapper-new">
                                    <button className="cog-button" onClick={() => toggleActionDropdown(application.id)}>
                                        <FontAwesomeIcon icon={faCog}/>
                                    </button>
                                    {activeActionDropdown === application.id && (
                                        <div className="actionDropdown">
                                            {!application.accountCreated && (
                                                <div className="action-dropdown__button"
                                                     onClick={() => handleApprove(application)}>
                                                    Zaakceptuj zgłoszenie
                                                </div>
                                            )}
                                            <div className="action-dropdown__button"
                                                 onClick={() => handleDelete(application)}>
                                                Usuń zgłoszenie
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="modal-overlay-new-funeral" onClick={handleCloseModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3 className="modal-content__title">Potwierdzenie</h3>
                            <p className="modal-content__text">
                                {modalType === 'approve' && 'Czy na pewno chcesz zaakceptować wniosek i stworzyć konto?'}
                                {modalType === 'delete' && 'Czy na pewno chcesz usunąć to zgłoszenie?'}
                            </p>
                            <div className="modal-content__actions">
                                {modalType === 'approve' && (
                                    <button className="modal-content__confirm-button" onClick={handleConfirmApprove}>
                                        Tak, stwórz konto
                                    </button>
                                )}
                                {modalType === 'delete' && (
                                    <button className="modal-content__confirm-button" onClick={handleConfirmDelete}>
                                        Tak, usuń zgłoszenie
                                    </button>
                                )}
                                <button className="modal-content__cancel-button" onClick={handleCloseModal}>
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};
const FuneralHomeApplicationsTableWithAuth = () => (
    <AuthGuard>
        <FuneralHomeApplicationsTable />
    </AuthGuard>
);

export default FuneralHomeApplicationsTableWithAuth;