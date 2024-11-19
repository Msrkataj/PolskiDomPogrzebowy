import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const NaszaMisjaSecond = ({handleOpenChat}) => {
    const missionHistoryRef = useRef(null);
    const missionTeamRef = useRef(null);
    const missionContactRef = useRef(null);


    useEffect(() => {
        const elements = [missionHistoryRef, missionTeamRef, missionContactRef];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            rootMargin: '-50px 0px -50px 0px',  // Elementy znikają po przekroczeniu 50% ekranu od dołu
            threshold: 0.3  // Elementy pojawiają się, gdy 10% ich powierzchni jest widoczne
        });

        elements.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            elements.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <div className="container">
            <div className="mission">
                <section id="nasza-historia" className="mission-history" ref={missionHistoryRef}>
                    <h1 className="mission-history-title">Nasza Historia</h1>
                    <p className="mission-history-description">
                        Polskidompogrzebowy.pl powstał z potrzeby stworzenia miejsca, gdzie rodziny mogą uzyskać pełne wsparcie w trudnych chwilach.
                        Założyliśmy naszą platformę z myślą o ludziach, którzy chcą w spokoju i godności pożegnać swoich bliskich, korzystając z najlepszych dostępnych usług.
                    </p>
                </section>
                <section className="mission-team" ref={missionTeamRef}>
                    <div className="mission-team-main">
                        <div className="mission-team-main-elemets">
                            <h2>Nasz Zespół</h2>
                            <p>Jesteśmy grupą profesjonalistów z wieloletnim doświadczeniem w branży pogrzebowej.
                                Nasz zespół składa się z doradców, psychologów, prawników oraz ekspertów od organizacji ceremonii.
                                Wszyscy pracujemy z jednym celem – zapewnić naszym klientom jak najlepsze wsparcie.</p>
                        </div>
                        <div className="mission-team-main-elemets">
                            <h2>Współpraca z Zakładami Pogrzebowymi</h2>
                            <p>Polskidompogrzebowy współpracuje z wieloma zakładami pogrzebowymi na terenie całego kraju.
                                Dzięki temu możemy zaoferować naszym klientom szeroki wybór usług i asortymentu,
                                dostosowanych do ich indywidualnych potrzeb.
                                Naszym partnerom zapewniamy transparentność i rzetelność we współpracy.</p>
                        </div>
                    </div>
                </section>
                <div className="mission-contact" ref={missionContactRef}>
                    <div className="mission-contact-title">
                        <h2>Kontakt</h2>
                        <p>Jeśli masz pytania lub potrzebujesz pomocy, skontaktuj się z nami</p>
                    </div>
                    <div className="mission-contact-main">
                        <div className="clip-figure figure-1"></div>
                        <div className="clip-figure figure-2"></div>
                        <div className="clip-figure figure-3"></div>
                        <div className="clip-figure figure-4"></div>
                        <div className="clip-figure figure-5"></div>
                        <div className="clip-figure figure-6"></div>
                        <div className="contact-info">
                            <div href="tel:+48600000000" className="contact-item">
                                <Image src="/assets/icons/phone.png" alt="Telefon" width={50} height={50}/>
                                <p>+48 600 000 000</p>
                            </div>
                            <a className="contact-item" onClick={handleOpenChat}>
                                <Image src="/assets/icons/consultant.png" alt="Czat" width={50} height={50}/>
                                <p>Czat na żywo</p>
                            </a>
                            <div href="mailto:kontakt@pdpogrzebowy.pl" className="contact-item">
                                <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                                <p>kontakt@pdpogrzebowy.pl</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="thank-you">Dziękujemy za zaufanie. Jesteśmy tutaj, aby Ci pomóc.</h2>
            </div>
        </div>
    );
};

export default NaszaMisjaSecond;
