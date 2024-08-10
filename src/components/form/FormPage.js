import React, {useState, useEffect} from 'react';
import {db} from '../../../firebase';
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import {useRouter} from 'next/router';
import StepNavigation from '@/components/StepNavigation';
import {getStorage, ref as storageRef, getDownloadURL, uploadBytes} from "firebase/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const UnifiedForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        deathDate: '',
        birthDate: '',
        pesel: '',
        worked: null,
        pensionCertificate: false,
        pensionDetails: '',
        insurance: '',
        certificateNumber: '',
        noCertificate: false,
        authorizedPerson: {
            name: '',
            pesel: '',
            idNumber: ''
        },
        who: ''
    });
    const [showSaveForm, setShowSaveForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const [showInfoBubble, setShowInfoBubble] = useState(true);
    const [showInfoLogin, setShowInfoLogin] = useState(true);
    const [currentStep, setCurrentStep] = useState('details');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isInfoBubbleVisible, setIsInfoBubbleVisible] = useState(false);
    const [isInfoLoginVisible, setIsInfoLoginVisible] = useState(false);

    const toggleInfoBubble = (event) => {
        event.preventDefault();
        setIsInfoBubbleVisible(!isInfoBubbleVisible);
    };

    const toggleInfoLogin = (event) => {
        event.preventDefault();
        setIsInfoLoginVisible(!isInfoLoginVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('formId');
            if (id) {
                const docRef = doc(db, 'forms', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            }
        };

        fetchData();
    }, []);

    const handleDownloadCertificate = async () => {
        const storage = getStorage();
        const fileRef = storageRef(storage, 'documents/Zaświadczenie E-R.docx');

        try {
            const url = await getDownloadURL(fileRef);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Zaświadczenie E-R.docx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Błąd pobierania pliku:", error);
        }
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        if (name.startsWith('authorizedPerson.')) {
            const key = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                authorizedPerson: {
                    ...prevState.authorizedPerson,
                    [key]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const uploadFile = async () => {
        if (!selectedFile) return;

        let formId = localStorage.getItem('formId');
        if (!formId) {
            formId = generateUniqueId();
            localStorage.setItem('formId', formId);
        }

        const storage = getStorage();
        const filePath = `uploaded-documents/${formId}/Zaświadczenie ER/${selectedFile.name}`;
        const fileRef = storageRef(storage, filePath);

        try {
            // Przesyłanie pliku do Firebase Storage
            await uploadBytes(fileRef, selectedFile);
            console.log("Plik przesłany pomyślnie!");

            // Zapisanie ścieżki pliku w dokumencie formularza w Firestore
            const formRef = doc(db, 'forms', formId);
            await updateDoc(formRef, {
                uploadedDocument: filePath // Zapisz ścieżkę pliku w formularzu
            });
            console.log("Plik przesłany pomyślnie!");
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        // Przykładowa walidacja
        if (!formData.name) {
            newErrors.push('Imię jest wymagane.');
        }
        if (!formData.surname) {
            newErrors.push('Nazwisko jest wymagane.');
        }
        if (!formData.deathDate) {
            newErrors.push('Data śmierci jest wymagana.');
        }
        if (!formData.birthDate) {
            newErrors.push('Data urodzin jest wymagana.');
        }
        if (!formData.pesel) {
            newErrors.push('PESEL jest wymagany.');
        }
        if (formData.pensionCertificate && !selectedFile) {
            newErrors.push('Jeśli zaznaczyłeś zaświadczenie, musisz załadować plik.');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        await uploadFile();
        await saveData();
        router.push('/funeraldetails');
    };

    const handleSaveAndNavigate = async (step) => {
        const newErrors = [];

        // Przykładowa walidacja
        if (!formData.name) {
            newErrors.push('Imię jest wymagane.');
        }
        if (!formData.surname) {
            newErrors.push('Nazwisko jest wymagane.');
        }
        if (!formData.deathDate) {
            newErrors.push('Data śmierci jest wymagana.');
        }
        if (!formData.birthDate) {
            newErrors.push('Data urodzin jest wymagana.');
        }
        if (!formData.pesel) {
            newErrors.push('PESEL jest wymagany.');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        await saveData();
        setCurrentStep(step);
        router.push(`/${step}`);
    };


    const saveData = async () => {
        let id = localStorage.getItem('formId');
        if (!id) {
            id = generateUniqueId();
            localStorage.setItem('formId', id);
        }

        try {
            await setDoc(doc(db, 'forms', id), formData, {merge: true});
            console.log('Form saved successfully');
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };

    const generateUniqueId = () => {
        return 'form_' + Math.random().toString(36).substr(2, 9);
    };


    const handleSaveCredentials = async () => {
        const id = localStorage.getItem('formId');
        if (id) {
            try {
                await setDoc(doc(db, 'forms', id), {email, password}, {merge: true});
                alert('Dane zostały zapisane.');
                setShowSaveForm(false);
            } catch (error) {
                console.error('Błąd zapisu formularza: ', error);
            }
        } else {
            console.error('Nie znaleziono formId w Local Storage');
        }
    };


    const closeSaveForm = () => setShowSaveForm(false);

    return (
        <div className="form-container">
            <div className="navigation-buttons">
                <button className="nav-button" onClick={() => router.back()}>← Cofnij</button>
                <button className="nav-button" onClick={() => handleSaveAndNavigate('funeraldetails')}>Dalej →</button>
            </div>
            <StepNavigation currentStep={currentStep} handleSaveAndNavigate={handleSaveAndNavigate}/>
            <div className="form-container-main">
                <form onSubmit={handleSubmit}>
                    <h2>Informacje o Osobie zmarłej:</h2>
                    <div className="form-group form-group-name">
                        <label htmlFor="name">Imię</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            placeholder="Imię"
                        />
                        <label htmlFor="surname">Nazwisko</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname || ''}
                            onChange={handleChange}
                            placeholder="Nazwisko"
                        />
                    </div>
                    <div className="form-group form-group-name">
                        <label htmlFor="deathDate">Data śmierci</label>
                        <input
                            type="date"
                            id="deathDate"
                            name="deathDate"
                            value={formData.deathDate || ''}
                            onChange={handleChange}
                        />
                        <label htmlFor="birthDate">Data urodzin</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group form-group-name">
                        <label htmlFor="pesel">PESEL</label>
                        <input
                            type="text"
                            id="pesel"
                            name="pesel"
                            value={formData.pesel || ''}
                            onChange={handleChange}
                            placeholder="PESEL"
                        />
                    </div>
                    <div className="form-group form-group-down">
                        <label>
                            <input
                                type="checkbox"
                                name="pensionCertificate"
                                checked={formData.pensionCertificate}
                                onChange={handleChange}
                            />
                            Zaświadczenie, że na dzień zgonu podlegało się składkom emerytalno-rentowym
                        </label>
                        {formData.pensionCertificate && (
                            <div className="additional-info">
                                <p>Pobierz plik poniżej i go wypełnij </p>
                                <div className="additional-info-download">
                                        <button type="button" onClick={handleDownloadCertificate}>Pobierz
                                            zaświadczenie
                                            <FontAwesomeIcon icon={faDownload} className="fa-xl"/>
                                        </button>

                                    <p>Jeśli wypełniłeś go już teraz, mozesz go załadować poniżej</p><br/>
                                    <input type="file" onChange={handleFileUpload}/>
                                </div>
                                <p>... lub poźniej w swoim panelu klienta</p>
                            </div>
                        )}
                    </div>

                    <div className="form-group form-group-down">
                        <h2>Czy Osoba pracowała?</h2>
                        <div className="radio-group">
                            <label className={`radio-label ${formData.worked === 'Tak' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="worked"
                                    value="Tak"
                                    checked={formData.worked === 'Tak'}
                                    onChange={handleChange}
                                />
                                Tak
                                {formData.worked === 'Tak' && <span className="checkmark">✔</span>}
                            </label>
                            <label className={`radio-label ${formData.worked === 'Nie' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="worked"
                                    value="Nie"
                                    checked={formData.worked === 'Nie'}
                                    onChange={handleChange}
                                />
                                Nie
                                {formData.worked === 'Nie' && <span className="checkmark">✔</span>}
                            </label>
                        </div>
                    </div>
                    {showInfoBubble && (
                        <div className={`info-bubble info-bubble-first ${isInfoBubbleVisible ? 'visible' : 'hidden'}`}>
                            <p>Twoje Dane: <br/>Nasza Odpowiedzialność</p>
                            <p>Chronimy Twoje dane z najwyższą starannością. Zapewniamy, że wszelkie informacje są
                                przechowywane bezpiecznie i z zachowaniem pełnej poufności.</p>
                            {/*<button onClick={() => setShowInfoBubble(false)}>Zamknij</button>*/}
                        </div>
                    )}
                    {showInfoLogin && (
                        <div className={`info-bubble info-bubble-second ${isInfoLoginVisible ? 'visible' : 'hidden'}`}>
                            <p>Nie pamiętasz czegoś? Potrzebujesz więcej czasu?</p>
                            <p className="save-link" onClick={() => setShowSaveForm(true)}>Zapisz formularz tutaj i
                                dokończ później</p>
                        </div>
                    )}
                    <button className="toggle-info-bubble" onClick={toggleInfoBubble}>
                        {isInfoBubbleVisible ? 'Schowaj informacje ↑' : 'Chronimy Twoje dane ↓'}
                    </button>
                    <button className="toggle-info-bubble toggle-info-login" onClick={toggleInfoLogin}>
                        {isInfoLoginVisible ? 'Schowaj ↑' : 'Potrzebujesz czasu? ↓'}
                    </button>
                    <h2>Czy osoba zmarła była ubezpieczona w:</h2>
                    <div className="radio-group radio-group-insurance">
                        <label className={`radio-label ${formData.insurance === 'ZUS' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="insurance"
                                value="ZUS"
                                checked={formData.insurance === 'ZUS'}
                                onChange={handleChange}
                            />
                            ZUS
                            {formData.insurance === 'ZUS' && <span className="checkmark">✔</span>}
                        </label>
                        <label className={`radio-label ${formData.insurance === 'KRUS' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="insurance"
                                value="KRUS"
                                checked={formData.insurance === 'KRUS'}
                                onChange={handleChange}
                            />
                            KRUS
                            {formData.insurance === 'KRUS' && <span className="checkmark">✔</span>}
                        </label>
                        <label className={`radio-label ${formData.insurance === 'MSWiA' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="insurance"
                                value="MSWiA"
                                checked={formData.insurance === 'MSWiA'}
                                onChange={handleChange}
                            />
                            MSWiA
                            {formData.insurance === 'MSWiA' && <span className="checkmark">✔</span>}
                        </label>
                        <label className={`radio-label ${formData.insurance === 'Inne' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="insurance"
                                value="Inne"
                                checked={formData.insurance === 'Inne'}
                                onChange={handleChange}
                            />
                            Inne
                            {formData.insurance === 'Inne' && <span className="checkmark">✔</span>}
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="certificateNumber">Numer świadczenia</label>
                        <input
                            type="text"
                            id="certificateNumber"
                            name="certificateNumber"
                            value={formData.certificateNumber || ''}
                            onChange={handleChange}
                            placeholder="Numer świadczenia"
                            disabled={formData.noCertificate}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="noCertificate"
                                checked={formData.noCertificate}
                                onChange={handleChange}
                            />
                            Brak świadczeń?
                        </label>
                    </div>
                    <h2>Osoba udzielająca pełnomocnictwa:</h2>
                    <div className="form-group">
                        <label htmlFor="authorizedPerson.name">Imię i Nazwisko</label>
                        <input
                            type="text"
                            id="authorizedPerson.name"
                            name="authorizedPerson.name"
                            value={formData.authorizedPerson?.name || ''}
                            onChange={handleChange}
                            placeholder="Imię i Nazwisko"
                        />
                        <label htmlFor="authorizedPerson.pesel">PESEL</label>
                        <input
                            type="text"
                            id="authorizedPerson.pesel"
                            name="authorizedPerson.pesel"
                            value={formData.authorizedPerson?.pesel || ''}
                            onChange={handleChange}
                            placeholder="PESEL"
                        />
                        <label htmlFor="authorizedPerson.idNumber">Numer dowodu</label>
                        <input
                            type="text"
                            id="authorizedPerson.idNumber"
                            name="authorizedPerson.idNumber"
                            value={formData.authorizedPerson?.idNumber || ''}
                            onChange={handleChange}
                            placeholder="Numer dowodu"
                        />
                    </div>
                    <div className="form-group form-group-down">
                        <h2>Kto sporządza akt zgonu?</h2>
                        <div className="radio-group">
                            <label className={`radio-label ${formData.who === 'family' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="who"
                                    value="family"
                                    checked={formData.who === 'family'}
                                    onChange={handleChange}
                                />
                                Rodzina
                                {formData.who === 'family' && <span className="checkmark">✔</span>}
                            </label>
                            <label className={`radio-label ${formData.who === 'Funeral' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="who"
                                    value="funeral"
                                    checked={formData.who === 'Funeral'}
                                    onChange={handleChange}
                                />
                                Dom pogrzebowy
                                {formData.who === 'funeral' && <span className="checkmark">✔</span>}
                            </label>
                        </div>
                    </div>
                    {errors.length > 0 && (
                        <div className="error-container">
                            {errors.map((error, index) => (
                                <p key={index} className="error-message">{error}</p>
                            ))}
                        </div>
                    )}
                    <button type="submit" className="submit-button">Zapisz i przejdź do etapu pogrzebu</button>
                </form>
            </div>
            {showSaveForm && (
                <div className="modal-overlay modal-save">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Zapisz formularz</h2>
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                            />
                            <label>Hasło</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Hasło"
                            />
                            <button onClick={handleSaveCredentials}>Zapisz</button>
                            <button onClick={closeSaveForm}>Zamknij</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UnifiedForm;
