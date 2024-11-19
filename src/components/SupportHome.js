import React from 'react';
import Image from 'next/image';
import phoneIcon from '../../public/assets/icons/phone.png';
import data from '../data/data.json';
import Link from "next/link";
import dynamic from "next/dynamic";

const SupportHome = () => {
    const supportItems = data.supportItems;

    return (
        <div id="pomoc-na-ktora-mozesz-liczyc" className="support-component">
            <h2>Pomoc, na którą możesz liczyć</h2>
            <div className="support-items flex-center">
                {supportItems.map((item, index) => (
                    <div key={index} className="support-item">
                        <Link href={item.anchor}>
                            <div>
                                <Image
                                    src={item.icon}
                                    alt={item.text}
                                    width={40}
                                    height={40}
                                    sizes="(max-width: 768px) 100vw, 150px"
                                    loading={"lazy"}
                                />
                                <p>{item.text}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="contact-call">
                <h3>Zadzwoń do nas, my zorganizujemy pogrzeb</h3>
                <Link href="tel:+48600000000">
                    <Image src={phoneIcon} alt="Phone" width={32} height={32} sizes="(max-width: 768px) 100vw, 40px" loading="lazy"/>
                    <p>+48 600 000 000</p>
                </Link>
            </div>
            <p className="or-title">lub</p>
            <div className="start-yourself">
                <Link href="/szukaj">
                    <h3>Zacznij tutaj samodzielnie, my dalej wszystko zorganizujemy</h3>
                </Link>
            </div>
            <div className="information flex-center">
                <div className="info-icon"></div>
                <div className="info-text">
                    <h3>
                        Wiemy, jak trudne jest udanie się osobiście do zakładu pogrzebowego. Dzięki naszemu portalowi
                        możesz połączyć się z najbardziej profesjonalnym zakładem pogrzebowym bez wychodzenia z domu.
                        Zapewniamy najlepszy asortyment w specjalnej cenie, współpracując tylko z doświadczonymi
                        zakładami. U nas załatwisz wszystko, łącznie z dokumentami i wyborem asortymentu, nie opuszczając
                        domu.
                    </h3>
                    <Link href="#how-it-works" className="check-how-it-works">
                        Sprawdź jak to działa
                        <span className="arrow-icon"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default dynamic (() => Promise.resolve(SupportHome), {ssr: false})


