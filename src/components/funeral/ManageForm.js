import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import Link from 'next/link';
import {db} from '../../../firebase';

const ManageForm = () => {
    const router = useRouter();
    const {formId} = router.query;
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [status, setStatus] = useState(formData ? formData.status : '');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleAddMessage = async () => {
        const newNotification = {
            date: new Date().toISOString(),
            message: newMessage,
        };
        const updatedNotifications = [...formData.notifications, newNotification];
        const docRef = doc(db, 'forms', formId); // Upewnij się, że formId jest poprawnie zdefiniowane
        await updateDoc(docRef, { notifications: updatedNotifications });
        setFormData(prev => ({ ...prev, notifications: updatedNotifications }));
        setNewMessage('');
    };


    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        const docRef = doc(db, 'forms', formId);
        await updateDoc(docRef, { status: newStatus });
        setIsDropdownOpen(!isDropdownOpen);

        setStatus(newStatus);
    };
    useEffect(() => {
        if (formData && formData.status) {
            setStatus(formData.status);
        }
    }, [formData]);


    useEffect(() => {
        const fetchFormData = async () => {
            if (formId) {
                const docRef = doc(db, 'forms', formId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                } else {
                    console.error('No such document!');
                }
            }
        };

        fetchFormData();
    }, [formId]);


    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditableData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        // Funkcja do zapisywania zmian
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        let date;
        if (timestamp.seconds) {
            date = new Date(timestamp.seconds * 1000);
        } else {
            date = new Date(timestamp);
        }
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    if (!formData) return <p>Ładowanie...</p>;

    return (
        <div className="container">
            <div className="manage-form">
                <Link className="back-link" href="/funeral/orders">
                    Wróć do panelu
                </Link>
                <div className="manage-form-status">
                    <label htmlFor="status"><strong>Status:</strong></label>
                    <div className="custom-select">
                        <div className="selected-option" onClick={toggleDropdown}>
                            {status} <span className="arrow">&#9660;</span>
                        </div>
                        {isDropdownOpen && (
                            <div className="options">
                                <div onClick={() => handleStatusChange({target: {value: 'Nowe'}})}>Nowe</div>
                                <div onClick={() => handleStatusChange({target: {value: 'W trakcie'}})}>W trakcie</div>
                                <div onClick={() => handleStatusChange({target: {value: 'Zakończone'}})}>Zakończone
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <h1>Zgłoszony formularz</h1>
                <div className="message-add">
                    <label htmlFor="newMessage"><strong>Dodaj wiadomość:</strong></label>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Wpisz wiadomość"
                    />
                    <button onClick={handleAddMessage}>Dodaj</button>
                </div>
                <div className="manage-form-main">
                    <p>Email Klienta: {formData.email}</p>
                    <p>Numer telefonu: {formData.phone}</p>
                </div>
                {isEditing && <button onClick={handleSaveChanges}>Zapisz zmiany</button>}
                <div className="form-details">
                    <div className="section">
                        <section className="section-header-manage">
                            <h2>Szczegóły formularza</h2>
                            <span>
                                 <label htmlFor="date"><strong>Data zgloszenia:</strong></label>
                            <p>{formatDate(formData.date)}</p>
                            </span>

                        </section>
                        <button onClick={handleEditToggle}>
                            {isEditing ? 'Anuluj' : 'Edytuj'}
                        </button>
                        <div className="form-field">
                            <label htmlFor="name"><strong>Imię Osoby zmarlej:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editableData.name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.name}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="name"><strong>Nazwisko Osoby zmarlej:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editableData.surname}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.surname}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="pesel"><strong>PESEL:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="pesel"
                                    value={editableData.pesel}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.pesel}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="location"><strong>Gdzie nastepuje zgon:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={editableData.location}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.location}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="city"><strong>Miasto zgonu:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={editableData.city}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.city}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="street"><strong>Ulica:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="street"
                                    value={editableData.street}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.street}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="code"><strong>Kod pocztowy:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="code"
                                    value={editableData.code}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.code}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="documents"><strong>Kiedy będą załatwiane dokumenty?</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="documents"
                                    value={editableData.documents}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.documents}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="deathDate"><strong>Data śmierci:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="deathDate"
                                    value={editableData.deathDate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.deathDate}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="birthDate"><strong>Data urodzin:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="birthDate"
                                    value={editableData.birthDate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.birthDate}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="pensionCertificate"><strong>Zaświadczenie, że na dzień zgonu podlegało się
                                składkom emerytalno-rentowym:</strong></label>
                            {isEditing ? (
                                <input
                                    type="checkbox"
                                    name="pensionCertificate"
                                    value={editableData.pensionCertificate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.pensionCertificate ? "Tak" : "Nie"}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="pensionDetails"><strong>Szczegóły zaświadczenia:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="pensionDetails"
                                    value={editableData.pensionDetails}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.pensionDetails}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="worked"><strong>Czy Osoba pracowała?</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="worked"
                                    value={editableData.worked}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.worked}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="insurance"><strong>Osoba zmarła była ubezpieczona w:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="insurance"
                                    value={editableData.insurance}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.insurance}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="certificateNumber"><strong>Numer zaswiadczenia:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="certificateNumber"
                                    value={editableData.certificateNumber}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.certificateNumber}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="certificateNumber"><strong>Osoba udzielająca
                                pełnomocnictwa:</strong></label>
                            <label htmlFor="name"><strong>Imię i nazwisko:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editableData.authorizedPerson.name}
                                    onChange={(e) => setEditableData({
                                        ...editableData,
                                        authorizedPerson: {
                                            ...editableData.authorizedPerson,
                                            name: e.target.value
                                        }
                                    })}
                                />
                            ) : (
                                <p>{formData.authorizedPerson.name}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="pesel"><strong>Oraz tej Osoby PESEL:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="pesel"
                                    value={editableData.authorizedPerson.pesel}
                                    onChange={(e) => setEditableData({
                                        ...editableData,
                                        authorizedPerson: {
                                            ...editableData.authorizedPerson,
                                            pesel: e.target.value
                                        }
                                    })}
                                />
                            ) : (
                                <p>{formData.authorizedPerson.pesel}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="who"><strong>Kto sporządza akt zgonu?</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="who"
                                    value={editableData.who}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.who === "funeral" ? "Dom pogrzebowy" : "Rodzina"}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="formType"><strong>Forma pogrzebu:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="formType"
                                    value={editableData.formType}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.formType}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="religiousCeremony"><strong>Ceremonia religijna:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="religiousCeremony"
                                    value={editableData.religiousCeremony}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.religiousCeremony}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="burialOption"><strong>Czy dochowujemy do grobu?</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="burialOption"
                                    value={editableData.burialOption}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.burialOption}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="clothingOption"><strong>Ubiór zmarłego:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="clothingOption"
                                    value={editableData.clothingOption}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.clothingOption}</p>
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor="phone"><strong>Telefon:</strong></label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={editableData.phone}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{formData.phone}</p>
                            )}
                        </div>
                    </div>
                    <div className="section">
                        <div className="form-field">
                            <label htmlFor="selectedItems"><strong>Wybrany asortyment:</strong></label>
                            {formData.selectedItems.map((item, index) => (
                                <div key={index}>
                                    <p><strong>{item.name}:</strong> {item.price} zł</p>
                                </div>
                            ))}
                            <div>
                                <p>
                                    <strong>Suma:</strong> {formData.selectedItems.reduce((total, item) => total + parseFloat(item.price), 0)} zł
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default ManageForm;
