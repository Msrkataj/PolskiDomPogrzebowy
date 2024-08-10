import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db, storage } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import useAuthMiddleware from "../../../middleware";

const FirstLogin = () => {
    const [ownerName, setOwnerName] = useState('');
    const [funeralHomeName, setFuneralHomeName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [openingHours, setOpeningHours] = useState([{ dayFrom: '', dayTo: '', from: '', to: '' }]);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);
    const router = useRouter();
    const roleChecked = useAuthMiddleware('funeralHome');

    useEffect(() => {
        if (!roleChecked) return; // Zapobiega uruchamianiu efektu, jeśli rola nie została jeszcze sprawdzona

        // Pobierz dane użytkownika, jeśli to konieczne
    }, [roleChecked]);

    const handleLogoChange = (e) => {
        if (e.target.files[0]) {
            setLogo(e.target.files[0]);
        }
    };

    const handleAddOpeningHour = () => {
        setOpeningHours([...openingHours, { dayFrom: '', dayTo: '', from: '', to: '' }]);
    };

    const handleRemoveOpeningHour = (index) => {
        if (index === 0) return;
        const newOpeningHours = [...openingHours];
        newOpeningHours.splice(index, 1);
        setOpeningHours(newOpeningHours);
    };

    const handleOpeningHourChange = (index, field, value) => {
        const newOpeningHours = [...openingHours];
        newOpeningHours[index][field] = value;
        setOpeningHours(newOpeningHours);
    };

    const geocodeAddress = async (address) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: address,
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                }
            });
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } catch (error) {
            console.error("Error geocoding address: ", error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in');
            return;
        }

        const fullAddress = `${street}, ${city}, ${postalCode}`;
        const coordinates = await geocodeAddress(fullAddress);

        if (!coordinates) {
            alert('Error geocoding address. Please try again.');
            return;
        }

        const funeralHomeData = {
            ownerName,
            funeralHomeName,
            city,
            street,
            postalCode,
            openingHours,
            email,
            phone,
            description,
            latitude: coordinates.lat, // Używamy pełnych nazw pól
            longitude: coordinates.lng // Używamy pełnych nazw pól
        };

        try {
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            await updateDoc(userDocRef, funeralHomeData);

            if (logo) {
                const logoRef = ref(storage, `${funeralHomeName}/logo/logo.png`);
                await uploadBytes(logoRef, logo);
                const logoUrl = await getDownloadURL(logoRef);
                await updateDoc(userDocRef, { logoUrl });
            }

            router.push('/funeral/first-form');
        } catch (error) {
            console.error('Error updating document: ', error);
            alert('Error updating document. Please try again.');
        }
    };

    return (
        <div className="firstLoginContainer">
            <h1>Witamy w Twoim Panelu Domu Pogrzebowego</h1>
            <form onSubmit={handleSubmit}>
                <div className="formSection">
                    <h2>Dane domu pogrzebowego:</h2>
                    <label>Imię i Nazwisko właściciela:</label>
                    <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                    />
                    <label>Nazwa domu pogrzebowego:</label>
                    <input
                        type="text"
                        value={funeralHomeName}
                        onChange={(e) => setFuneralHomeName(e.target.value)}
                        required
                    />
                    <label>Miasto:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <label>Ulica:</label>
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                    <label>Kod pocztowy:</label>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <label>Godziny otwarcia:</label>
                    {openingHours.map((hour, index) => (
                        <div key={index} className="opening-hours-section">
                            <select
                                value={hour.dayFrom}
                                onChange={(e) => handleOpeningHourChange(index, 'dayFrom', e.target.value)}
                                required
                            >
                                <option value="">Od</option>
                                <option value="Poniedziałek">Poniedziałek</option>
                                <option value="Wtorek">Wtorek</option>
                                <option value="Środa">Środa</option>
                                <option value="Czwartek">Czwartek</option>
                                <option value="Piątek">Piątek</option>
                                <option value="Sobota">Sobota</option>
                                <option value="Niedziela">Niedziela</option>
                            </select>
                            <select
                                value={hour.dayTo}
                                onChange={(e) => handleOpeningHourChange(index, 'dayTo', e.target.value)}
                                required
                            >
                                <option value="">Do</option>
                                <option value="Poniedziałek">Poniedziałek</option>
                                <option value="Wtorek">Wtorek</option>
                                <option value="Środa">Środa</option>
                                <option value="Czwartek">Czwartek</option>
                                <option value="Piątek">Piątek</option>
                                <option value="Sobota">Sobota</option>
                                <option value="Niedziela">Niedziela</option>
                            </select>
                            <input
                                type="time"
                                value={hour.from}
                                onChange={(e) => handleOpeningHourChange(index, 'from', e.target.value)}
                                required
                            />
                            <input
                                type="time"
                                value={hour.to}
                                onChange={(e) => handleOpeningHourChange(index, 'to', e.target.value)}
                                required
                            />
                            {index !== 0 && (
                                <button type="button" onClick={() => handleRemoveOpeningHour(index)}>Usuń</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOpeningHour}>Dodaj godziny otwarcia</button>
                    <label>Logo domu pogrzebowego:</label>
                    <input
                        type="file"
                        onChange={handleLogoChange}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Telefon:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label>Opis:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit">Dalej</button>
                </div>
            </form>
        </div>
    );
};

export default FirstLogin;
