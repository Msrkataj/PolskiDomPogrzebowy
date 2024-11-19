import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import data from '../data/data.json';
import dynamic from "next/dynamic";

const Footer = ({ handleOpenChat }) => {
    return (
        <footer className="footer">
            <div className="footer-background"></div>
            <div className="container">
                <div className="footer-content">
                    <Link href="/">
                        <div className="footer-logo">
                            <div className="logo-image">
                                <Image
                                    src="/assets/logo.webp"
                                    alt="Polskidompogrzebowy.pl"
                                    width={300}
                                    height={50}
                                    sizes="(max-width: 768px) 205vw, 300px"
                                    priority
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        </div>
                    </Link>
                    <div className="footer-columns">
                        {data.navigationData.map((section, index) => (
                            <div className="footer-column" key={index}>
                                <h3>{section.name}</h3>
                                <ul>
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link href={link.href}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="footer-buttons">
                        <button onClick={handleOpenChat} className="button-login">
                            <Image
                                src="/assets/icons/consultant-white.png"
                                alt="Consultant"
                                width={25}
                                height={25}
                            />{" "}
                            Zapytaj teraz
                        </button>
                        <Link href="/login" className="button-login">
                            Logowanie
                        </Link>
                    </div>
                </div>
            </div>
            <p className="footer-end">
                © 2024 Polskidompogrzebowy.pl by KamaLogic
            </p>
        </footer>
    );
};
export default dynamic (() => Promise.resolve(Footer), {ssr: false})

