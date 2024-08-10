import React, {useEffect, useState} from 'react';
import {db} from '../../../firebase';
import {doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {useRouter} from 'next/router';
import Link from "next/link";

const Submissions = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [submissionData, setSubmissionData] = useState(false);

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

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
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
                    message: 'Edycja elementów',
                    date: new Date().toISOString(),
                }),
            });
            alert('Zgłoszenie zostało zaktualizowane.');
            setEditMode(false);
            window.location.reload(); // Przeładowanie strony po zapisaniu zmian
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const renderSelectedItems = () => {
        return submissionData.selectedItems.map((item, index) => (
            <div key={index}>
                <p><strong>Nazwa:</strong> {item.name}</p>
                <p><strong>Kategoria:</strong> {item.category}</p>
                <p><strong>Producent:</strong> {item.producent}</p>
                <p><strong>Opis:</strong> {item.text}</p>
                <p><strong>Cena:</strong> {item.price}</p>
                <p><strong>Dostępność:</strong> {item.availability}</p>
            </div>
        ));
    };

    return (
        <div className="dashboard">
            <h2>Twoje zgłoszenia</h2>
            <div className="submissions-container">
                <div className="submission-item">
                    <div className="submission-item-first">
                        <div className="submission-item-element">
                            <p>Data zgłoszenia:</p>
                            <strong>{new Date(submissionData.date).toLocaleDateString()}</strong>
                            <p>Imię i Nazwisko Osoby zmarłej:</p>
                            <strong>{submissionData.name} {submissionData.surname}</strong>
                        </div>
                        <div className="submission-item-element">
                            <p>Wybrany zakład:</p>
                            <a href={`/client/funeral`} target="_blank">
                                {submissionData.funeralHomeName}
                                <p>Sprawdź</p>
                            </a>
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
                                        <p><strong>PESEL:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="pesel"
                                                    value={submissionData.pesel}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.pesel
                                            )}
                                        </p>
                                        <p><strong>Data śmierci:</strong>
                                            {editMode ? (
                                                <input
                                                    type="date"
                                                    name="deathDate"
                                                    value={submissionData.deathDate}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                new Date(submissionData.deathDate).toLocaleDateString()
                                            )}
                                        </p>
                                        <p><strong>Data urodzin:</strong>
                                            {editMode ? (
                                                <input
                                                    type="date"
                                                    name="birthDate"
                                                    value={submissionData.birthDate}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                new Date(submissionData.birthDate).toLocaleDateString()
                                            )}
                                        </p>
                                        <p><strong>Czy Osoba pracowała:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="worked"
                                                    value={submissionData.worked}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.worked
                                            )}
                                        </p>
                                        <p><strong>Adres zgonu:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={submissionData.address}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.address
                                            )}
                                        </p>
                                        <p><strong>Gdzie nastąpił zgon:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={submissionData.location}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.location
                                            )}
                                        </p>
                                    </div>
                                    <div className="details-element">
                                        <p><strong>Ubezpieczona w:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="insurance"
                                                    value={submissionData.insurance}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.insurance
                                            )}
                                        </p>
                                        <p><strong>Numer świadczenia:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="certificateNumber"
                                                    value={submissionData.certificateNumber}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.certificateNumber
                                            )}
                                        </p>
                                        <p><strong>Kiedy będą załatwiane dokumenty:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="documents"
                                                    value={submissionData.documents}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.documents
                                            )}
                                        </p>
                                        <p><strong>Kto sporządza akt zgonu:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="who"
                                                    value={submissionData.who}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                submissionData.who
                                            )}
                                        </p>
                                    </div>
                                    <div className="details-element">
                                        <h3>Informacje o pełnomocniku:</h3>
                                        <p><strong>Imię i Nazwisko:</strong>
                                            {editMode ? (
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
                                            ) : (
                                                submissionData.authorizedPerson.name
                                            )}
                                        </p>
                                        <p><strong>PESEL:</strong>
                                            {editMode ? (
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
                                            ) : (
                                                submissionData.authorizedPerson.pesel
                                            )}
                                        </p>
                                        <p><strong>Numer dowodu:</strong>
                                            {editMode ? (
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
                                            ) : (
                                                submissionData.authorizedPerson.idNumber
                                            )}
                                        </p>
                                        <h3>Dane pełnomocnictwa dla domu pogrzebowego:</h3>
                                        <p><strong>Imię i Nazwisko:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="funeralAuthName"
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
                                            ) : (
                                                submissionData.authorizedPerson.name
                                            )}
                                        </p>
                                        <p><strong>Numer dowodu:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="funeralAuthIdNumber"
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
                                            ) : (
                                                submissionData.authorizedPerson.idNumber
                                            )}
                                        </p>
                                        <p><strong>PESEL:</strong>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="funeralAuthPesel"
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
                                            ) : (
                                                submissionData.authorizedPerson.pesel
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {submissionData.pensionCertificate && (
                                    <span>✅ Zaświadczenie, że na dzień zgonu podlegało się składkom emerytalno-rentowym</span>
                                )}
                                <div className="details-element details-element-zestaw">
                                    <h3>Wybrany zestaw:</h3>
                                    {renderSelectedItems()}
                                </div>
                                {editMode ? (
                                    <div className="details-element-zestaw-buttons">
                                        <button className="save-button" onClick={handleSaveChanges}>Zapisz zmiany
                                        </button>
                                        <button className="cancel-button" onClick={handleEditToggle}>Anuluj</button>
                                    </div>
                                ) : (
                                    <button className="edit-button" onClick={handleEditToggle}>Edytuj</button>
                                )}
                            </div>
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
        </div>
);
};

export default Submissions;
