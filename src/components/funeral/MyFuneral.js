import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { db, storage } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from '@/components/funeral/EditServicesModal';
import FuneralHomeMap from './FuneralHomeMap';
import fotoImage from '../../../public/assets/images/mistrz-ceremonii.webp';
import StarRating from "@/components/search/StarRating";
import { GoogleMap, Marker } from '@react-google-maps/api';
import Script from 'next/script';
import axios from 'axios';
import FuneralHomeImages from './FirstSummary'; // Importujemy komponent do edycji galerii
import AuthGuardFuneral from "@/components/panel/AuthGuardFuneral";

const FuneralHomeDetails = () => {
    const [funeralHomeDetails, setFuneralHomeDetails] = useState(null);
    const [editableDetails, setEditableDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingServices, setIsEditingServices] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [isGalleryEditing, setIsGalleryEditing] = useState(false);
    const router = useRouter();
    const mapRef = useRef(null);

    const mapContainerStyle = {
        height: "400px",
        width: "100%"
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const fetchFuneralHomeDetails = async () => {
        const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        if (!userId) {
            router.push('/login');
            return;
        }

        try {
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const homeData = docSnap.data();
                const funeralHomeName = homeData.funeralHomeName.trim();
                const basePath = `${funeralHomeName}`;

                const getFileUrl = async (basePath, fileName, extensions) => {
                    for (const ext of extensions) {
                        try {
                            const filePath = `${basePath}/${fileName}.${ext}`;
                            const fileUrl = await getDownloadURL(ref(storage, filePath));
                            return fileUrl;
                        } catch (error) {
                            if (error.code !== 'storage/object-not-found') {
                                console.error(`Error fetching file with extension .${ext}:`, error);
                            }
                        }
                    }
                    return fotoImage;
                };

                const logoUrl = await getFileUrl(basePath, 'logo/logo', ['png', 'jpg', 'jpeg', 'webp']);
                const mainImageUrl = await getFileUrl(basePath, 'images/main', ['png', 'jpg', 'jpeg', 'webp']);
                const hallImageUrl = await getFileUrl(basePath, 'images/hall', ['png', 'jpg', 'jpeg', 'webp']);
                const carImageUrl = await getFileUrl(basePath, 'images/car', ['png', 'jpg', 'jpeg', 'webp']);

                setFuneralHomeDetails({
                    ...homeData,
                    logoUrl: logoUrl || '/default-logo.png',
                    images: {
                        main: mainImageUrl || '/default-main-image.png',
                        hall: hallImageUrl || '/default-hall-image.png',
                        car: carImageUrl || '/default-car-image.png',
                    },
                });
                setEditableDetails({
                    ...homeData,
                    logoUrl: logoUrl || '/default-logo.png',
                    images: {
                        main: mainImageUrl || '/default-main-image.png',
                        hall: hallImageUrl || '/default-hall-image.png',
                        car: carImageUrl || '/default-car-image.png',
                    },
                });
                setSelectedImage(mainImageUrl || fotoImage);
                // Ustawienie początkowych współrzędnych
                setCoordinates({
                    lat: homeData.latitude,
                    lng: homeData.longitude,
                });
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error('Error fetching Funeral home details:', error);
        }
    };

    useEffect(() => {
        fetchFuneralHomeDetails();
    }, [router]);

    useEffect(() => {
        if (!isGalleryEditing) {
            fetchFuneralHomeDetails();
        }
    }, [isGalleryEditing]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableDetails(funeralHomeDetails);
        // Ustawienie współrzędnych na oryginalne
        setCoordinates({
            lat: funeralHomeDetails.latitude,
            lng: funeralHomeDetails.longitude,
        });
    };

    const handleSave = async () => {
        try {
            const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
            if (!userId) {
                router.push('/login');
                return;
            }
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            await updateDoc(userDocRef, {
                ...editableDetails,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
            });
            setFuneralHomeDetails({
                ...editableDetails,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating Funeral home details:', error);
        }
    };

    const handleChange = (field, value) => {
        setEditableDetails(prevDetails => ({
            ...prevDetails,
            [field]: value,
        }));
        if (['city', 'street', 'postalCode'].includes(field)) {
            handleAddressChange(value);
        }
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
            console.error('Error fetching coordinates:', error);
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
                const streetName = address.road || '';
                const houseNumber = address.house_number || '';
                const fullStreet = [streetName, houseNumber].filter(Boolean).join(' ');
                setEditableDetails(prevDetails => ({
                    ...prevDetails,
                    street: fullStreet,
                    city: address.city || address.town || address.village || '',
                    postalCode: address.postcode || '',
                }));
            }
        } catch (error) {
            console.error('Error reverse geocoding coordinates:', error);
        }
    };

    const handleAddressChange = async () => {
        const { city, street, postalCode } = editableDetails;
        if (city && street && postalCode) {
            const fullAddress = `${street}, ${postalCode} ${city}`;
            const coords = await fetchCoordinates(fullAddress);
            if (coords) {
                setCoordinates(coords);
                setEditableDetails(prevDetails => ({
                    ...prevDetails,
                    latitude: coords.lat,
                    longitude: coords.lng,
                }));
            }
        }
    };

    const handleMarkerDragEnd = async (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        setCoordinates({ lat: newLat, lng: newLng });
        setEditableDetails(prevDetails => ({
            ...prevDetails,
            latitude: newLat,
            longitude: newLng,
        }));
        await reverseGeocodeCoordinates(newLat, newLng);
    };

    const handleAddOpeningHour = () => {
        const newOpeningHours = [
            ...editableDetails.openingHours,
            { dayFrom: 'Poniedziałek', dayTo: 'Poniedziałek', from: '08:00', to: '16:00' }
        ];
        handleChange('openingHours', newOpeningHours);
    };

    const handleRemoveOpeningHour = (index) => {
        const newOpeningHours = editableDetails.openingHours.filter((_, i) => i !== index);
        handleChange('openingHours', newOpeningHours);
    };

    const handleSaveServices = async (updatedServices) => {
        try {
            const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
            if (!userId) {
                router.push('/login');
                return;
            }
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            await updateDoc(userDocRef, { services: updatedServices });
            setEditableDetails({
                ...editableDetails,
                services: updatedServices,
            });
            setIsEditingServices(false);
        } catch (error) {
            console.error('Error updating services:', error);
        }
    };

    if (!funeralHomeDetails) return (
        <div className="loadingContainer">
            <div className="loadingSpinner"></div>
            <div className="loadingText">Ładowanie danych...</div>
        </div>
    );

    const handleImageSelection = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const onLoad = (map) => {
        mapRef.current = map;
    };

    return (
        <div className="funeral-home-details">
            <div className="funeral-home-details-top">
                <Link className="back-link back-button" href="/funeral/panel">
                    Wróć do Panelu
                </Link>
            </div>
            <div className="home-details">
                <div className="home-details-name home-details-name-panel">
                    {funeralHomeDetails.logoUrl && (
                        <Image
                            src={funeralHomeDetails.logoUrl}
                            alt={`${funeralHomeDetails.name} logo`}
                            width={50}
                            height={50}
                            sizes="(max-width: 768px) 50px, (max-width: 1200px) 50px, 50px"
                        />
                    )}
                    <div className="home-details-name-title">
                        <h3>{funeralHomeDetails.funeralHomeName}</h3>
                        <StarRating rating={funeralHomeDetails.rating}/>
                    </div>
                </div>
                <div className="funeral-home-details-settings">
                    <Link className="back-link settings-button" href="/funeral/settings">
                        Ustawienia
                    </Link>
                </div>
                <div className="home-details-contact">
                    {isEditing ? (
                            <div>
                                <p>Nazwę zakładu pogrzebowego nie można zmienić - potrzebujesz pomocy? skontaktuj się z administratorem</p>
                                    <label>Imię i nazwisko właściela:</label>
                                    <input
                                        type="text"
                                        value={editableDetails.ownerName}
                                        onChange={(e) => handleChange('ownerName', e.target.value)}
                                    />
                            </div>
                        ) :
                        null
                    }
                    <p><strong>Adres:</strong></p>
                    <div>
                        <label>Miasto:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editableDetails.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                            />
                        ) : (
                            <span>{funeralHomeDetails.city}</span>
                        )}
                    </div>
                    <div>
                        <label>Ulica:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editableDetails.street}
                                onChange={(e) => handleChange('street', e.target.value)}
                            />
                        ) : (
                            <span>{funeralHomeDetails.street}</span>
                        )}
                    </div>
                    <div>
                        <label>Kod pocztowy:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editableDetails.postalCode}
                                onChange={(e) => handleChange('postalCode', e.target.value)}
                            />
                        ) : (
                            <span>{funeralHomeDetails.postalCode}</span>
                        )}
                    </div>
                    {/* Dodajemy mapę podczas edycji */}
                    {isEditing && (
                        <div className="map-section">
                            <div className="map">
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={coordinates || {lat: 0, lng: 0}}
                                    zoom={15}
                                    onLoad={onLoad}
                                    options={options}
                                >
                                    {coordinates && (
                                        <Marker
                                            position={coordinates}
                                            draggable={true}
                                            onDragEnd={handleMarkerDragEnd}
                                        />
                                    )}
                                </GoogleMap>
                            </div>
                        </div>
                    )}
                    <p><strong>Godziny otwarcia:</strong></p>
                    {isEditing ? (
                        editableDetails.openingHours && editableDetails.openingHours.length > 0 ? (
                            editableDetails.openingHours.map((hour, index) => (
                                <div key={index}>
                                    <select
                                        value={hour.dayFrom}
                                        onChange={(e) => {
                                            const newOpeningHours = [...editableDetails.openingHours];
                                            newOpeningHours[index].dayFrom = e.target.value;
                                            handleChange('openingHours', newOpeningHours);
                                        }}
                                    >
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
                                        onChange={(e) => {
                                            const newOpeningHours = [...editableDetails.openingHours];
                                            newOpeningHours[index].dayTo = e.target.value;
                                            handleChange('openingHours', newOpeningHours);
                                        }}
                                    >
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
                                        onChange={(e) => {
                                            const newOpeningHours = [...editableDetails.openingHours];
                                            newOpeningHours[index].from = e.target.value;
                                            handleChange('openingHours', newOpeningHours);
                                        }}
                                    />
                                    <input
                                        type="time"
                                        value={hour.to}
                                        onChange={(e) => {
                                            const newOpeningHours = [...editableDetails.openingHours];
                                            newOpeningHours[index].to = e.target.value;
                                            handleChange('openingHours', newOpeningHours);
                                        }}
                                    />
                                    <button onClick={() => handleRemoveOpeningHour(index)}>Usuń</button>
                                </div>
                            ))
                        ) : (
                            <p>Brak dostępnych godzin otwarcia</p>
                        )
                    ) : (
                        funeralHomeDetails.openingHours && funeralHomeDetails.openingHours.length > 0 ? (
                            funeralHomeDetails.openingHours.map((hour, index) => (
                                <span key={index}>
                                    {`${hour.dayFrom} - ${hour.dayTo} od ${hour.from} do ${hour.to}`}
                                </span>
                            ))
                        ) : (
                            <p>Brak dostępnych godzin otwarcia</p>
                        )
                    )}
                    {isEditing && <button className="button-clock-open" onClick={handleAddOpeningHour}>Dodaj kolejne godzinny otwarcia</button>}
                    <p><strong>Telefon:</strong>
                        {isEditing ? (
                            <input type="tel" value={editableDetails.phone}
                                   onChange={(e) => handleChange('phone', e.target.value)}/>
                        ) : (
                            funeralHomeDetails.phone
                        )}
                    </p>

                </div>
                <div className="funeral-home-text services-details">
                    <h4>Opis:</h4>
                    <div>
                        {isEditing ? (
                            <textarea value={editableDetails.description}
                                      onChange={(e) => handleChange('description', e.target.value)}/>
                        ) : (
                            <p className="description">{funeralHomeDetails.description}</p>
                        )}
                    </div>
                </div>
                {isEditing ? (
                    <div className="button-edit-funeral">
                        <button onClick={handleSave}>Zapisz edycję wszystkich elementów powyżej</button>
                        <button onClick={handleCancel}>Anuluj</button>
                    </div>
                ) : (
                    <div className="button-edit-funeral">
                        <button onClick={handleEdit}>Edytuj</button>
                    </div>
                )}
                <div className="services services-details">
                    <h4>Usługi:</h4>
                    <div className="home-details-item">
                        {funeralHomeDetails.services.map((service, index) => (
                            <div key={index} className="service-item">
                                <p>{service}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="button-edit-funeral">
                    <button onClick={() => setIsEditingServices(true)}>Edytuj usługi</button>
                </div>
                {isEditingServices && (
                    <Modal
                        services={funeralHomeDetails.services}
                        onSave={handleSaveServices}
                        onCancel={() => setIsEditingServices(false)}
                    />
                )}
                <div className="reviews services-details">
                    <h4>Opinie:</h4>
                    <div className="reviews-main">
                        {funeralHomeDetails.reviews && funeralHomeDetails.reviews.length > 0 ? funeralHomeDetails.reviews.map((review, i) => (
                            <blockquote key={i} className="funeral-home-text reviews-main-text">
                                <p>{review.date}</p> &quot;{review.text}&quot; - <cite>{review.author}</cite>
                            </blockquote>
                        )) : <p>Brak opinii.</p>}
                    </div>
                </div>
            </div>
            <div className="home-images home-images-client">
                <h2 className="home-img-title">Galeria</h2>
                <div className="selected-image selected-image-client">
                    <Image
                        src={selectedImage}
                        alt="Selected"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{objectFit: 'contain'}}
                    />
                </div>
                <div className="image-selector image-selector-client">
                    <button onClick={() => handleImageSelection(funeralHomeDetails.images.main)}>Zdjęcie zakładu
                    </button>
                    <button onClick={() => handleImageSelection(funeralHomeDetails.images.hall)}>Zdjęcie sali pożegnań
                    </button>
                    <button onClick={() => handleImageSelection(funeralHomeDetails.images.car)}>Zdjęcie karawanu
                    </button>
                </div>
                <div className="button-edit-funeral">
                    <button>
                        <Link href={"/funeral/first-summary"}>Edytuj galerię</Link>
                    </button>
                </div>
                <div className="map map-client">
                    <FuneralHomeMap latitude={funeralHomeDetails.latitude} longitude={funeralHomeDetails.longitude}
                                    name={funeralHomeDetails.funeralHomeName}/>
                </div>
            </div>
            {isGalleryEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <FuneralHomeImages onClose={() => setIsGalleryEditing(false)} />
                    </div>
                </div>
            )}
            {/* Dodajemy skrypt Google Maps */}
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
        <FuneralHomeDetails />
    </AuthGuardFuneral>
);

export default DashboardWithAuth;
