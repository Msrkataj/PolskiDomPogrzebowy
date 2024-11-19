import React, {useState, useEffect, useRef} from 'react';
import { db } from '../../../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import StepNavigation from './../StepNavigation'; // Adjust the path as necessary

const Form = () => {
    const [formData, setFormData] = useState({
        location: '',
        documents: '',
        city: '',
        street: '',
        postalCode: '',
    });
    const [addressVisible, setAddressVisible] = useState(false);
    const router = useRouter();
    const [formId, setFormId] = useState('');
    const [currentStep, setCurrentStep] = useState('formularz-pierwszy');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [errors, setErrors] = useState([]);
    const errorContainerRef = useRef(null);

    useEffect(() => {
        const path = router.pathname.split('/').pop();
        setCurrentStep(path || 'form');
    }, [router.pathname]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initializeForm = async () => {
                let localFormId = localStorage.getItem('formId');
                if (!localFormId) {
                    localFormId = `form-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
                    localStorage.setItem('formId', localFormId);
                    setFormId(localFormId);
                    await setDoc(doc(db, 'forms', localFormId), { id: localFormId });
                } else {
                    setFormId(localFormId);
                    const docRef = doc(db, 'forms', localFormId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setFormData(docSnap.data());
                    }
                }
            };
            initializeForm();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'postalCode') {
            const postalCodePattern = /^[0-9]{2}-[0-9]{3}$/;
            if (!postalCodePattern.test(value)) {
                setPostalCodeError("Kod pocztowy musi być w formacie xx-xxx.");
            } else {
                setPostalCodeError('');
            }
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'location' && value !== '') {
            setAddressVisible(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        // Validate postal code before proceeding
        const postalCodePattern = /^[0-9]{2}-[0-9]{3}$/;
        if (!postalCodePattern.test(formData.postalCode)) {
            setPostalCodeError("Kod pocztowy musi być w formacie xx-xxx.");
            return; // Stop the submission if the postal code is invalid
        }
        if (!formData.documents) {
            newErrors.push('Proszę określić, kiedy będą załatwiane dokumenty?');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const docRef = formId ? doc(db, 'forms', formId) : doc(collection(db, 'forms'));
            await setDoc(docRef, formData, { merge: true });
            localStorage.setItem('formData', JSON.stringify(formData));
            await router.push('/formularz-drugi');
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };
    useEffect(() => {
        if (errors.length > 0 && errorContainerRef.current) {
            errorContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [errors]);
    const handleSaveAndNavigate = async (step) => {
        const newErrors = [];

        if (!formData.documents) {
            newErrors.push('Proszę określić, kiedy będą załatwiane dokumenty?');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const docRef = formId ? doc(db, 'forms', formId) : doc(collection(db, 'forms'));
            await setDoc(docRef, formData, { merge: true });
            localStorage.setItem('formData', JSON.stringify(formData));
            setCurrentStep(step);
            await router.push(`/${step}`);
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };

    return (
        <div className="form-container">
            <div className="navigation-buttons">
                <button className="nav-button" onClick={() => router.back()}>← Cofnij</button>
                <button className="nav-button" onClick={() => handleSaveAndNavigate(currentStep === 'formularz-pierwszy' ? 'formularz-drugi' : currentStep === 'formularz-drugi' ? 'formularz-trzeci' : 'assortyment')}>Dalej →</button>
            </div>
            <StepNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} handleSaveAndNavigate={handleSaveAndNavigate} />
            <div className="form-container-main">
                <form onSubmit={handleSubmit}>
                    <div className="form-group-first">
                        <h2>Gdzie następuje zgon?</h2>
                        <div className="radio-group-form">
                            <label className={`radio-label ${formData.location === 'Dom/Placówka' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="location"
                                    value="Dom/Placówka"
                                    checked={formData.location === 'Dom/Placówka'}
                                    onChange={handleChange}
                                />
                                Dom/Placówka
                                {formData.location === 'Dom/Placówka' && <span className="checkmark">✔</span>}
                            </label>
                            <label className={`radio-label ${formData.location === 'Szpital' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="location"
                                    value="Szpital"
                                    checked={formData.location === 'Szpital'}
                                    onChange={handleChange}
                                />
                                Szpital
                                {formData.location === 'Szpital' && <span className="checkmark">✔</span>}
                            </label>
                            <label className={`radio-label ${formData.location === 'INNE' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="location"
                                    value="INNE"
                                    checked={formData.location === 'INNE'}
                                    onChange={handleChange}
                                />
                                INNE
                                {formData.location === 'INNE' && <span className="checkmark">✔</span>}
                            </label>
                        </div>
                        {addressVisible && (
                            <div className="address-input address-form-input">
                                <h2>Podaj dokładny adres:</h2>
                                <label htmlFor="city">Miejscowość</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city || ''}
                                    onChange={handleChange}
                                    placeholder="Wprowadź miejscowosść"
                                />
                                <label htmlFor="street">Ulica:</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData.street || ''}
                                    onChange={handleChange}
                                    placeholder="Wprowadź ulicę"
                                />
                                <label htmlFor="postalCode">Kod pocztowy:</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode || ''}
                                    onChange={handleChange}
                                    placeholder="Wprowadź kod pocztowy"
                                />
                                {postalCodeError && <p className="error-message">{postalCodeError}</p>}
                            </div>
                        )}
                    </div>
                    <div className="form-group form-group-when ">
                        <h2>Kiedy będą załatwiane dokumenty?</h2>
                        <div className="radio-group-form">
                            <label className={`radio-label ${formData.documents === 'Powyżej doby' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="documents"
                                    value="Powyżej doby"
                                    checked={formData.documents === 'Powyżej doby'}
                                    onChange={handleChange}
                                />
                                Powyżej doby
                                {formData.documents === 'Powyżej doby' && <span className="checkmark">✔</span>}
                            </label>
                            <label className={`radio-label ${formData.documents === 'W ciągu doby' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="documents"
                                    value="W ciągu doby"
                                    checked={formData.documents === 'W ciągu doby'}
                                    onChange={handleChange}
                                />
                                W ciągu doby
                                {formData.documents === 'W ciągu doby' && <span className="checkmark">✔</span>}
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
                    <button type="submit" className="submit-button">Zapisz i przejdź do informacji o Osobie zmarłej</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
