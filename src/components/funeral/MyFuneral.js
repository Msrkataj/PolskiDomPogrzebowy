import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { db, storage } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from '@/components/funeral/EditServicesModal';
import FuneralHomeMap from './FuneralHomeMap'; // Poprawny import

const FuneralHomeDetails = () => {
    const [funeralHomeDetails, setFuneralHomeDetails] = useState(null);
    const [editableDetails, setEditableDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingServices, setIsEditingServices] = useState(false);
    const router = useRouter();

    useEffect(() => {
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

                    const logoPath = `${funeralHomeName}/logo/logo.png`;
                    const mainImagePath = `${funeralHomeName}/images/main.webp`;
                    const hallImagePath = `${funeralHomeName}/images/hall.webp`;
                    const carImagePath = `${funeralHomeName}/images/car.webp`;
                    console.log(logoPath)
                    const logoUrl = await getDownloadURL(ref(storage, logoPath));
                    const mainImageUrl = await getDownloadURL(ref(storage, mainImagePath));
                    const hallImageUrl = await getDownloadURL(ref(storage, hallImagePath));
                    const carImageUrl = await getDownloadURL(ref(storage, carImagePath));
                    console.log(logoUrl)

                    setFuneralHomeDetails({
                        ...homeData,
                        logoUrl,
                        images: {
                            main: mainImageUrl,
                            hall: hallImageUrl,
                            car: carImageUrl,
                        },
                    });
                    setEditableDetails({
                        ...homeData,
                        logoUrl,
                        images: {
                            main: mainImageUrl,
                            hall: hallImageUrl,
                            car: carImageUrl,
                        },
                    });
                    setSelectedImage(mainImageUrl);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching Funeral home details:', error);
            }
        };

        fetchFuneralHomeDetails();
    }, [router]);
console.log(funeralHomeDetails)
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableDetails(funeralHomeDetails);
    };

    const handleSave = async () => {
        try {
            const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
            if (!userId) {
                router.push('/login');
                return;
            }
            const userDocRef = doc(db, 'domyPogrzebowe', userId);
            await updateDoc(userDocRef, editableDetails);
            setFuneralHomeDetails(editableDetails);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating Funeral home details:', error);
        }
    };

    const handleChange = (field, value) => {
        setEditableDetails({
            ...editableDetails,
            [field]: value,
        });
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

    if (!funeralHomeDetails) {
        return <div>Loading...</div>;
    }

    const handleImageSelection = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    return (
        <div className="funeral-home-details">
            <Link className="back-link back-button" href="/funeral/panel">
                Wróć do Panelu
            </Link>
            <h1>Twój wybrany dom pogrzebowy</h1>
            <div className="home-details">
                <div className="home-details-name">
                    {funeralHomeDetails.logoUrl && (
                        <Image src={funeralHomeDetails.logoUrl} alt={`${funeralHomeDetails.name} logo`} width={50}
                               height={50}/>
                    )}
                    <div className="home-details-name-title">
                        <h3>{funeralHomeDetails.funeralHomeName}</h3>
                        <p>Ocena: {funeralHomeDetails.rating ? funeralHomeDetails.rating : 'Brak ocen'}</p>
                    </div>
                </div>
                <div className="home-details-contact">
                    <p><strong>Adres:</strong>
                        {isEditing ? (
                            <input type="text" value={editableDetails.city}
                                   onChange={(e) => handleChange('city', e.target.value)}/>
                        ) : (
                            `${funeralHomeDetails.city} ul.${funeralHomeDetails.street}, ${funeralHomeDetails.postalCode}`
                        )}
                    </p>
                    <p><strong>Godziny otwarcia:</strong>
                        {isEditing ? (
                            editableDetails.openingHours.map((hour, index) => (
                                <div key={index}>
                                    <select value={hour.dayFrom}
                                            onChange={(e) => handleChange('openingHours', e.target.value)}>
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
                                        onChange={(e) => handleChange('openingHours', {...hour, from: e.target.value})}
                                    />
                                    <input
                                        type="time"
                                        value={hour.to}
                                        onChange={(e) => handleChange('openingHours', {...hour, to: e.target.value})}
                                    />
                                </div>
                            ))
                        ) : (
                            funeralHomeDetails.openingHours.map((hour, index) => (
                                <span
                                    key={index}>{`${hour.dayFrom} - ${hour.dayTo} od ${hour.from} do ${hour.to}`}</span>
                            ))
                        )}
                    </p>
                    <p><strong>Email:</strong>
                        {isEditing ? (
                            <input type="email" value={editableDetails.email}
                                   onChange={(e) => handleChange('email', e.target.value)}/>
                        ) : (
                            funeralHomeDetails.email
                        )}
                    </p>
                    <p><strong>Telefon:</strong>
                        {isEditing ? (
                            <input type="tel" value={editableDetails.phone}
                                   onChange={(e) => handleChange('phone', e.target.value)}/>
                        ) : (
                            funeralHomeDetails.phone
                        )}
                    </p>
                    {isEditing ? (
                        <div>
                            <button onClick={handleSave}>Zapisz</button>
                            <button onClick={handleCancel}>Anuluj</button>
                        </div>
                    ) : (
                        <button onClick={handleEdit}>Edytuj</button>
                    )}
                </div>
                <div className="services">
                    <h4>Usługi:</h4>
                    <div className="home-details-item">
                        {funeralHomeDetails.services.map((service, index) => (
                            <div key={index} className="service-item">
                                <p>{service}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setIsEditingServices(true)}>Edytuj uslugi</button>
                </div>
                {isEditingServices && (
                    <Modal
                        services={funeralHomeDetails.services}
                        onSave={handleSaveServices}
                        onCancel={() => setIsEditingServices(false)}
                    />
                )}
                <p>Opis:</p>
                <div className="funeral-home-text">
                    {isEditing ? (
                        <textarea value={editableDetails.description}
                                  onChange={(e) => handleChange('description', e.target.value)}/>
                    ) : (
                        <p className="description">{funeralHomeDetails.description}</p>
                    )}
                </div>
                {isEditing && (
                    <div>
                        <button onClick={handleSave}>Zapisz</button>
                        <button onClick={handleCancel}>Anuluj</button>
                    </div>
                )}
                <div className="reviews">
                    <h4>Opinie:</h4>
                    <div className="reviews-main">
                        {funeralHomeDetails.reviews && funeralHomeDetails.reviews.length > 0 ? funeralHomeDetails.reviews.map((review, i) => (
                            <blockquote key={i} className="funeral-home-text reviews-main-text">
                                <p>{review.date}</p> "{review.text}" - <cite>{review.author}</cite>
                            </blockquote>
                        )) : <p>Brak opinii.</p>}
                    </div>
                </div>
            </div>
            <div className="home-images home-images-client">
                <h2 className="home-img-title">Galeria</h2>
                <div className="selected-image selected-image-client">
                    <Image src={selectedImage} alt="Selected" fill style={{objectFit: 'contain'}}/>
                </div>
                <div className="image-selector image-selector-client">
                    <button onClick={() => handleImageSelection(funeralHomeDetails.images.main)}>Zdjęcie zakładu
                    </button>
                    <button onClick={() => handleImageSelection(funeralHomeDetails.images.hall)}>Zdjęcie sali pożegnań
                    </button>
                    <button onClick={() => handleImageSelection(funeralHomeDetails.images.car)}>Zdjęcie karawanu
                    </button>
                </div>
                <div className="map map-client">
                    <FuneralHomeMap latitude={funeralHomeDetails.latitude} longitude={funeralHomeDetails.longitude}
                                    name={funeralHomeDetails.funeralHomeName}/>
                </div>
            </div>
        </div>
    );
};

export default FuneralHomeDetails;
