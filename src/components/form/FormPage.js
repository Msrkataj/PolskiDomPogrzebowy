import React, {useState, useEffect, useRef} from 'react';
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
        who: '' // default to empty or an appropriate value
    });
    const [showSaveForm, setShowSaveForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const [errorEmail, setErrorEmail] = useState([]);
    const [showInfoBubble, setShowInfoBubble] = useState(true);
    const [showInfoLogin, setShowInfoLogin] = useState(true);
    const [currentStep, setCurrentStep] = useState('formularz-drugi');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isInfoBubbleVisible, setIsInfoBubbleVisible] = useState(false);
    const [isInfoLoginVisible, setIsInfoLoginVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const errorContainerRef = useRef(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        const { name, value, type, checked } = e.target;
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

        // Usuwanie błędu dla aktualizowanego pola
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
        });
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
    useEffect(() => {
        if (errors.length > 0 && errorContainerRef.current) {
            errorContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [errors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];
        const today = new Date();
        const birthDate = new Date(formData.birthDate);
        const deathDate = formData.deathDate ? new Date(formData.deathDate) : null;

        // Walidacja daty urodzin
        if (deathDate && birthDate >= deathDate) {
            newErrors.push('Data urodzin musi być wcześniejsza niż data śmierci.');
        } else if (!deathDate && birthDate >= today) {
            newErrors.push('Data urodzin musi być wcześniejsza niż dzisiejsza data.');
        }

        // Walidacja wymaganych pól
        if (!formData.name) newErrors.push('Imię jest wymagane.');
        if (!formData.surname) newErrors.push('Nazwisko jest wymagane.');
        if (!formData.deathDate) newErrors.push('Data śmierci jest wymagana.');
        if (!formData.birthDate) newErrors.push('Data urodzin jest wymagana.');

        // Walidacja PESEL
        if (!/^\d{11}$/.test(formData.pesel)) {
            newErrors.push('PESEL musi mieć dokładnie 11 cyfr.');
        }

        // Walidacja numeru dowodu osobistego, sprawdza czy authorizedPerson jest zainicjowany
        if (formData.authorizedPerson && !/^[A-Z]{3}\d{6}$/.test(formData.authorizedPerson.idNumber)) {
            newErrors.push('Numer dowodu musi składać się z 3 liter i 6 cyfr.');
        }


        // Walidacja wyboru radio button "pensionCertificate"
        if (formData.pensionCertificate === null) {
            newErrors.push('Proszę określić, czy osoba podlegała składkom emerytalno-rentowym.');
        }

        // Walidacja wyboru radio button "insurance"
        if (!formData.insurance) {
            newErrors.push('Proszę wybrać ubezpieczenie.');
        }

        // Walidacja "who" checkbox dla rodziny lub domu pogrzebowego
        if (!formData.who) {
            newErrors.push('Proszę określić, kto sporządza akt zgonu.');
        }

        // Walidacja "certificateNumber" jeśli nie zaznaczono "noCertificate"
        if (!formData.noCertificate && !formData.certificateNumber) {
            newErrors.push('Numer świadczenia jest wymagany, jeśli nie zaznaczono brak świadczeń.');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await uploadFile();
            await saveData();
            router.push('/formularz-trzeci');
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };


    const handleSaveAndNavigate = async (step) => {
        if (step === 'formularz-pierwszy') {
            // Pomijamy walidację podczas cofania się do pierwszego formularza
            await saveData();
            setCurrentStep(step);
            router.push(`/${step}`);
            return;
        }

        const newErrors = [];
        const today = new Date();
        const birthDate = new Date(formData.birthDate);
        const deathDate = formData.deathDate ? new Date(formData.deathDate) : null;

        // Walidacja daty urodzin
        if (deathDate && birthDate >= deathDate) {
            newErrors.push('Data urodzin musi być wcześniejsza niż data śmierci.');
        } else if (!deathDate && birthDate >= today) {
            newErrors.push('Data urodzin musi być wcześniejsza niż dzisiejsza data.');
        }

        // Walidacja wymaganych pól
        if (!formData.name) newErrors.push('Imię jest wymagane.');
        if (!formData.surname) newErrors.push('Nazwisko jest wymagane.');
        if (!formData.deathDate) newErrors.push('Data śmierci jest wymagana.');
        if (!formData.birthDate) newErrors.push('Data urodzin jest wymagana.');

        // Walidacja PESEL
        if (!/^\d{11}$/.test(formData.pesel)) {
            newErrors.push('PESEL musi mieć dokładnie 11 cyfr.');
        }

        // Walidacja numeru dowodu osobistego, sprawdza czy authorizedPerson jest zainicjowany
        if (formData.authorizedPerson && !/^[A-Z]{3}\d{6}$/.test(formData.authorizedPerson.idNumber)) {
            newErrors.push('Numer dowodu musi składać się z 3 liter i 6 cyfr.');
        }

        // Walidacja emaila (jeśli jest wprowadzony)
        if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.push('Proszę podać prawidłowy adres e-mail.');
        }

        // Walidacja wyboru radio button "pensionCertificate"
        if (formData.pensionCertificate === null) {
            newErrors.push('Proszę określić, czy osoba podlegała składkom emerytalno-rentowym.');
        }

        // Walidacja wyboru radio button "insurance"
        if (!formData.insurance) {
            newErrors.push('Proszę wybrać ubezpieczenie.');
        }

        // Walidacja "who" checkbox dla rodziny lub domu pogrzebowego
        if (!formData.who) {
            newErrors.push('Proszę określić, kto sporządza akt zgonu.');
        }

        // Walidacja "certificateNumber" jeśli nie zaznaczono "noCertificate"
        if (!formData.noCertificate && !formData.certificateNumber) {
            newErrors.push('Numer świadczenia jest wymagany, jeśli nie zaznaczono brak świadczeń.');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        await saveData();
        setCurrentStep(step);
        router.push(`/${step}`);
    };

    const handleSaveAndBack = async (step) => {

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
        const newErrors = [];

        // Walidacja formatu e-maila
        if (!email) {
            newErrors.push('E-mail jest wymagany.');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.push('Proszę podać prawidłowy adres e-mail.');
        }

        // Walidacja hasła (np. minimum 8 znaków)
        if (!password) {
            newErrors.push('Hasło jest wymagane.');
        } else if (password.length < 8) {
            newErrors.push('Hasło musi mieć przynajmniej 8 znaków.');
        }

        if (newErrors.length > 0) {
            setErrorEmail(newErrors);
            return;
        }

        // Jeśli nie ma błędów, zapisujemy dane
        const id = localStorage.getItem('formId');
        if (id) {
            try {
                await setDoc(doc(db, 'forms', id), { email, password }, { merge: true });
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
                <button className="nav-button" onClick={() => handleSaveAndBack('formularz-pierwszy')}>← Cofnij</button>
                <button className="nav-button" onClick={() => handleSaveAndNavigate('formularz-trzeci')}>Dalej →</button>
            </div>
            <StepNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} handleSaveAndNavigate={handleSaveAndNavigate}/>
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
                        <label htmlFor="birthDate">Data urodzin</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate || ''}
                            onChange={handleChange}
                        />
                        <label htmlFor="deathDate">Data śmierci</label>
                        <input
                            type="date"
                            id="deathDate"
                            name="deathDate"
                            value={formData.deathDate || ''}
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
                        <h2>Czy osoba podlegała składkom emerytalno-rentowym?</h2>
                        <div className="radio-group">
                            <label
                                className={`radio-label ${formData.pensionCertificate === 'Tak' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="pensionCertificate"
                                    value="Tak"
                                    checked={formData.pensionCertificate === 'Tak'}
                                    onChange={handleChange}
                                />
                                Tak
                                {formData.pensionCertificate === 'Tak' && <span className="checkmark">✔</span>}
                            </label>
                            <label
                                className={`radio-label ${formData.pensionCertificate === 'Nie' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="pensionCertificate"
                                    value="Nie"
                                    checked={formData.pensionCertificate === 'Nie'}
                                    onChange={handleChange}
                                />
                                Nie
                                {formData.pensionCertificate === 'Nie' && <span className="checkmark">✔</span>}
                            </label>
                        </div>
                        {formData.pensionCertificate === 'Tak' && (
                            <div className="form-group form-group-down">
                                <div className="additional-info">
                                    <p>Pobierz plik poniżej i go wypełnij</p>
                                    <div className="additional-info-download">
                                        <button type="button" onClick={handleDownloadCertificate}>
                                            Pobierz zaświadczenie
                                            <FontAwesomeIcon icon={faDownload} className="fa-xl"/>
                                        </button>
                                        <p>Jeśli wypełniłeś go już teraz, możesz go załadować poniżej</p><br/>
                                        <input type="file" onChange={handleFileUpload}/>
                                    </div>
                                    <p>... lub później w swoim panelu klienta</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {showInfoBubble && (
                        <div className={`info-bubble info-bubble-first ${isInfoBubbleVisible ? 'visible' : 'hidden'}`}>
                            <p>Twoje Dane: <br/>Nasza Odpowiedzialność</p>
                            <p>Chronimy Twoje dane z najwyższą starannością. Zapewniamy, że wszelkie informacje są
                                przechowywane bezpiecznie i z zachowaniem pełnej poufności.</p>
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
                                checked={formData.noCertificate || ''}
                                onChange={handleChange}
                            />
                            Brak świadczeń?
                        </label>
                    </div>
                    <h2>Osoba udzielająca pełnomocnictwa - Osoba do kontaktu:</h2>
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
                        <div className="error-container" ref={errorContainerRef}>
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
                            {errorEmail.length > 0 && (
                                <div className="error-container" ref={errorContainerRef}>
                                    {errorEmail.map((error, index) => (
                                        <p key={index} className="error-message">{error}</p>
                                    ))}
                                </div>
                            )}
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
