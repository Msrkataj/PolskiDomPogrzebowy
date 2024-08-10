import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { db, storage } from '../../../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import GoogleMapReact from 'google-map-react';
import Link from "next/link";
import useAuthMiddleware from "../../../middleware";
import {useRouter} from "next/router";

const FuneralHomeDetails = () => {
    const [funeralHomeDetails, setFuneralHomeDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [role, setRole] = useState(null);
    const router = useRouter();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedRole = localStorage.getItem('userRole');
            setRole(storedRole);
        }
    }, []);
    console.log(role)
    ;

    useEffect(() => {
        if (role) {
            const userRole = localStorage.getItem('userRole');
            const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
            const currentTime = Date.now();
            const ONE_DAY_MS = 24 * 60 * 60 * 1000;

            console.log('Middleware check:', { userRole, loginTime, currentTime });

            if (!userRole || isNaN(loginTime) || currentTime - loginTime > ONE_DAY_MS) {
                console.log('User not authenticated or session expired');
                router.push('/login');
            } else if (userRole !== role) {
                console.log(`User role does not match: requiredRole(${role}) !== userRole(${userRole})`);
                router.push('/login');
            } else {
                console.log('User authenticated');
            }
        }
    }, [role, router]);
    useEffect(() => {
        const fetchFuneralHomeDetails = async () => {
            if (typeof window !== 'undefined') {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID not found in localStorage.');
                    return;
                }
                try {
                    // Pobierz nazwę wybranego domu pogrzebowego z kolekcji forms
                    const formDoc = await getDoc(doc(db, 'forms', userId));
                    if (formDoc.exists()) {
                        const formData = formDoc.data();
                        const funeralHomeName = formData.funeralHomeName;

                        // Pobierz szczegóły domu pogrzebowego na podstawie nazwy
                        const q = query(collection(db, 'domyPogrzebowe'), where('name', '==', funeralHomeName));
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                            const homeData = querySnapshot.docs[0].data();

                            // Pobierz URL-e zdjęć z Firebase Storage
                            const logoUrl = await getDownloadURL(ref(storage, `${homeData.name}/logo/logo.png`));
                            const mainImageUrl = await getDownloadURL(ref(storage, `${homeData.name}/images/main.webp`));
                            const hallImageUrl = await getDownloadURL(ref(storage, `${homeData.name}/images/hall.webp`));
                            const carImageUrl = await getDownloadURL(ref(storage, `${homeData.name}/images/car.webp`));

                            setFuneralHomeDetails({
                                ...homeData,
                                logoUrl,
                                images: {
                                    main: mainImageUrl,
                                    hall: hallImageUrl,
                                    car: carImageUrl
                                }
                            });
                            setSelectedImage(mainImageUrl);
                        } else {
                            console.error('No such Funeral home found!');
                        }
                    } else {
                        console.error('No such form found!');
                    }
                } catch (error) {
                    console.error('Error fetching Funeral home details:', error);
                }
            }
        };

        fetchFuneralHomeDetails();
    }, []);

    if (!funeralHomeDetails) {
        return <div>Loading...</div>;
    }

    const handleImageSelection = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    return (
        <div className="funeral-home-details">
            <Link className="back-button" href="/client/panel">Cofnij
            </Link>
            <h1>Twój wybrany dom pogrzebowy</h1>
            <div className="home-details">
                <div className="home-details-name">
                    <Image src={funeralHomeDetails.logoUrl} alt={`${funeralHomeDetails.name} logo`} width={50} height={50} />
                    <div className="home-details-name-title">
                        <h3>{funeralHomeDetails.name}</h3>
                        <p>Ocena: {funeralHomeDetails.rating}</p>
                    </div>
                </div>
                <div className="home-details-contact">
                    <p><strong>Adres:</strong> {funeralHomeDetails.address}</p>
                    <p><strong>Godziny otwarcia:</strong> {funeralHomeDetails.hours}</p>
                    <p><strong>Email:</strong> {funeralHomeDetails.email}</p>
                    <p><strong>Telefon:</strong> {funeralHomeDetails.phone}</p>
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
                </div>
                <p>Opis:</p>
                <div className="funeral-home-text">
                    <p className="description">{funeralHomeDetails.description}</p>
                </div>
                <div className="reviews">
                    <h4>Opinie:</h4>
                    <div className="reviews-main">
                        {funeralHomeDetails.reviews.length > 0 ? funeralHomeDetails.reviews.map((review, i) => (
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
                    <Image src={selectedImage} alt="Selected" layout="fill" objectFit="contain"/>
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
                    <GoogleMapReact
                        bootstrapURLKeys={{key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
                        defaultCenter={{lat: funeralHomeDetails.latitude, lng: funeralHomeDetails.longitude}}
                        defaultZoom={15}
                    >
                        <div lat={funeralHomeDetails.latitude} lng={funeralHomeDetails.longitude}
                             className="map-marker">
                            <p className="marker-label">{funeralHomeDetails.name}</p>
                            <Image src="/assets/icons/marker.png" alt="Marker" width={30} height={40}/>
                        </div>
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    );
};

export default FuneralHomeDetails;
