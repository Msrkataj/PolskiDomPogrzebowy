import React from 'react';
import Image from 'next/image';
import phoneIcon from '../../public/assets/icons/phone.png';
import data from '../data/data.json';
import Link from "next/link";

const SupportHome = () => {
    const supportItems = data.supportItems;

    return (
        <div id="pomoc-na-ktora-mozesz-liczyc" className="support-component">
            <h2>Pomoc, na którą możesz liczyć</h2>
            <div className="support-items">
                {supportItems.map((item, index) => (
                    <div key={index} className="support-item">
                        <a href={item.anchor}>
                            <Image src={item.icon} alt={item.text} width={40} height={40}/>
                            <p>{item.text}</p>
                        </a>
                    </div>
                ))}
            </div>
            <div className="contact-call">
                <h3>Zadzwoń do nas, my zorganizujemy pogrzeb</h3>
                <a href="tel:+48600000000">
                    <Image src={phoneIcon} alt="Phone" width={32} height={32}/>
                    <p>+48 600 000 000</p>
                </a>
            </div>
            <p>lub</p>
            <div className="start-yourself">
                <Link href="/search">
                    <h3 href="#start">Zacznij tutaj samodzielnie, my dalej wszystko zorganizujemy</h3>
                </Link>
            </div>
            <div className="information">
                <div className="info-icon"></div>
                <div className="info-text">
                    <h3>Wiemy, jak trudne jest udanie się osobiście do zakładu pogrzebowego.
                        Dzięki naszemu portalowi możesz połączyć się z najbardziej profesjonalnym zakładem pogrzebowym
                        bez wychodzenia z domu.
                        Zapewniamy najlepszy asortyment w specjalnej cenie, współpracując tylko z doświadczonymi
                        zakładami.
                        U nas załatwisz wszystko, łącznie z dokumentami i wyborem asortymentu, nie opuszczając
                        domu.</h3>
                    <a href="#how-it-works" className="check-how-it-works">
                        Sprawdź jak to działa
                        <span className="arrow-icon"></span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SupportHome;

