import React, {useEffect, useState} from 'react';
import {db} from '../../../firebase';
import {doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import Link from "next/link";


const SelectedFuneralHome = (success) => {
    const [funeralHome, setFuneralHome] = useState(null);
    const fetchLogoURL = async (funeralHomeName) => {
        try {
            const storage = getStorage();
            const logoRef = ref(storage, `${funeralHomeName}/logo/logo.png`);
            const logoURL = await getDownloadURL(logoRef);
            return logoURL;
        } catch (error) {
            console.error('Błąd pobierania URL do logo: ', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const formId = localStorage.getItem('formId');
            if (formId) {
                try {
                    const formDoc = await getDoc(doc(db, 'forms', formId));
                    if (formDoc.exists()) {
                        const formData = formDoc.data();
                        if (formData && formData.funeralHomeName) {
                            console.log(formData.funeralHomeName)
                            const funeralHomesCollection = collection(db, 'domyPogrzebowe');
                            const q = query(funeralHomesCollection, where('funeralHomeName', '==', formData.funeralHomeName));
                            const querySnapshot = await getDocs(q);
                            if (!querySnapshot.empty) {
                                const funeralHomeData = querySnapshot.docs[0].data();
                                const logoURL = await fetchLogoURL(formData.funeralHomeName);
                                setFuneralHome({...funeralHomeData, logoURL});
                            } else {
                                console.error('Dom pogrzebowy nie znaleziony');
                            }
                        } else {
                            console.error('Nazwa domu pogrzebowego nieznaleziona w danych formularza');
                        }
                    } else {
                        console.error('Formularz nie znaleziony');
                    }
                } catch (error) {
                    console.error('Błąd pobierania danych domu pogrzebowego: ', error);
                }
            } else {
                console.error('ID formularza nie znalezione w localStorage');
            }
        };

        fetchData();
    }, []);
console.log(success.success)

    if (!funeralHome) return <div>Loading...</div>;

    return (
        <div className="funeral">
            {success.success === false ? (
                <div className="funeral-home-container">
                    <div className="funeral-home-card">
                        <div className="funeral-home-info">
                            <img src={funeralHome.logoURL} alt="Logo" className="funeral-home-logo"/>
                            <div className="funeral-home-details">
                                <h2>{funeralHome.funeralHomeName}</h2>
                                <p>Ocena: {funeralHome.rating} ★</p>
                                <p>Adres: {funeralHome.city} {funeralHome.street}</p>
                                <p>Godziny otwarcia: {funeralHome.hours}</p>
                                <p>Email: {funeralHome.email}</p>
                                <p>Telefon: {funeralHome.phone}</p>
                            </div>
                        </div>
                        <Link type="submit" href="/search">
                            <button>Zmień</button>
                        </Link>
                    </div>
                    <div className="contact-consultant">
                        <p>Masz pytania? Napisz do konsultanta na żywo</p>
                        <button className="contact-button">Skontaktuj się</button>
                    </div>
                </div>
            ) : (
                <div className="funeral-home-card">
                    <div className="funeral-home-info">
                        <img src={funeralHome.logoURL} alt="Logo" className="funeral-home-logo"/>
                        <div className="funeral-home-details">
                            <h2>{funeralHome.name}</h2>
                            <p>Ocena: {funeralHome.rating} ★</p>
                            <p>Adres: {funeralHome.address}</p>
                            <p>Godziny otwarcia: {funeralHome.hours}</p>
                            <p>Email: {funeralHome.email}</p>
                            <p>Telefon: {funeralHome.phone}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedFuneralHome;
