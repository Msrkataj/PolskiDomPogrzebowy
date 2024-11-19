import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Link from "next/link";

const Join = () => {
    const [formsData, setFormsData] = useState({
        city: '',
        email: '',
        street: '',
        funeralHomeName: '',
        postalCode: '',
        phone: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormsData({
            ...formsData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'application'), formsData);
            setMessage('Twoje zgłoszenie zostało pomyślnie wysłane. Dostaniesz potwierdzenie drogą mailową lub telefonicznie');
            setTimeout(() => setMessage(''), 20000);
            setFormsData({
                city: '',
                email: '',
                street: '',
                funeralHomeName: '',
                postalCode: '',
                phone: ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div className="join-container">
            <section className="join__partner-section">
                <h1 className="join__partner-title">Zostań naszym partnerem</h1>
                <p className="join__partner-description">
                    Współpraca z nami to szansa na rozwój i zdobycie nowych klientów. Jesteśmy liderem na rynku usług
                    pogrzebowych i stale poszukujemy nowych partnerów. Dołącz do nas i korzystaj z szerokiego wsparcia
                    marketingowego, nowoczesnych narzędzi oraz naszego doświadczenia.
                </p>
                <p className="join__partner-description">
                    Nasza sieć partnerów to solidne wsparcie i nowe możliwości rozwoju. Oferujemy elastyczne warunki
                    współpracy, które dostosujemy do Twoich potrzeb. Zyskaj pewność, że Twoja firma będzie się rozwijać
                    w odpowiednim kierunku.
                </p>
            </section>
            <section className="benefits-section parallax-bg" id="benefits">
                <h2 id="korzysci" className="benefits-section__title">Korzyści ze współpracy z nami</h2>
                <div className="benefits-section__grid">
                    {[
                        {
                            title: "Wsparcie marketingowe",
                            description: "Otrzymaj dostęp do naszych zasobów marketingowych, w tym materiałów kampanijnych i możliwości współbrendingu, aby zwiększyć widoczność swojej marki."
                        },
                        {
                            title: "Rozszerzony zasięg klientów",
                            description: "Skorzystaj z naszej szerokiej sieci klientów i profesjonalistów branżowych, aby dotrzeć do szerszej publiczności i zwiększyć swoją obecność na rynku."
                        },
                        {
                            title: "Stałe szkolenia",
                            description: "Pozostań na bieżąco dzięki naszym stałym programom szkoleniowym, zaprojektowanym tak, abyś mógł konkurować i być na bieżąco."
                        },
                        {
                            title: "Wzrost dochodów",
                            description: "Zwiększ swoje dochody dzięki naszym lukratywnym umowom partnerskim, zapewniającym stabilny strumień przychodów."
                        },
                        {
                            title: "Innowacje i technologie",
                            description: "Zyskaj dostęp do najnowszych technologii i innowacyjnych rozwiązań, które napędzają rozwój."
                        },
                        {
                            title: "Dedykowane wsparcie",
                            description: "Nasz zespół wsparcia jest zawsze gotowy, aby pomóc Ci w przypadku jakichkolwiek wyzwań, zapewniając płynną współpracę."
                        },
                    ].map((benefit, index) => (
                        <div key={index} className="benefit-item">
                            <h3 className="benefit-item__title">{benefit.title}</h3>
                            <p className="benefit-item__description">{benefit.description}</p>
                        </div>
                    ))}
                </div>
                <div className="join-container-form">
                    <Link href="/dolacz-formularz" ><br/>
                        Wyślij wniosek</Link>
                </div>
            </section>
        </div>
    );
};

export default Join;
