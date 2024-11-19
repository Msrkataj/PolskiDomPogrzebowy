// HeaderMenu.js

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import data from '../data/data.json';
import Image from "next/image";
import { useRouter } from 'next/router';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { parseCookies } from 'nookies';

const HeaderMenu = () => {
    const [active, setActive] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [hasNewChatMessage, setHasNewChatMessage] = useState(false);
    const [funeralHomeData, setFuneralHomeData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        let unsubscribe; // Funkcja do zakończenia nasłuchiwania

        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('userRole');
            const email = localStorage.getItem('userEmail');
            if (role && email) {
                setUserRole(role);
                setLoggedInUser(email);

                // Nasłuchiwanie wiadomości dla ról admin i funeralHome
                if (role === 'admin' || role === 'funeralHome') {
                    const chatQuery = query(collection(db, 'chat'), where('unread', '==', true));

                    unsubscribe = onSnapshot(chatQuery, (snapshot) => {
                        setHasNewChatMessage(!snapshot.empty);
                    });
                }

                // Pobieranie danych domu pogrzebowego dla funeralHome
                if (role === 'funeralHome') {
                    const fetchFuneralHomeData = async () => {
                        const funeralHomeQuery = query(collection(db, 'domyPogrzebowe'), where('email', '==', email));
                        const funeralHomeSnapshot = await getDocs(funeralHomeQuery);
                        if (!funeralHomeSnapshot.empty) {
                            const funeralHomeData = funeralHomeSnapshot.docs[0].data();
                            setFuneralHomeData(funeralHomeData);
                        }
                    };
                    fetchFuneralHomeData();
                }
            }
        }

        // Funkcja czyszcząca
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const toggleMenu = () => {
        setActive(!active);
        if (!active) {
            document.body.classList.add('no-scroll');
        } else {
            setTimeout(() => {
                document.body.classList.remove('no-scroll');
            }, 500);
        }
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
            setLoggedInUser(null);
            setUserRole(null);
            router.push('/');
        }
    };

    const getPanelLink = () => {
        switch (userRole) {
            case 'client':
                return '/client/panel';
            case 'funeralHome':
                return '/funeral/panel';
            case 'admin':
                return '/admin/panel';
            default:
                return '/login';
        }
    };

    const getMenuData = () => {
        if (userRole === 'funeralHome' && funeralHomeData) {
            // Sprawdzamy, czy profil jest kompletny
            if (funeralHomeData.profileCompleted && funeralHomeData.profileCompleted2 && funeralHomeData.profileCompleted3) {
                return {
                    items: data.FuneralmenuItems, // Jeśli profil jest kompletny
                    mobileItems: data.FuneralmenuMobileItems,
                };
            } else {
                return {
                    items: data.FuneralmenuItemsFirst, // Jeśli profil nie jest kompletny
                    mobileItems: data.FuneralmenuMobileItemsFirst,
                };
            }
        } else if (userRole === 'admin') {
            return {
                items: data.AdminmenuItems,
                mobileItems: data.AdminmenuMobileItems,
            };
        } else {
            return {
                items: data.menuItems,
                mobileItems: data.menuMobileItems,
            };
        }
    };

    const { items: menuItems, mobileItems: menuMobileItems } = getMenuData();

    return (
        <header className="header">
            <div className="header-top">
                <div className="logo-container">
                    <Link href="/" className="logo-container-img">
                        <div className="logo-image">
                            <Image
                                src="/assets/logo.webp"
                                alt="Polskidompogrzebowy.pl"
                                fill
                                sizes="(max-width: 768px) 205vw, 300px"
                                priority
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </Link>
                </div>
                <div className="login-panel login-panel-desktop">
                    {loggedInUser ? (
                        <div className="login-panel-logout">
                            <span className="login-text">Witaj, {loggedInUser}</span>
                            {userRole !== 'funeralHome' && userRole !== 'admin' && (
                                <Link href={getPanelLink()}>
                                    <button className="login-text">Twój panel</button>
                                </Link>
                            )}
                            <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="button-login">Zaloguj się</button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="nav-container">
                <div className="hamburger-menu" onClick={toggleMenu}>
                    <div className={active ? "activeHamburger" : "hamburger"} />
                </div>
                <nav className="nav">
                    <ul>
                        {menuItems && menuItems.map((item, index) => (
                            <li key={index}>
                                <div className="nav-image">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                        style={{ objectFit: 'contain' }}
                                        loading="lazy"
                                    />
                                </div>
                                <Link href={item.href}>
                                    {item.name}
                                    {item.name === 'Czat' && hasNewChatMessage && (
                                        <span className="unread-indicator">❗</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <aside className={`sidenav ${active ? "active" : ""}`}>
                    <ul>
                        {menuMobileItems && menuMobileItems.map((item, index) => (
                            <li key={index} onClick={toggleMenu}>
                                <div className="nav-image">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                        style={{ objectFit: 'contain' }}
                                        loading="lazy"
                                    />
                                </div>
                                <Link href={item.href}>
                                    {item.name}
                                    {item.name === 'Czat' && hasNewChatMessage && (
                                        <span className="unread-indicator">❗</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="login-panel login-panel-mobile">
                        {loggedInUser ? (
                            <div className="login-panel-logout ">
                                <span className="login-text">Witaj, {loggedInUser}</span>
                                {userRole !== 'funeralHome' && userRole !== 'admin' && (
                                    <Link href={getPanelLink()}>
                                        <button className="login-text">Przejdź do Twojego panelu</button>
                                    </Link>
                                )}
                                <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
                            </div>
                        ) : (
                            <Link href="/login">
                                <button className="login-text">Zaloguj się</button>
                            </Link>
                        )}
                    </div>
                    <div className="login-panel-mobile-info">
                        <p>Telefon kontaktowy</p>
                        <p className="phone-number">600 000 000</p>
                    </div>
                </aside>
            </div>
        </header>
    );
};

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const loggedInUser = cookies.userEmail || null;
    const userRole = cookies.userRole || null;

    return {
        props: {
            loggedInUser,
            userRole,
        },
    };
}

export default HeaderMenu;
