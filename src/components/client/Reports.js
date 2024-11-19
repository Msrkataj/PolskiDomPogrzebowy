import React, {useEffect, useState} from 'react';
import {db} from '../../../firebase';
import {doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {useRouter} from 'next/router';
import Link from "next/link";
import Image from 'next/image';
import AuthGuardClient from "@/components/panel/AuthGuardClient";
import ClientActions from "@/components/client/ClientActions";
import dynamic from "next/dynamic";

const LazyChatComponent = dynamic(() => import('@/components/common/ChatComponent'), {ssr: false});

const Submissions = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);  // Stan dla modalu
    const [submissionData, setSubmissionData] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [minimized, setMinimized] = useState(true);

    const handleOpenChat = () => {
        setShowChat(true);
        setMinimized(false);
    };
    const requiredDocs = {
        pelnomocnictwozp: 'Pełnomocnictwo ZP',
        wniosekkremacji: 'Wniosek do kremacji',
        zusupowaznienie: 'ZUS-UPOWAŻNIENIE',
        zaswiadczenieer: 'Zaświadczenie E-R',
        aktzgonuusc: 'Akt zgonu USC',
        szpitalkoszalin: 'Szpital Koszalin odbiór ciała',
        upowaznieniekrus: 'Upoważnienie KRUS',
        odbiordokumentow: 'Upoważnienie odbiór dokumentów'
    };
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (typeof window !== 'undefined') {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID not found in localStorage.');
                    return;
                }

                try {
                    const docRef = doc(db, 'forms', userId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setSubmissionData(docSnap.data());
                        // Opcjonalnie, możesz zapisać formData w localStorage
                        localStorage.setItem('formData', JSON.stringify(docSnap.data()));
                    } else {
                        console.error('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            }
        };

        fetchData();
    }, []);


    if (!submissionData) return <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Ładowanie danych...</div>
    </div>
    const formatTimestamp = (timestamp) => {
        return timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString() : 'Brak daty';
    };

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleEditToggle = () => {
        setIsModalOpen(true);  // Otwórz modal po kliknięciu Edytuj
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);  // Zamknij modal
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSubmissionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const docRef = doc(db, 'forms', localStorage.getItem('userId'));

            await updateDoc(docRef, {
                ...submissionData,
                notifications: arrayUnion({
                    message: 'Zgłoszenie zostało zaktualizowane przez klienta.', // Tutaj możesz dostosować wiadomość
                    timestamp: new Date().toISOString(), // Czas zapisu zmiany
                    name: 'client' // Nazwa użytkownika, który wprowadził zmianę
                })
            });

            alert('Zgłoszenie zostało zaktualizowane.');
            setEditMode(false);
            window.location.reload(); // Przeładowanie strony po zapisaniu zmian
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };


    const renderSelectedItems = () => {
        return (
            <table>
                <thead>
                <tr>
                    <th>Miniaturka</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Producent</th>
                    <th>Opis</th>
                    <th>Cena</th>
                    <th>Dostępność</th>
                </tr>
                </thead>
                <tbody>
                {submissionData.selectedItems.map((item, index) => (
                    <tr key={index}>
                        <td className="selected-items-image">
                            {item.category !== 'music' && item.name && (
                                Array.isArray(item.imageUrls) && item.imageUrls.length > 0 ? (
                                    <Image src={item.imageUrls[0]} alt={item.name} width={100} height={100}/>
                                ) : typeof item.imageUrls === 'string' && item.imageUrls ? (
                                    <Image src={item.imageUrls} alt={item.name} width={100} height={100}/>
                                ) : (
                                    <span>Brak obrazu</span>
                                )
                            )}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.producent}</td>
                        <td>{item.text}</td>
                        <td>{item.price}</td>
                        <td>{item.availability}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="dashboard">
            <h2>Twoje zgłoszenia</h2>
            <div className="submissions-container">
                <div className="submission-item">
                    <div className="submission-item-first">
                        <div className="submission-item-element">
                            <p>Data zgłoszenia:</p>
                            <strong>{formatTimestamp(submissionData.timestamp)}</strong>
                            <p>Imię i Nazwisko Osoby zmarłej:</p>
                            <strong>{submissionData.name} {submissionData.surname}</strong>
                        </div>
                        <div className="submission-item-element">
                            <p>Wybrany zakład:</p>
                            <Link href={`/client/dom-pogrzebowy`} target="_blank">
                                {submissionData.funeralHomeName}
                            </Link>
                        </div>
                        <div className="submission-item-element">
                            <p>Aktualny status: </p>
                            <span
                                className={`status ${submissionData.status === 'Zakończony' ? 'completed' : 'in-progress'}`}>
                            {submissionData.status}
                        </span>
                        </div>
                        <button onClick={handleToggleDetails}>
                            {showDetails ? 'Zwiń' : 'Więcej'}
                        </button>
                    </div>
                    {showDetails && (
                        <div className="submission-item-second">
                            <div className="details">
                                <div className="details-elements">
                                    <div className="details-element">
                                        <h3>Informacje o Zmarłym:</h3>
                                        <p><strong>Imię:</strong> {submissionData.name}</p>
                                        <p><strong>Nazwisko:</strong> {submissionData.surname}</p>
                                        <p><strong>PESEL:</strong> {submissionData.pesel}</p>
                                        <p><strong>Data urodzin:</strong> {submissionData.birthDate}</p>
                                        <p><strong>Data śmierci:</strong> {submissionData.deathDate}</p>
                                        <p><strong>Numer świadczenia:</strong> {submissionData.certificateNumber}</p>
                                        <p><strong>Dokumenty:</strong> {submissionData.documents}</p>
                                        <p><strong>Ubezpieczona w:</strong> {submissionData.insurance}</p>
                                        <p>
                                            <strong>Adres:</strong> {submissionData.street}, {submissionData.city}, {submissionData.postalCode}
                                        </p>
                                        <p><strong>Gdzie nastąpił zgon:</strong> {submissionData.location}</p>
                                        <p><strong>Kto sporządza akt zgonu:</strong>
                                            {submissionData.who === 'funeral' ? 'Dom pogrzebowy' : 'Rodzina'}
                                        </p>
                                    </div>
                                    <div className="details-element">
                                    <h3>Informacje o pełnomocniku:</h3>
                                        <p><strong>Imię i nazwisko:</strong> {submissionData.authorizedPerson.name} {submissionData.authorizedPerson.surname}</p>
                                        <p><strong>PESEL:</strong> {submissionData.authorizedPerson.pesel}</p>
                                        <p><strong>Data zgłoszenia:</strong> {submissionData.date}</p>
                                        <p><strong>Telefon:</strong> {submissionData.phone}</p>
                                        <p><strong>Email:</strong> {submissionData.email}</p>
                                    </div>
                                    <div className="details-element">
                                        <h3>Informacje o dochówku:</h3>
                                        <p><strong>Zakład pogrzebowy:</strong> {submissionData.funeralHomeName}</p>
                                        <p><strong>Opcja pochówku:</strong> {submissionData.burialOption}</p>
                                        <p><strong>Rodzaj ubrania:</strong> {submissionData.clothingOption}</p>
                                        <p><strong>Cmentarz:</strong> {submissionData.graveCemetery}</p>
                                        <p><strong>Szczegóły grobu:</strong> {submissionData.graveDetails}</p>
                                        <p><strong>Imię osoby pochowanej:</strong> {submissionData.gravePersonName}</p>
                                        <p><strong>Ceremonia religijna:</strong> {submissionData.religiousCeremony}</p>
                                    </div>
                                </div>
                                <button className="edit-button" onClick={handleEditToggle}>Edytuj</button>
                                <div className="details-element details-element-zestaw">
                                    <h2>Wybrany zestaw:</h2>
                                    {renderSelectedItems()}
                                </div>
                            </div>
                            <Link href={`/client/documents?${clientId}`}>
                            <button className="view-documents-button">Zobacz przesłane dokumenty</button>
                            </Link>
                        </div>
                    )}
                </div>
                <ClientActions handleOpenChat={handleOpenChat}/>
            </div>
            {
                isModalOpen && (
                    <div className="modal-overlay-edit-client">
                        <div className="modal-content">
                            <button className="modal-close-button" onClick={handleCloseModal}>X</button>
                            <div className="edit-modal-content">
                                <h2>Edycja zgłoszenia</h2>
                                <div className="edit-modal-fields">
                                    <div className="details-elements">
                                        <div className="details-element">
                                            <p><strong>Imię:</strong>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={submissionData.name}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Nazwisko:</strong>
                                                <input
                                                    type="text"
                                                    name="surname"
                                                    value={submissionData.surname}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>PESEL:</strong>
                                                <input
                                                    type="text"
                                                    name="pesel"
                                                    value={submissionData.pesel}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Data urodzin:</strong>
                                                <input
                                                    type="date"
                                                    name="birthDate"
                                                    value={submissionData.birthDate}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Data śmierci:</strong>
                                                <input
                                                    type="date"
                                                    name="deathDate"
                                                    value={submissionData.deathDate}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Numer świadczenia:</strong>
                                                <input
                                                    type="text"
                                                    name="certificateNumber"
                                                    value={submissionData.certificateNumber}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Opcja pochówku:</strong>
                                                <input
                                                    type="text"
                                                    name="burialOption"
                                                    value={submissionData.burialOption}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Rodzaj ubrania:</strong>
                                                <input
                                                    type="text"
                                                    name="clothingOption"
                                                    value={submissionData.clothingOption}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Dokumenty:</strong>
                                                <input
                                                    type="text"
                                                    name="documents"
                                                    value={submissionData.documents}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Zakład pogrzebowy:</strong>
                                                <input
                                                    type="text"
                                                    name="funeralHomeName"
                                                    value={submissionData.funeralHomeName}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Cmentarz:</strong>
                                                <input
                                                    type="text"
                                                    name="graveCemetery"
                                                    value={submissionData.graveCemetery}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Szczegóły grobu:</strong>
                                                <input
                                                    type="text"
                                                    name="graveDetails"
                                                    value={submissionData.graveDetails}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Ceremonia religijna:</strong>
                                                <input
                                                    type="text"
                                                    name="religiousCeremony"
                                                    value={submissionData.religiousCeremony}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Adres:</strong>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={submissionData.street}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={submissionData.city}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    value={submissionData.postalCode}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                            <p><strong>Gdzie nastąpił zgon:</strong>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={submissionData.location}
                                                    onChange={handleInputChange}
                                                />
                                            </p>
                                        </div>
                                        <div className="details-element">
                                            <h3>Informacje o pełnomocniku:</h3>
                                            <p><strong>Imię i nazwisko:</strong>
                                                <input
                                                    type="text"
                                                    name="authorizedPersonName"
                                                    value={submissionData.authorizedPerson.name}
                                                    onChange={(e) => handleInputChange({
                                                        target: {
                                                            name: 'authorizedPerson',
                                                            value: {
                                                                ...submissionData.authorizedPerson,
                                                                name: e.target.value
                                                            }
                                                        }
                                                    })}
                                                />
                                            </p>
                                            <p><strong>PESEL:</strong>
                                                <input
                                                    type="text"
                                                    name="authorizedPersonPesel"
                                                    value={submissionData.authorizedPerson.pesel}
                                                    onChange={(e) => handleInputChange({
                                                        target: {
                                                            name: 'authorizedPerson',
                                                            value: {
                                                                ...submissionData.authorizedPerson,
                                                                pesel: e.target.value
                                                            }
                                                        }
                                                    })}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button onClick={handleSaveChanges}>Zapisz zmiany</button>
                                    <button onClick={handleCloseModal}>Anuluj</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            {showChat && <LazyChatComponent minimized={minimized} setMinimized={setMinimized}/>}

        </div>
    );
};
const DashboardWithAuth = () => (
    <AuthGuardClient>
        <Submissions/>
    </AuthGuardClient>
);

export default DashboardWithAuth;