import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import AuthGuard from "@/components/panel/AuthGuard";  // Poprawny import z next/image

    const FuneralHomesTable = () => {
        const [funeralHomes, setFuneralHomes] = useState([]);
        const router = useRouter();
        const [filteredHomes, setFilteredHomes] = useState([]);
        const [city, setCity] = useState('');
        const [availableCities, setAvailableCities] = useState([]);

        useEffect(() => {
            const fetchFuneralHomes = async () => {
                const querySnapshot = await getDocs(collection(db, 'domyPogrzebowe'));
                const homesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFuneralHomes(homesData);
                setFilteredHomes(homesData);

                const cities = [...new Set(homesData.map(home => home.city))];
                setAvailableCities(cities);
            };

            fetchFuneralHomes();
        }, []);

        const handleCityChange = (e) => {
            setCity(e.target.value);
        };

        const handleSearch = () => {
            if (city) {
                const filtered = funeralHomes.filter(home => home.city.toLowerCase() === city.toLowerCase());
                setFilteredHomes(filtered.length ? filtered : []);
            } else {
                setFilteredHomes(funeralHomes);
            }
        };

    const handleViewDetails = (homeId) => {
        router.push(`/admin/home-details?homeId=${homeId}`);
    };
    const handleViewDetailsAssortment = (homeId) => {
        router.push(`/admin/assortment?homeId=${homeId}`);
    };
    const handleViewReviews = (homeId) => {
        router.push(`/admin/reviews?homeId=${homeId}`);
    };
    const handleAddNewHome = () => {
        router.push('/admin/new-funerals');
    };

    return (
        <div className="funeralHomesContainer">

            <h2>Lista Domów Pogrzebowych</h2>
            <button onClick={handleAddNewHome} className="addNewHomeButton">
                Dodaj Nowy Dom Pogrzebowy
            </button>
            <div className="funeral-homes__filter">
                <label className="funeral-homes__filter-label" htmlFor="cityFilter">Miasto:</label>
                <select
                    id="cityFilter"
                    className="funeral-homes__filter-select"
                    value={city}
                    onChange={handleCityChange}
                >
                    <option value="">Wybierz miasto</option>
                    {availableCities.length ? availableCities.map((cityOption, index) => (
                        <option key={index} value={cityOption}>{cityOption}</option>
                    )) : <option value="">Brak dostępnych miast</option>}
                </select>
                <button onClick={handleSearch} className="funeral-homes__search-button">Szukaj</button>
            </div>
            <table className="funeralHomesTable">
                <thead>
                <tr>
                    <th>Logo</th>
                    <th>Nazwa Domu Pogrzebowego</th>
                    <th>Właściciel</th>
                    <th>Email</th>
                    <th>Adres</th>
                    <th>Telefon</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {filteredHomes.length > 0 ? filteredHomes.map((home) => (
                    <tr key={home.id}>
                        <td>
                            {home.logoUrl ? (
                                <Image
                                    src={home.logoUrl}
                                    alt="Logo"
                                    width={100}  // Szerokość obrazu
                                    height={100}  // Wysokość obrazu
                                    className="homeLogo"
                                    style={{ objectFit: 'contain' }}  // Używaj stylów CSS w `style` zamiast `objectFit`
                                />
                            ) : (
                                'Brak logo'
                            )}
                        </td>
                        <td>{home.funeralHomeName}</td>
                        <td>{home.ownerName}</td>
                        <td>{home.email}</td>
                        <td>{`${home.city}, ${home.street}, ${home.postalCode}`}</td>
                        <td>{home.phone}</td>
                        <td>
                            <button onClick={() => handleViewDetails(home.id)} className="viewDetailsButton">
                                <FontAwesomeIcon icon={faEye}/> Zobacz szczegóły
                            </button>
                            <button onClick={() => handleViewDetailsAssortment(home.id)} className="viewDetailsButton">
                                <FontAwesomeIcon icon={faEye}/> Zobacz asortyment
                            </button>
                            <button onClick={() => handleViewReviews(home.id)} className="viewDetailsButton">
                                <FontAwesomeIcon icon={faEye}/> Zobacz opinie
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="7" className="funeral-homes__no-data">Brak danych</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
    };
const FuneralHomesTableWithAuth = () => (
    <AuthGuard>
        <FuneralHomesTable />
    </AuthGuard>
);

export default FuneralHomesTableWithAuth;
