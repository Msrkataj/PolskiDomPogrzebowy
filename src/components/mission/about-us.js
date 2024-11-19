import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const NaszaMisja = () => {
    const missionRef = useRef(null);
    const imageSectionRef = useRef(null);
    const valuesRef = useRef(null);
    const missionOurImageRef = useRef(null);
    const valuesElementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            rootMargin: '-50px 0px -50px 0px', // Element will start disappearing 50px before it leaves the viewport
            threshold: 0.1  // Trigger when 10% of the element is visible
        });

        if (missionRef.current) observer.observe(missionRef.current);
        if (imageSectionRef.current) observer.observe(imageSectionRef.current);
        if (valuesRef.current) observer.observe(valuesRef.current);
        if (missionOurImageRef.current) observer.observe(missionOurImageRef.current);

        // Observe each value element separately
        valuesElementsRef.current.forEach(element => {
            if (element) observer.observe(element);
        });

        return () => {
            // Disconnect observer on component unmount
            observer.disconnect();
        };
    }, []);

    return (
        <div className="container">
            <div id="o-nas" className="mission">
                <section className="mission-section" ref={missionRef}>
                    <h1 className="mission-section-title">O nas</h1>
                    <p className="mission-section-description">
                        Polskidompogrzebowy.pl to innowacyjny pomysł, który ma połączyć ze sobą zakłady pogrzebowe z całej Polski.
                        Ma pomóc w usprawnieniu organizacji pogrzebów i wsparciu rodzin w trudnych chwilach.
                        Jesteśmy tu, aby załatwić większość formalności za Ciebie,
                        a nasza strona jest całkowicie darmowa dla klientów.
                        Jako pierwsi jesteśmy przewodnikiem w kwestii, co zrobić po śmierci bliskiej osoby.
                        Na początkowym etapie nasza platforma ma na celu wizualizację i pomoc w organizacji pogrzebu
                        oraz wsparcie rodzin.
                    </p>
                </section>
                <section className="image-section" ref={imageSectionRef}>
                    <Image
                        src="/assets/images/panoramiczne.webp"
                        alt="panoramiczne"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </section>
                <section id="nasza-misja" className="mission-our">
                    <div className="mission-our-main" ref={missionOurImageRef}>
                        <h2>Nasza misja</h2>
                        <p>Naszą misją jest zapewnienie rodzinom dostępu do najwyższej jakości usług pogrzebowych w całej Polsce.
                            Współpracujemy z zaufanymi zakładami pogrzebowymi, aby zapewnić profesjonalną i godną organizację ceremonii pożegnalnych.</p>
                    </div>
                    <div className="mission-our-image" >
                        <Image
                            src="/assets/images/our-mission.webp"
                            alt="nasza misja"
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </section>
                <section id="nasze-wartosci" className="mission-values" ref={valuesRef}>
                    <h2>Nasze wartości</h2>
                    <div className="mission-values-main">
                        {[
                            {
                                text: 'Empatia',
                                href: 'empatia',
                                description: 'Rozumiemy, jak trudny jest to czas dla naszych klientów.'
                            },
                            {
                                text: 'Profesjonalizm',
                                href: 'professional',
                                description: 'Współpracujemy tylko z doświadczonymi i sprawdzonymi zakładami pogrzebowymi.'
                            },
                            {
                                text: 'Dostępność',
                                href: 'dostepnosc',
                                description: 'Nasza platforma jest dostępna 24/7, aby zawsze być wsparciem dla naszych klientów.'
                            },
                            {
                                text: 'Transparentność',
                                href: 'transparent',
                                description: 'Zapewniamy jasne i przejrzyste informacje na każdym etapie organizacji pogrzebu.'
                            }
                        ].map((value, index) => (
                            <div className="mission-values-main-element" key={index}
                                 ref={(el) => valuesElementsRef.current[index] = el}>
                                <div className="icon-container">
                                    <Image src={`/assets/icons/${value.href.toLowerCase()}.png`} alt={value.text}
                                           width={50} height={50}/>
                                </div>
                                <p><strong>{value.text}:<br/></strong> {value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NaszaMisja;
