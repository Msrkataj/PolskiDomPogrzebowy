import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import StepNavigation from './../StepNavigation'; // Adjust the path as necessary

const Form = () => {
    const [formData, setFormData] = useState({
        location: '',
        documents: '',
        address: ''
    });
    const [addressVisible, setAddressVisible] = useState(false);
    const router = useRouter();
    const [formId, setFormId] = useState('');
    const [currentStep, setCurrentStep] = useState('');

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
        try {
            const docRef = formId ? doc(db, 'forms', formId) : doc(collection(db, 'forms'));
            await setDoc(docRef, formData, { merge: true });
            localStorage.setItem('formData', JSON.stringify(formData));
            await router.push('/details');
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };

    const handleSaveAndNavigate = async (step) => {
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
                <button className="nav-button" onClick={() => handleSaveAndNavigate(currentStep === 'form' ? 'details' : currentStep === 'details' ? 'funeraldetails' : 'assortment')}>Dalej →</button>
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
                                <label htmlFor="address">Podaj dokładny adres:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Wprowadź adres"
                                />
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
                    <button type="submit" className="submit-button">Zapisz i przejdź do informacji o Osobie zmarłej</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
