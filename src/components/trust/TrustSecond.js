import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import Link from "next/link";
import Image from 'next/image';

const TrustedFuneralHomes = () => {
    const [funeralHomes, setFuneralHomes] = useState([]);
    const [groupedFuneralHomes, setGroupedFuneralHomes] = useState([]);

    useEffect(() => {
        const fetchFuneralHomes = async () => {
            const querySnapshot = await getDocs(collection(db, 'domyPogrzebowe'));
            const funeralHomesData = [];
            querySnapshot.forEach((doc) => {
                const funeralHome = doc.data();
                funeralHomesData.push(funeralHome);
            });
            setFuneralHomes(funeralHomesData);
        };
        fetchFuneralHomes();
    }, []);

    useEffect(() => {
        const updateGrouping = () => {
            const screenWidth = window.innerWidth;
            const groupSize = screenWidth < 500 ? 1 : 2;
            const grouped = [];

            for (let i = 0; i < funeralHomes.length; i += groupSize) {
                grouped.push(funeralHomes.slice(i, i + groupSize));
            }

            setGroupedFuneralHomes(grouped);
        };

        updateGrouping();
        window.addEventListener('resize', updateGrouping);

        return () => {
            window.removeEventListener('resize', updateGrouping);
        };
    }, [funeralHomes]);

    const AutoplaySlider = withAutoplay(AwesomeSlider);


    return (
        <div className="container funeral-homes">
            <div id="zaufanie" className="funeral-homes-section">
                <h2 id="#zaufanie" className="review-title">Domy Pogrzebowe, które nam zaufały</h2>
                <p className="review-description">Współpracujemy tylko z najlepszymi. Jesteśmy dumni, że nasza misja zapewnienia najwyższej jakości usług pogrzebowych spotkała się z uznaniem wiodących domów pogrzebowych w kraju. Zaufanie, jakim nas obdarzyli, jest dla nas najlepszym dowodem na to, że nasza praca ma sens. Poniżej znajdą Państwo listę domów pogrzebowych, które wybrały nas jako partnera w realizacji tej ważnej misji.</p>
                <AutoplaySlider
                    animation="cubeAnimation"
                    play={true}
                    cancelOnInteraction={false}
                    interval={4000}
                >
                    {groupedFuneralHomes.map((group, index) => (
                        <div key={index} className="funeral-home-group">
                            {group.map((home, idx) => (
                                <div key={idx} className="funeral-home-card">
                                    {home.logoUrl ? (
                                        <Image
                                            src={home.logoUrl}
                                            alt={home.funeralHomeName}
                                            width={100} // Podaj odpowiednią szerokość
                                            height={100} // Podaj odpowiednią wysokość
                                            className="funeral-home-logo"
                                            style={{ objectFit: 'contain' }} // Używaj stylu zamiast legacy prop
                                        />
                                    ) : (
                                        <div className="funeral-home-placeholder">Brak zdjęcia</div>
                                    )}
                                    <p className="funeral-home-name">{home.funeralHomeName}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </AutoplaySlider>
            </div>
            <div id="dolacz" className="funeral-homes-join review-section">
                <h2 className="review-title" >Dołącz do nas</h2>
                <p className="review-description">Jeśli chcesz dołączyć do grona naszych zaufanych partnerów i zapewnić swoim klientom najwyższą jakość obsługi, skontaktuj się z nami</p>
                <button>
                    <Link href="/join">
                        Złóż wniosek
                    </Link>
                </button>
            </div>

        </div>
    );
};

export default TrustedFuneralHomes;
