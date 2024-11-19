import React, {useState, useEffect, useRef} from 'react';
import { db } from '../../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import StepNavigation from '@/components/StepNavigation';

const FuneralDetailsForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState('formularz-trzeci');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        formType: '',
        religiousCeremony: '',
        burialOption: '',
        clothingOption: '',
        cemeteryPreference: '', // Preferowany cmentarz do pochowku (gdy burialOption === 'Nie')
        graveCemetery: '', // Cmentarz i numer kwatery (gdy burialOption === 'Tak')
        gravePersonName: '', // Imię i nazwisko osoby do dochówku (gdy burialOption === 'Tak')
        graveDeathDate: '' // Data śmierci osoby (gdy burialOption === 'Tak')
    });
    const errorContainerRef = useRef(null);



    useEffect(() => {
        const loadData = async () => {
            const formId = localStorage.getItem('formId');
            if (formId) {
                const docRef = doc(db, 'forms', formId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            }
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (errors.length > 0 && errorContainerRef.current) {
            errorContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [errors]);
    const handleSaveAndNavigate = async (step) => {
        const newErrors = {};


        // Walidacja pola 'formType' (radio button)
        if (!formData.formType) {
            newErrors.formType = 'Proszę wybrać formę pogrzebu.';
        }

        // Walidacja pola 'religiousCeremony' (radio button)
        if (!formData.religiousCeremony) {
            newErrors.religiousCeremony = 'Proszę wybrać rodzaj ceremonii.';
        }

        // Walidacja pola 'burialOption' (radio button)
        if (!formData.burialOption) {
            newErrors.burialOption = 'Proszę wybrać opcję dochówku.';
        } else if (formData.burialOption === 'Tak') {
            // Walidacja dla opcji "Tak" w burialOption
            if (!formData.graveCemetery && (!formData.gravePersonName || !formData.graveDeathDate)) {
                newErrors.graveDetails = 'Proszę podać cmentarz i numer kwatery, lub imię, nazwisko i datę śmierci osoby.';
            }
        } else if (formData.burialOption === 'Nie') {
            // Walidacja dla opcji "Nie" w burialOption
            if (!formData.cemeteryPreference) {
                newErrors.cemeteryPreference = 'Proszę podać preferowany cmentarz do pochowku.';
            }
        }

        // Walidacja pola 'clothingOption' (radio button)
        if (!formData.clothingOption) {
            newErrors.clothingOption = 'Proszę wybrać opcję ubioru dla zmarłego.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Resetowanie błędów jeśli wszystkie pola są wypełnione poprawnie
        setErrors({});
        await saveData();
        setCurrentStep(step);
        await router.push(`/${step}`);
    };

    const saveData = async () => {
        let id = localStorage.getItem('formId');
        if (!id) {
            id = generateUniqueId();
            localStorage.setItem('formId', id);
        }

        try {
            await setDoc(doc(db, 'forms', id), formData, { merge: true });
            console.log('Form saved successfully');
        } catch (error) {
            console.error('Błąd zapisu formularza: ', error);
        }
    };

    const generateUniqueId = () => {
        return 'form_' + Math.random().toString(36).substr(2, 9);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Walidacja pola 'formType' (radio button)
        if (!formData.formType) {
            newErrors.formType = 'Proszę wybrać formę pogrzebu.';
        }

        // Walidacja pola 'religiousCeremony' (radio button)
        if (!formData.religiousCeremony) {
            newErrors.religiousCeremony = 'Proszę wybrać rodzaj ceremonii.';
        }

        // Walidacja pola 'burialOption' (radio button)
        if (!formData.burialOption) {
            newErrors.burialOption = 'Proszę wybrać opcję dochówku.';
        } else if (formData.burialOption === 'Tak') {
            // Walidacja dla opcji "Tak" w burialOption
            if (!formData.graveCemetery && (!formData.gravePersonName || !formData.graveDeathDate)) {
                newErrors.graveDetails = 'Proszę podać cmentarz i numer kwatery, lub imię, nazwisko i datę śmierci osoby.';
            }
        } else if (formData.burialOption === 'Nie') {
            // Walidacja dla opcji "Nie" w burialOption
            if (!formData.cemeteryPreference) {
                newErrors.cemeteryPreference = 'Proszę podać preferowany cmentarz do pochowku.';
            }
        }

        // Walidacja pola 'clothingOption' (radio button)
        if (!formData.clothingOption) {
            newErrors.clothingOption = 'Proszę wybrać opcję ubioru dla zmarłego.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Resetowanie błędów i zapisywanie danych, jeśli wszystko jest poprawne
        setErrors({});
        await saveData();
        await router.push('/assortyment');
    };


    return (
        <div className="form-container">
            <div className="navigation-buttons">
                <button className="nav-button" onClick={() => handleSaveAndNavigate('formularz-drugi')}>← Cofnij</button>
                <button className="nav-button" onClick={() => handleSaveAndNavigate('assortyment')}>Dalej →</button>
            </div>
            <StepNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} handleSaveAndNavigate={handleSaveAndNavigate} />
            <form onSubmit={handleSubmit} className="funeral-details-form">
                <h2>Forma pogrzebu:</h2>
                <div className="radio-group-form radio-group-funeral">
                    <label className={`radio-label ${formData.formType === 'Pogrzeb z trumną' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="formType"
                            value="Pogrzeb z trumną"
                            checked={formData.formType === 'Pogrzeb z trumną'}
                            onChange={handleChange}
                        />
                        Pogrzeb z trumną
                        {formData.formType === 'Pogrzeb z trumną' && <span className="checkmark">✔</span>}
                    </label>
                    <label className={`radio-label ${formData.formType === 'Pogrzeb z urną' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="formType"
                            value="Pogrzeb z urną"
                            checked={formData.formType === 'Pogrzeb z urną'}
                            onChange={handleChange}
                        />
                        Pogrzeb z urną
                        {formData.formType === 'Pogrzeb z urną' && <span className="checkmark">✔</span>}
                    </label>
                </div>
                <h2>Rodzaj ceremonii:</h2>
                <div className="radio-group-form radio-group-funeral">
                    <label className={`radio-label ${formData.religiousCeremony === 'Kościelna' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="religiousCeremony"
                            value="Kościelna"
                            checked={formData.religiousCeremony === 'Kościelna'}
                            onChange={handleChange}
                        />
                        Kościelna*
                        {formData.religiousCeremony === 'Kościelna' && <span className="checkmark">✔</span>}
                    </label>
                    <label
                        className={`radio-label ${formData.religiousCeremony === 'Świecka' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="religiousCeremony"
                            value="Świecka"
                            checked={formData.religiousCeremony === 'Świecka'}
                            onChange={handleChange}
                        />
                        Świecka
                        {formData.religiousCeremony === 'Świecka' && <span className="checkmark">✔</span>}
                    </label>
                </div>
                <p className="form-info">*Klient musi stawić się w kościele aby dopełnić formalności</p>
                <h2>Czy dochowujemy do grobu?</h2>
                <div className="radio-group-form">
                    <label className={`radio-label ${formData.burialOption === 'Tak' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="burialOption"
                            value="Tak"
                            checked={formData.burialOption === 'Tak'}
                            onChange={handleChange}
                        />
                        Tak
                        {formData.burialOption === 'Tak' && <span className="checkmark">✔</span>}
                    </label>
                    <label className={`radio-label ${formData.burialOption === 'Nie' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="burialOption"
                            value="Nie"
                            checked={formData.burialOption === 'Nie'}
                            onChange={handleChange}
                        />
                        Nie
                        {formData.burialOption === 'Nie' && <span className="checkmark">✔</span>}
                    </label>
                </div>

                {formData.burialOption === 'Tak' && (
                    <div className="form-group">
                        <label htmlFor="graveCemetery">Podaj cmentarz i numer kwatery</label>
                        <input
                            type="text"
                            id="graveCemetery"
                            name="graveCemetery"
                            value={formData.graveCemetery || ''}
                            onChange={handleChange}
                            placeholder="Podaj cmentarz i numer kwatery"
                            required={formData.burialOption === 'Tak'}
                        />
                        <p>Lub</p>
                        <label htmlFor="gravePersonName">Imię i nazwisko osoby, do której będzie robiony dochówek:</label>
                        <input
                            type="text"
                            id="gravePersonName"
                            name="gravePersonName"
                            value={formData.gravePersonName || ''}
                            onChange={handleChange}
                            placeholder="Imię i nazwisko osoby, do której będzie robiony dochówek"
                            required={formData.burialOption === 'Tak'}
                        />
                        <label htmlFor="graveDeathDate">Data śmierci osoby:</label>
                        <input
                            type="date"
                            id="graveDeathDate"
                            name="graveDeathDate"
                            value={formData.graveDeathDate || ''}
                            onChange={handleChange}
                            required={formData.burialOption === 'Tak'}
                        />
                    </div>
                )}


                {formData.burialOption === 'Nie' && (
                    <div className="form-group">
                        <label htmlFor="cemeteryPreference">Podaj preferowany cmentarz do pochowku:</label>
                        <input
                            type="text"
                            id="cemeteryPreference"
                            name="cemeteryPreference"
                            value={formData.cemeteryPreference || ''}
                            onChange={handleChange}
                            placeholder="Podaj preferowany cmentarz"
                            required
                        />
                    </div>
                )}
                {formData.burialOption === 'Tak' && (
                    <div className="form-group">
                        <label htmlFor="graveDetails">Podaj cmentarz i numer kwatery lub imię, nazwisko, datę śmierci osoby do której będzie robiony dochówek:</label>
                        <input
                            type="text"
                            id="graveDetails"
                            name="graveDetails"
                            value={formData.graveDetails || ''}
                            onChange={handleChange}
                            placeholder="Podaj szczegóły dochówku"
                            required={formData.burialOption === 'Tak'}
                        />
                    </div>

                )}

                <h2>Ubiór zmarłego:</h2>
                <div className="radio-group-form radio-group-funeral">
                    <label
                        className={`radio-label ${formData.clothingOption === 'Rodzina dostarcza ubranie' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="clothingOption"
                            value="Rodzina dostarcza ubranie"
                            checked={formData.clothingOption === 'Rodzina dostarcza ubranie'}
                            onChange={handleChange}
                        />
                        Rodzina dostarcza ubranie
                        {formData.clothingOption === 'Rodzina dostarcza ubranie' &&
                            <span className="checkmark">✔</span>}
                    </label>
                    <label
                        className={`radio-label ${formData.clothingOption === 'Kupno odzieży w zakładzie' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="clothingOption"
                            value="Kupno odzieży w zakładzie"
                            checked={formData.clothingOption === 'Kupno odzieży w zakładzie'}
                            onChange={handleChange}
                        />
                        Kupno odzieży w zakładzie
                        {formData.clothingOption === 'Kupno odzieży w zakładzie' &&
                            <span className="checkmark">✔</span>}
                    </label>
                </div>
                <h3>W celu ustalenia daty pogrzebu
                    trzeba się skontaktować bezpośrednio z biurem domu pogrzebowego.</h3>
                <div className="submit-container" ref={errorContainerRef}>
                    {Object.values(errors).map((error, index) => (
                        <p key={index} className="error-message">{error}</p>
                    ))}
                    <button type="submit" className="submit-button">Zapisz i przejdź do wyboru asortymentu</button>
                </div>
            </form>
        </div>
    );
};

export default FuneralDetailsForm;
