import React, { useState } from 'react';
import Image from 'next/image';
import phoneIcon from '../../public/assets/icons/phone.png';
import consultantIcon from '../../public/assets/icons/consultant.png';
import { useRouter } from 'next/router';
import Autosuggest from 'react-autosuggest';
import Link from "next/link";
import dynamic from "next/dynamic";

const cities = [
    'Warszawa', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok',
    'Katowice', 'Gdynia', 'Częstochowa', 'Radom', 'Toruń', 'Sosnowiec', 'Rzeszów', 'Kielce', 'Gliwice', 'Zabrze',
    'Olsztyn', 'Bielsko-Biała', 'Bytom', 'Zielona Góra', 'Rybnik', 'Ruda Śląska', 'Opole', 'Tychy', 'Gorzów Wielkopolski',
    'Dąbrowa Górnicza', 'Elbląg', 'Płock', 'Wałbrzych', 'Włocławek', 'Tarnów', 'Chorzów', 'Koszalin', 'Kalisz', 'Legnica',
    'Grudziądz', 'Słupsk', 'Jaworzno', 'Jastrzębie-Zdrój', 'Nowy Sącz', 'Jelenia Góra', 'Siedlce', 'Mysłowice', 'Piła',
    'Ostrów Wielkopolski', 'Lubin', 'Gniezno', 'Suwałki', 'Głogów', 'Siemianowice Śląskie', 'Ostrowiec Świętokrzyski',
    'Stargard', 'Pabianice', 'Leszno', 'Zamość', 'Zawiercie', 'Chełm', 'Biała Podlaska', 'Tarnowskie Góry', 'Pruszków',
    'Kędzierzyn-Koźle', 'Łomża', 'Ełk', 'Piotrków Trybunalski', 'Inowrocław', 'Bełchatów', 'Lubartów', 'Ostrowiec Świętokrzyski',
    'Racibórz', 'Świdnica', 'Starachowice', 'Tczew', 'Kutno', 'Przemyśl', 'Mielec', 'Bielawa', 'Tarnobrzeg',
    'Ciechanów', 'Otwock', 'Mińsk Mazowiecki', 'Nowa Sól', 'Świdnik', 'Kołobrzeg', 'Wejherowo', 'Żory', 'Skarżysko-Kamienna',
    'Krosno', 'Knurów', 'Bartoszyce', 'Rumia', 'Jarosław', 'Ząbki', 'Żary', 'Dębica', 'Świnoujście', 'Śrem',
    'Sanok', 'Brodnica', 'Łuków', 'Lębork', 'Giżycko', 'Świecie', 'Kościerzyna', 'Ostróda', 'Sopot', 'Sochaczew',
    'Zgorzelec', 'Malbork', 'Mława', 'Luboń', 'Kraśnik', 'Police', 'Iława', 'Zielonka', 'Chrzanów', 'Sandomierz',
    'Trzebinia', 'Żuromin', 'Wołomin', 'Łańcut', 'Brzeg', 'Łowicz', 'Grajewo', 'Oborniki', 'Dzierżoniów', 'Świebodzin',
    'Gostynin', 'Augustów', 'Wadowice', 'Radzionków', 'Szczecinek', 'Września', 'Słubice', 'Choszczno', 'Pszczyna', 'Kobyłka',
    'Nowy Tomyśl', 'Koło', 'Kluczbork', 'Rawa Mazowiecka', 'Bytów', 'Łazy', 'Piekary Śląskie', 'Nowy Dwór Mazowiecki',
    'Radomsko', 'Środa Wielkopolska', 'Szamotuły', 'Bochnia', 'Łask', 'Wieluń', 'Turek', 'Lubliniec', 'Bielsk Podlaski',
    'Złotów', 'Namysłów', 'Opoczno', 'Nakło nad Notecią', 'Świebodzice', 'Gryfino', 'Głowno', 'Kętrzyn', 'Pabianice',
    'Nowogard', 'Lubań', 'Koluszki', 'Łapy', 'Gorlice', 'Płońsk', 'Tomaszów Lubelski', 'Mogilno', 'Słomniki', 'Łosice',
    'Pułtusk', 'Sieradz', 'Łęczyca', 'Włodawa', 'Pisz', 'Miechów', 'Krotoszyn', 'Gryfice', 'Nysa', 'Rogów',
    'Ozorków', 'Kobyłka', 'Czarnków', 'Strzelce Opolskie', 'Łęczna', 'Biała Rawska', 'Konstantynów Łódzki', 'Ząbkowice Śląskie',
    'Wronki', 'Piastów', 'Józefów', 'Jarocin', 'Wołów', 'Ślesin', 'Poddębice', 'Brzesko', 'Lubawa', 'Radzymin',
    'Piaseczno', 'Węgrów', 'Kozienice', 'Milanówek', 'Jedwabne', 'Nowa Ruda', 'Międzyrzecz', 'Bojanowo', 'Działdowo', 'Łaskarzew'
];


const SearchComponent = ({handleOpenChat}) => {
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
        return inputLength < 2 ? [] : cities.filter(city =>
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
                        <p>Zadzwoń, pomożemy w każdym etapie ceremonii pogrzebowej</p>
                        <div className="option-select">
                            <a href="tel:+48600000000">
                                <Image
                                    src={phoneIcon}
                                    alt="Phone"
                                    width={32}
                                    height={32}
                                    sizes="(max-width: 768px) 100vw, 32px"
                                />
                                <p>+48 600 000 000</p>
                            </a>
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-background"></div>
                        <p>Skontaktuj się z Twoim doradcą</p>
                        <div className="option-select" onClick={handleOpenChat}>
                            <div>
                                <Image
                                    src={consultantIcon}
                                    alt="Consultant"
                                    width={32}
                                    height={32}
                                    sizes="(max-width: 768px) 100vw, 32px"
                                />
                                <p>Doradca</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-title">
                <h2>Oszczędź czas i załatw wszystko z domu, właśnie tutaj
                    <span className="arrow-icon arrow-icon-top"></span>
                </h2>
            </div>
        </>
    );
};

export default dynamic (() => Promise.resolve(SearchComponent), {ssr: false})
