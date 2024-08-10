import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import phoneIcon from '../../public/assets/icons/phone-grey.png';
import consultantIcon from '../../public/assets/icons/consultant.png';
import { useRouter } from 'next/router';
import Autosuggest from 'react-autosuggest';

// Lista miast
const cities = [
    'Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok',
    'Katowice', 'Gdynia', 'Częstochowa', 'Radom', 'Toruń', 'Sosnowiec', 'Rzeszów', 'Kielce', 'Gliwice', 'Zabrze',
    'Olsztyn', 'Bielsko-Biała', 'Bytom', 'Zielona Góra', 'Rybnik', 'Ruda Śląska', 'Opole', 'Tychy', 'Gorzów Wielkopolski',
    'Dąbrowa Górnicza', 'Elbląg', 'Płock', 'Wałbrzych', 'Włocławek', 'Tarnów', 'Chorzów', 'Koszalin', 'Kalisz', 'Legnica',
    'Grudziądz', 'Słupsk', 'Jaworzno', 'Jastrzębie-Zdrój', 'Nowy Sącz', 'Jelenia Góra', 'Siedlce', 'Mysłowice', 'Piła'
];

const SearchComponent = () => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

    const handleSearch = () => {
        if (location.trim()) {
            localStorage.setItem('location', location);
            router.push(`/search?location=${location}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : cities.filter(city =>
            city.toLowerCase().startsWith(inputValue)
        );
    };

    const getSuggestionValue = (suggestion) => suggestion;

    const renderSuggestion = (suggestion) => (
        <div className="suggestion-item">
            {suggestion}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setLocation(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Wpisz miejscowość',
        value: location,
        onChange,
        onKeyDown: handleKeyDown
    };

    return (
        <>
            <div className="search-component">
                <div className="video-background">
                    <video autoPlay loop muted>
                        <source src="/assets/background-movie.mp4" type="video/mp4" />
                    </video>
                </div>
                <h1 className="intro-text">
                    Wiemy jak ważne jest wsparcie w tym trudnym momencie, pomożemy zorganizować wszystkie formalności,
                    całą ceremonię bez wychodzenia z domu.
                </h1>
                <div className="search-box">
                    <p>Wyszukaj dom pogrzebowy w Twojej miejscowości</p>
                    <div className="autosuggest-container">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
                    </div>
                    <button onClick={handleSearch}>Znajdź dom</button>
                </div>
                <div className="contact-options">
                    <div className="option">
                        <p>Zadzwoń do nas, przeprowadzimy Cię przez cały proces</p>
                        <div className="option-select">
                            <a href="tel:+48600000000">
                                <Image src={phoneIcon} alt="Phone" width={32} height={32} />
                                <p>+48 600 000 000</p>
                            </a>
                        </div>
                    </div>
                    <div className="option">
                        <p>Preferujesz chat? Skontaktuj się z naszym konsultantem</p>
                        <div className="option-select">
                            <a href="/chat">
                                <Image src={consultantIcon} alt="Consultant" width={32} height={32} />
                                <p>Konsultant</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-title">
                <h2>Oszczędź czas i załatw wszystko z domu, właśnie tutaj</h2>
            </div>
        </>
    );
};

export default SearchComponent;
