import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from 'next/image';

const Submissions = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [submissionData, setSubmissionData] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);  // Stan dla modalu

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
                        setClientId(userId);
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

    if (!submissionData) {
        return <div>Loading...</div>;
    }

    // Convert Firestore Timestamp to Date
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
        const { name, value } = e.target;
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
                                    <Image src={item.imageUrls[0]} alt={item.name} width={100} height={100} />
                                ) : typeof item.imageUrls === 'string' && item.imageUrls ? (
                                    <Image src={item.imageUrls} alt={item.name} width={100} height={100} />
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
                            <Link href={`/client/funeral`} target="_blank">
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
                                        <p><strong>PESEL:</strong> {submissionData.pesel}</p>
                                        <p><strong>Data urodzin:</strong> {submissionData.birthDate}</p>
                                        <p><strong>Data śmierci:</strong> {submissionData.deathDate}</p>
                                        <p><strong>Czy osoba podlegała składkom
                                            emerytalno-rentowym?</strong> {submissionData.pensionCertificate}</p>
                                        <p><strong>Adres
                                            zgonu:</strong> {submissionData.city} ul. {submissionData.street}, {submissionData.postalCode}
                                        </p>
                                        <p><strong>Gdzie nastąpił zgon:</strong> {submissionData.location}</p>
                                    </div>
                                    <div className="details-element">
                                        <p><strong>Ubezpieczona w:</strong> {submissionData.insurance}</p>
                                        <p><strong>Numer świadczenia:</strong> {submissionData.certificateNumber}</p>
                                        <p><strong>Kiedy będą załatwiane dokumenty:</strong> {submissionData.documents}
                                        </p>
                                        <p><strong>Kto sporządza akt zgonu:</strong> {submissionData.who}</p>
                                    </div>
                                    <div className="details-element">
                                        <h3>Informacje o pełnomocniku:</h3>
                                        <p><strong>Imię i Nazwisko:</strong> {submissionData.authorizedPerson.name}</p>
                                        <p><strong>PESEL:</strong> {submissionData.authorizedPerson.pesel}</p>
                                        <p><strong>Numer dowodu:</strong> {submissionData.authorizedPerson.idNumber}</p>
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
                <div className="actions">
                    <button>
                        <Link href="/form" className="register-link">Nowe zgłoszenie</Link>
                    </button>
                    <button>
                        <Link href="/register" className="register-link">Twój osobisty konsultant</Link>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay-edit-client">
                    <div className="modal-content">
                        <button className="modal-close-button" onClick={handleCloseModal}>X</button>
                        <div className="edit-modal-content">
                            <h2>Edycja zgłoszenia</h2>
                            <div className="edit-modal-fields">
                                <div className="details-elements">
                                    <div className="details-element">
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
                                        <p><strong>Czy osoba podlegała składkom emerytalno-rentowym?</strong>
                                            <input
                                                type="text"
                                                name="pensionCertificate"
                                                value={submissionData.pensionCertificate}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                        <p><strong>Adres zgonu:</strong>
                                            <input
                                                type="text"
                                                name="city"
                                                value={submissionData.city}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="street"
                                                value={submissionData.street}
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
                                        <p><strong>Ubezpieczona w:</strong>
                                            <input
                                                type="text"
                                                name="insurance"
                                                value={submissionData.insurance}
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
                                        <p><strong>Kiedy będą załatwiane dokumenty:</strong>
                                            <input
                                                type="text"
                                                name="documents"
                                                value={submissionData.documents}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                        <p><strong>Kto sporządza akt zgonu:</strong>
                                            <input
                                                type="text"
                                                name="who"
                                                value={submissionData.who}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                    </div>
                                    <div className="details-element">
                                        <h3>Informacje o pełnomocniku:</h3>
                                        <div><strong>Imię i Nazwisko:</strong>
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
                                        </div>
                                        <div><strong>PESEL:</strong>
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
                                        </div>
                                        <div><strong>Numer dowodu:</strong>
                                            <input
                                                type="text"
                                                name="authorizedPersonIdNumber"
                                                value={submissionData.authorizedPerson.idNumber}
                                                onChange={(e) => handleInputChange({
                                                    target: {
                                                        name: 'authorizedPerson',
                                                        value: {
                                                            ...submissionData.authorizedPerson,
                                                            idNumber: e.target.value
                                                        }
                                                    }
                                                })}
                                            />
                                        </div>
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
        </div>
    );
};

export default Submissions;
