import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import phoneIcon from '../../public/assets/icons/phone.png';
import consultantIcon from '../../public/assets/icons/consultant.png';
import {useRouter} from 'next/router';
import Autosuggest from 'react-autosuggest';
import Link from "next/link";
import dynamic from "next/dynamic";
import heartIcon from "../../public/assets/icons/heart.png";

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
    const [placeholder, setPlaceholder] = useState('WPISZ MIEJSCOWOŚĆ ORGANIZACJI POGRZEBU');

    const handleSearch = () => {
        if (location.trim()) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('location', location);
            }
            router.push(`/szukaj?location=${location}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    useEffect(() => {
        const updatePlaceholder = () => {
            if (window.innerWidth < 1300 && window.innerWidth > 1024 || window.innerWidth < 700) {
                setPlaceholder('WPISZ MIEJSCOWOŚĆ');
            }
                // if (window.innerWidth < 600 ) {
                //     setPlaceholder('WPISZ MIEJSCOWOŚĆ');
            // }
            else {
                setPlaceholder('WPISZ MIEJSCOWOŚĆ ORGANIZACJI POGRZEBU');
            }
        };

        // Ustaw placeholder przy załadowaniu i po zmianie rozmiaru
        updatePlaceholder();
        window.addEventListener('resize', updatePlaceholder);

        // Usunięcie listenera przy odmontowaniu komponentu
        return () => window.removeEventListener('resize', updatePlaceholder);
    }, []);
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

    const onChange = (event, {newValue}) => {
        setLocation(newValue);
    };

    const onSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder, // Użycie dynamicznego placeholdera
        value: location,
        onChange,
        onKeyDown: handleKeyDown,
    };


    return (
        <>
            <div className="search-component">
                {/* Replace video-background and intro-text with the image */}
                <div className="main">
                    <div className="main-banner">
                        <h1>Z NAMI ZORGANIZUJESZ ZDALNIE POGRZEB, Z DOMAMI POGRZEBOWYMI W TWOIM MIEŚCIE</h1>
                    </div>
                    <div className="main-stage">
                        <div className="main-stage-mobile">
                            <div className="main-stage-section">
                                <h2>FORMALNOSCI</h2>
                                <Image src={"/assets/home/formalnosci.webp"} alt="formalnosci" width={230} height={200}
                                       loading="lazy"/>
                            </div>
                            <div className="main-stage-next">
                                <Image className="number" src={"/assets/home/jeden.webp"} alt="jeden" width={60}
                                       height={60} loading="lazy"/>
                                <Image src={"/assets/home/strzalka.webp"} alt="jeden" width={100} height={40}
                                       loading="lazy"/>
                            </div>
                            <div className="main-stage-section">
                                <h2>ORGANIZACJA</h2>
                                <Image src={"/assets/home/organizacja.webp"} alt="organizacja" width={230} height={200}
                                       loading="lazy"/>
                            </div>
                        </div>
                        <div className="main-stage-mobile">
                            <div className="main-stage-next">
                                <Image className="number" src={"/assets/home/dwa.webp"} alt="dwa" width={60} height={60}
                                       loading="lazy"/>
                                <Image className="disable" src={"/assets/home/strzalka.webp"} alt="dwa" width={100} height={40}
                                       loading="lazy"/>
                            </div>
                            <div className="main-stage-section">
                                <h2>WYBÓR ASORTYMENTU</h2>
                                <Image src={"/assets/home/asortyment.webp"} alt="asortyment" width={230} height={200}
                                       loading="lazy"/>
                            </div>
                            <div className="main-stage-next">
                                <Image className="number" src={"/assets/home/trzy.webp"} alt="trzy" width={60}
                                       height={60}
                                       loading="lazy"/>
                                <Image src={"/assets/home/strzalka.webp"} alt="trzy" width={100} height={40}
                                       loading="lazy"/>
                            </div>
                            <div className="main-stage-section">
                                <h2>PRZEJRZYSTE CENY</h2>
                                <Image src={"/assets/home/ceny.webp"} alt="ceny" width={230} height={200}
                                       loading="lazy"/>
                            </div>
                        </div>

                        <div className="main-stage-next">
                            <Image className="number" src={"/assets/home/czwarta.webp"} alt="czwarta" width={60}
                                   height={60} loading="lazy"/>
                            <Image className="disable" src={"/assets/home/strzalka.webp"} alt="czwarta" width={100}
                                   height={40}
                                   loading="lazy"/>
                        </div>
                        <div className="main-stage-section">
                            <h2 className="tittle-realiz" >REALIZACJA</h2>
                            <Image src={"/assets/home/realizacja.webp"} alt="realizacja" width={230} height={200}
                                   loading="lazy"/>
                        </div>
                    </div>
                    <div className="floating-sign">ZACZNIJ TUTAJ</div>
                    <div className="main-title">
                        <div className="main-title-text main-title-left">
                            <h3>FORMALNOŚCI ORGANIZACJA POGRZEBU<br/> I WYBÓR ASORTYMENTU ZDALNIE -<br/>
                                BEZ WYCHODZENIA Z DOMU</h3>
                        </div>
                        <div className="main-title-text main-title-right">
                            <h3>WIESZ ZA CO PŁACISZ - PRZEJRZYSTE CENY <br/>I BUDŻETY DOSTAOSOWANE POD KLIENTA</h3>
                        </div>
                    </div>
                    <div className="input-overlay">
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
                </div>
                <div className="contact-options flex-center">
                    <div className="option-main">
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
                            <div className="option-select flex-mobile" onClick={handleOpenChat}>
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
            </div>
            <div className="home-title">
                <h2>
                    Oszczędź czas i załatw wszystko z domu, właśnie tutaj
                    <span className="arrow-icon arrow-icon-top"></span>
                </h2>
            </div>
        </>
    );
};

export default dynamic(() => Promise.resolve(SearchComponent), {ssr: false})
