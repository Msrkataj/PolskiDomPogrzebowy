import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { db, storage } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from '@/components/funeral/EditServicesModal';
import FuneralHomeMap from './FuneralHomeMap'; // Poprawny import
import fotoImage from '../../../public/assets/images/mistrz-ceremonii.webp';
import StarRating from "@/components/search/StarRating";
const FuneralHomeDetails = () => {
    const [funeralHomeDetails, setFuneralHomeDetails] = useState(null);
    const [editableDetails, setEditableDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingServices, setIsEditingServices] = useState(false);
    const router = useRouter();

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
            return fotoImage;
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
    const handleAddOpeningHour = () => {
        const newOpeningHours = [
            ...editableDetails.openingHours,
            {dayFrom: 'Poniedziałek', dayTo: 'Poniedziałek', from: '08:00', to: '16:00'}
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
                    {isEditing && <button onClick={handleAddOpeningHour}>Dodaj kolejne godzinny otwarcia</button>}
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
                <div className="services services-details">
                    <h4>Usługi:</h4>
                    <div className="home-details-item">
                        {funeralHomeDetails.services.map((service, index) => (
                            <div key={index} className="service-item">
                                <p>{service}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setIsEditingServices(true)}>Edytuj usługi</button>
                </div>
                {isEditingServices && (
                    <Modal
                        services={funeralHomeDetails.services}
                        onSave={handleSaveServices}
                        onCancel={() => setIsEditingServices(false)}
                    />
                )}
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
                {isEditing && (
                    <div>
                        <button onClick={handleSave}>Zapisz</button>
                        <button onClick={handleCancel}>Anuluj</button>
                    </div>
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
                <div className="map map-client">
                    <FuneralHomeMap latitude={funeralHomeDetails.latitude} longitude={funeralHomeDetails.longitude}
                                    name={funeralHomeDetails.funeralHomeName}/>
                </div>
            </div>
        </div>
    );
};

export default FuneralHomeDetails;
