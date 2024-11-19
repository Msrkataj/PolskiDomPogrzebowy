import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { db, storage } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import useAuthMiddleware from '../../../middleware';
import AuthGuardFuneral from '@/components/panel/AuthGuardFuneral';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Script from 'next/script';

const FirstLogin = () => {
    const [ownerName, setOwnerName] = useState('');
    const [funeralHomeName, setFuneralHomeName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [openingHours, setOpeningHours] = useState([{ dayFrom: '', dayTo: '', from: '', to: '' }]);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [alarm, setAlarm] = useState('');
    const [correct, setCorrect] = useState('');
    const [logo, setLogo] = useState(null);
    const [validate, setValidate] = useState('');
    const router = useRouter();
    const roleChecked = useAuthMiddleware('funeralHome');
    const mapRef = useRef(null);

    const mapContainerStyle = {
        height: "400px",
        width: "100%"
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const [loading, setLoading] = useState(true);
    const [isProfileComplete, setIsProfileComplete] = useState(false);

    useEffect(() => {
        const checkProfileCompletion = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const userDocRef = doc(db, 'domyPogrzebowe', userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();

                    if (userData.profileCompleted) {
                        setIsProfileComplete(true);
                    }
                }
            } catch (error) {
                console.error('Błąd podczas sprawdzania profilu:', error);
            } finally {
                setLoading(false);
            }
        };

        checkProfileCompletion();
    }, []);

    if (loading) {
        return <div>Ładowanie danych...</div>;
    }

    if (isProfileComplete) {
        router.push('/funeral/panel');
        return null;
    }

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

    const fetchCoordinates = async (location) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    format: 'json',
                    q: location,
                }
            });
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                return { lat: parseFloat(lat), lng: parseFloat(lon) };
            }
            return null;
        } catch (error) {
            console.error('Błąd podczas pobierania współrzędnych:', error);
            return null;
        }
    };

    const reverseGeocodeCoordinates = async (lat, lon) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                params: {
                    format: 'json',
                    lat: lat,
                    lon: lon,
                    addressdetails: 1,
                }
            });
            if (response.data && response.data.address) {
                const address = response.data.address;
                // Tworzymy pełny adres ulicy z numerem domu
                const streetName = address.road || '';
                const houseNumber = address.house_number || '';
                const fullStreet = [streetName, houseNumber].filter(Boolean).join(' ');
                // Aktualizujemy pola adresowe
                setStreet(fullStreet);
                setCity(address.city || address.town || address.village || '');
                setPostalCode(address.postcode || '');
                setCorrect('Zaktualizowano adres na podstawie wybranej lokalizacji. Możesz przesuwać wskażnikiem na mapie i ręcznie zmienić lokalizację');
                setAlarm('');
            }
        } catch (error) {
            console.error('Błąd podczas reverse geocodingu:', error);
            setAlarm('Nie można zaktualizować adresu na podstawie wybranej lokalizacji.');
            setCorrect('');
        }
    };

    const handleAddressChange = async () => {
        if (city && street && postalCode) {
            const fullAddress = `${street}, ${postalCode} ${city}`;
            const coords = await fetchCoordinates(fullAddress);
            if (coords) {
                setCoordinates(coords);
                setCorrect('Znaleziono adres');
                setAlarm('');
                setShowMap(true);
            } else {
                setAlarm('Nie można znaleźć podanego adresu. Sprawdź poprawność danych.');
                setCorrect('');
                setShowMap(false);
            }
        } else {
            setShowMap(false);
        }
    };

    const handleMarkerDragEnd = async (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setCoordinates({ lat: newLat, lng: newLng });
        await reverseGeocodeCoordinates(newLat, newLng);
    };

    const handleConfirmAddress = (e) => {
        setConfirmAddress(e.target.checked);
    };

    const onLoad = (map) => {
        mapRef.current = map;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ownerName || !funeralHomeName || !city || !street || !postalCode || !confirmAddress) {
            setValidate('Proszę wypełnić wszystkie wymagane pola i potwierdzić adres.');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Użytkownik niezalogowany');
            return;
        }

        const funeralHomeData = {
            id: userId,
            ownerName,
            funeralHomeName,
            name: funeralHomeName,
            city,
            street,
            postalCode,
            openingHours,
            phone,
            description,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            profileCompleted: true,
        };

        try {
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            await updateDoc(userDocRef, funeralHomeData);

            if (logo) {
                const logoStorageRef = storageRef(storage, `${funeralHomeName}/logo/logo.png`);
                await uploadBytes(logoStorageRef, logo);
                const logoUrl = await getDownloadURL(logoStorageRef);
                await updateDoc(userDocRef, { logoUrl });
            }

            router.push('/funeral/first-form');
        } catch (error) {
            console.error('Błąd podczas aktualizacji dokumentu: ', error);
            alert('Błąd podczas aktualizacji danych. Spróbuj ponownie.');
        }
    };

    return (
        <div className="firstLoginContainer">
            <h1>Witamy w Twoim Panelu Domu Pogrzebowego</h1>
            <form onSubmit={handleSubmit}>
                <div className="formSection">
                    <h2>Dane domu pogrzebowego:</h2>
                    <label>Imię i Nazwisko właściciela: *</label>
                    <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                    />
                    <label>Nazwa domu pogrzebowego: *</label>
                    <input
                        type="text"
                        value={funeralHomeName}
                        onChange={(e) => setFuneralHomeName(e.target.value)}
                        required
                    />
                    <label>Miasto: *</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            handleAddressChange();
                        }}
                        required
                    />
                    <label>Ulica: *</label>
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => {
                            setStreet(e.target.value);
                            handleAddressChange();
                        }}
                        required
                    />
                    <label>Kod pocztowy: *</label>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => {
                            setPostalCode(e.target.value);
                            handleAddressChange();
                        }}
                        required
                    />
                    {alarm && <p className="alarm">{alarm}</p>}
                    {correct && <p className="correct">{correct}</p>}
                    {showMap && coordinates && (
                        <div className="map-section">
                            <div className="map">
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={coordinates}
                                    zoom={15}
                                    onLoad={onLoad}
                                    options={options}
                                >
                                    <Marker
                                        position={coordinates}
                                        draggable={true}
                                        onDragEnd={handleMarkerDragEnd}
                                    />
                                </GoogleMap>
                            </div>
                            <h3>Czy to jest poprawny adres?</h3>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={confirmAddress}
                                    onChange={handleConfirmAddress}
                                    required
                                />
                                Tak, to jest mój adres
                            </label>
                        </div>
                    )}
                    {!showMap && (
                        <p>Wprowadź pełny adres, aby zobaczyć jego podgląd na mapie.</p>
                    )}
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
                    <label>Logo domu pogrzebowego: *</label>
                    <input
                        type="file"
                        onChange={handleLogoChange}
                        required
                    />
                    <label>Email:</label>
                    <label>Telefon:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label>Opis:</label>
                    <p>Krótki opis Twojego domu pogrzebowego</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {validate && <p className="validate">{validate}</p>}
                    <button type="submit">Dalej</button>
                </div>
            </form>
            <Script
                async
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                strategy="afterInteractive"
            />
        </div>
    );
};

const DashboardWithAuth = () => (
    <AuthGuardFuneral>
        <FirstLogin />
    </AuthGuardFuneral>
);

export default DashboardWithAuth;