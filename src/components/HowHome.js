import React from 'react';
import Image from 'next/image';
import patternBg from '../../public/assets/images/chessboard.webp';
import Link from "next/link";
import dynamic from "next/dynamic"; // Importowanie tła

const HowItWorks = () => {
    const steps = [
        {
            step: "Krok 1:",
            title: "Zgłoszenie śmierci",
            description: "Podaj podstawowe informacje oraz wybierz miejsce zgonu (dom, szpital). Wybieramy zakład pogrzebowy z naszej bazy, który znajduje się najbliżej Twojej lokalizacji.",
            icon: "/assets/imgIcon/death-notification.png",
        },
        {
            step: "Krok 2:",
            title: "Wypełnienie formularza",
            description: "Uzupełnij formularz z szczegółowymi danymi zmarłego, dokumenty oraz informacje o preferowanej formie pogrzebu. Możesz również przesłać niezbędne dokumenty online.",
            icon: "/assets/imgIcon/form.png",
        },
        {
            step: "Krok 3:",
            title: "Załatwianie formalności",
            description: "Nasza platforma pomoże Ci w załatwieniu wszystkich formalności, takich jak uzyskanie aktów zgonu, załatwienie ZUS/KRUS/MSWiA oraz pełnomocnictwa. Wysyłamy potrzebne druki i pomagamy w ich wypełnieniu.",
            icon: "/assets/imgIcon/formalities.png",
        },
        {
            step: "Krok 4:",
            title: "Wybór asortymentu",
            description: "Przeglądaj gotowe zestawy trumien, urn i innych akcesoriów pogrzebowych. Nasz system może zaproponować asortyment na podstawie poprzednich preferencji oraz dostępnego budżetu.",
            icon: "/assets/imgIcon/assortment.png",
        },
        {
            step: "Krok 5:",
            title: "Organizacja ceremonii",
            description: "Wybierz rodzaj ceremonii (świecka, religijna) oraz mistrza ceremonii. Zdecyduj o dodatkowych elementach, takich jak świece, muzyka, ubranie zmarłego oraz możliwość odczytania mowy pożegnalnej.",
            icon: "/assets/imgIcon/ceremony.png",
        },
        {
            step: "Krok 6:",
            title: "Potwierdzenie i realizacja",
            description: "Po złożeniu wszystkich informacji, nasz zespół skontaktuje się z Tobą w celu potwierdzenia szczegółów. Wszystkie wybrane elementy zostaną zrealizowane zgodnie z Twoimi życzeniami.",
            icon: "/assets/imgIcon/confirmation.png",
        },
    ];

    return (
        <div id="how-it-works" className="how-it-works-container">
            <section className="how-it-works-section">
                <p>Jak to działa?</p>
                <h2>Wsparcie na każdym etapie organizacji pogrzebu</h2>
                <p>Dzięki naszemu systemowi, dobierzemy dla Ciebie odpowiedni dom pogrzebowy w Twojej okolicy...</p>
                <div className="steps-grid">
                    {steps.map((item, index) => (
                        <div key={index} className="step-card">
                            <div className="step-header">{item.step}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <div className="image-wrapper">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={150}
                                    height={150}
                                    style={{ objectFit: 'contain' }}
                                    loading="lazy"                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="action-button">
                    <Link href={"/szukaj"} className="change-button">Przekonaj się jakie to łatwe</Link>
                </div>
            </section>
        </div>
    );
};

export default dynamic (() => Promise.resolve(HowItWorks), {ssr: false})


