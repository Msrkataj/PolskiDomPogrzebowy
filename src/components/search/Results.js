import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script'; // Import Script component from Next.js
import StarRating from './StarRating';
import { db, storage } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { GoogleMap, Marker } from '@react-google-maps/api';
import TransportModal from "@/components/TransportModal";
import dynamic from "next/dynamic";


const mapContainerStyle = {
    height: "400px",
    width: "100%"
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

const FuneralHomeResults = () => {
    const [funeralHomes, setFuneralHomes] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);
    const [selectedFuneralHome, setSelectedFuneralHome] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingServices, setIsEditingServices] = useState(false);
    const mapRef = useRef();

    const handleSelectFuneralHome = (home) => {
        setSelectedFuneralHome(home);
        setIsModalOpen(true);
    };

    const fetchCoordinates = async (location) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
        return { lat: 0, lng: 0 };
    };

    const calculateDistance = (coord1, coord2) => {
        const R = 6371; // Promień Ziemi w kilometrach
        const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
        const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
        const a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
            (1 - Math.cos(dLng)) / 2;
        return R * 2 * Math.asin(Math.sqrt(a));
    };

    useEffect(() => {
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
            return null; // Jeśli żaden plik nie zostanie znaleziony, zwróć null
        };
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'domyPogrzebowe'));
                const homesData = querySnapshot.docs.map(doc => doc.data());

                // Filtracja domów pogrzebowych, które mają zarówno funeralHomeName, jak i city
                const validHomesData = homesData.filter(home => home.funeralHomeName && home.city);

                const dataWithUrls = await Promise.all(validHomesData.map(async home => {
                    try {
                        const logoUrl = await getDownloadURL(ref(storage, `${home.funeralHomeName}/logo/logo.png`));
                        const mainImageUrl = await getDownloadURL(ref(storage, `${home.funeralHomeName}/images/main.webp`));
                        const hallImageUrl = await getDownloadURL(ref(storage, `${home.funeralHomeName}/images/hall.webp`));
                        const carImageUrl = await getDownloadURL(ref(storage, `${home.funeralHomeName}/images/car.webp`));

                        return {
                            ...home,
                            logoUrl,
                            images: {
                                main: mainImageUrl,
                                hall: hallImageUrl,
                                car: carImageUrl
                            },
                            reviews: home.reviews || []
                        };
                    } catch (error) {
                        console.error(`Error fetching images for ${home.funeralHomeName}: `, error);
                        return {
                            ...home,
                            reviews: home.reviews || []
                        };
                    }
                }));
                const userLocation = localStorage.getItem('location') || 'Warszawa';
                const userCoordinates = await fetchCoordinates(userLocation);

                const sortedHomes = dataWithUrls.sort((a, b) => {
                    const distanceA = calculateDistance(userCoordinates, { lat: a.latitude, lng: a.longitude });
                    const distanceB = calculateDistance(userCoordinates, { lat: b.latitude, lng: b.longitude });
                    return distanceA - distanceB;
                });

                let closestHomes = sortedHomes.slice(0, 3);
                const minDistance = calculateDistance(userCoordinates, { lat: sortedHomes[0].latitude, lng: sortedHomes[0].longitude });

                if (minDistance < 30 && sortedHomes.length > 3) {
                    for (let i = 3; i < sortedHomes.length; i++) {
                        const distance = calculateDistance(userCoordinates, { lat: sortedHomes[i].latitude, lng: sortedHomes[i].longitude });
                        if (distance < 30) {
                            closestHomes.push(sortedHomes[i]);
                        } else {
                            break;
                        }
                    }
                }

                setFuneralHomes(closestHomes);
                if (closestHomes.length > 0) {
                    setSelectedCoordinates({ lat: closestHomes[0].latitude, lng: closestHomes[0].longitude });
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleImageSelection = (image) => {
        const imageUrl = image.startsWith('http') ? image : `https://${image}`;
        setSelectedImage(imageUrl);
    };

    const renderServices = (services = []) => {
        return services.map((service, index) => (
            <div key={index} className="service-item">
                {/*<div style={{ width: '50px', height: '50px', position: 'relative' }}>*/}
                {/*    <Image*/}
                {/*        src={`/assets/icons/${service}.png`}*/}
                {/*        alt={service}*/}
                {/*        fill*/}
                {/*        style={{ objectFit: 'contain' }}*/}
                {/*        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"*/}
                {/*    />*/}
                {/*</div>*/}
                <span>{service}</span>
            </div>
        ));
    };

    const onLoad = map => {
        mapRef.current = map;
    };

    const markerPosition = (latitude, longitude) => ({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    });

    return (
        <>
            <Script
                async
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places&callback=initMap`}
                strategy="afterInteractive" // Zmień strategię na "afterInteractive" lub "lazyOnload"
            />
            <div className="funeral-home-results">
                {funeralHomes.map((home, index) => (
                    <div key={index} className={`funeral-home ${index % 2 === 0 ? 'funeral-home-reverse' : ''}`}>
                        <div className="home-details">
                            <div className="home-details-name">
                                <Image
                                    src={home.logoUrl}
                                    alt={`${home.funeralHomeName} logo`}
                                    width={50}
                                    height={50}
                                    style={{ objectFit: 'contain' }}
                                    sizes="200px"
                                />
                                <div className="home-details-name-title">
                                    <h3>{home.funeralHomeName}</h3>
                                    <StarRating rating={home.rating} />
                                </div>
                            </div>
                            <div className="home-details-contact">
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
                                        <span>{home.city}</span>
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
                                        <span>{home.street}</span>
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
                                        <span>{home.postalCode}</span>
                                    )}
                                </div>
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
                                    home.openingHours && home.openingHours.length > 0 ? (
                                        home.openingHours.map((hour, index) => (
                                            <span key={index}>
                {`${hour.dayFrom} - ${hour.dayTo} od ${hour.from} do ${hour.to}`}
            </span>
                                        ))
                                    ) : (
                                        <p>Brak dostępnych godzin otwarcia</p>
                                    )
                                )}
                                {isEditing && <button onClick={handleAddOpeningHour}>Dodaj kolejne godzinny otwarcia</button>}
                                <p><strong>Email:</strong> {home.email}</p>
                                <p><strong>Telefon:</strong> {home.phone}</p>
                            </div>
                            <div className="services">
                                <h4>Usługi:</h4>
                                <div className="home-details-item">
                                    {renderServices(home.services)}
                                </div>
                            </div>
                            <h4>Opis:</h4>
                            <div className="funeral-home-text">
                                <p className="description">{home.description}</p>
                            </div>
                            <div className="reviews">
                                <h4>Opinie:</h4>
                                <div className="reviews-main">
                                    {home.reviews && home.reviews.length > 0 ? home.reviews.map((review, i) => (
                                        <blockquote key={i} className="funeral-home-text reviews-main-text">
                                            <p>{review.date}</p>&quot;{review.text}&quot; - <cite>{review.author}</cite>
                                        </blockquote>
                                    )) : <p>Brak opinii.</p>}
                                </div>
                            </div>
                            {selectedFuneralHome && (
                                <TransportModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    funeralHome={selectedFuneralHome}
                                />
                            )}
                            <button
                                className="select-button"
                                onClick={() => handleSelectFuneralHome(home)}
                            >
                                Wybierz ten zakład
                            </button>
                        </div>
                        <div className="home-images">
                            <div className="selected-image">
                                <Image
                                    src={selectedImage || (home.images && home.images.main ? home.images.main : '/default-image.webp')}
                                    alt="Selected"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="image-selector">
                                <button onClick={() => handleImageSelection(home.images?.main || '/default-image.webp')}>Zdjęcie zakładu</button>
                                <button onClick={() => handleImageSelection(home.images?.hall || '/default-image.webp')}>Zdjęcie sali pożegnań</button>
                                <button onClick={() => handleImageSelection(home.images?.car || '/default-image.webp')}>Zdjęcie karawanu</button>
                            </div>
                            <div className="map">
                                {selectedCoordinates && (
                                    <GoogleMap
                                        mapContainerStyle={mapContainerStyle}
                                        center={markerPosition(home.latitude, home.longitude)}
                                        zoom={15}
                                        onLoad={onLoad}
                                        options={options}
                                    >
                                        <div className="map-marker">
                                            <p className="marker-label">{home.funeralHomeName}</p>
                                            <Marker
                                                position={markerPosition(home.latitude, home.longitude)}
                                                icon={{
                                                    url: "/assets/icons/marker.png",
                                                    scaledSize: new window.google.maps.Size(30, 40)
                                                }}
                                            />
                                        </div>
                                    </GoogleMap>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default dynamic (() => Promise.resolve(FuneralHomeResults), {ssr: false})

