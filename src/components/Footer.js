import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import data from '../../src/data/data.json';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-background">
            </div>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <Image src="/assets/logo.png" alt="Polskidompogrzebowy.pl" width={200} height={60} />
                    </div>
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
                        <a href="/chat" className="button">
                            <Image src="/assets/icons/consultant-white.png" alt="Consultant" width={25} height={25} /> Zapytaj teraz
                        </a>
                        <a href="/login" className="button">Logowanie</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
