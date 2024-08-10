import React, { useState, useEffect } from "react";
import Link from 'next/link';
import data from '../data/data.json';
import Image from "next/image";
import { useRouter } from 'next/router';

const HeaderMenu = () => {
    const [active, setActive] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    // Wybór menu na podstawie roli użytkownika
    const menuItems = userRole === 'funeralHome' ? data.FuneralmenuItems : data.menuItems;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('userRole');
            const email = localStorage.getItem('userEmail');
            if (role && email) {
                setUserRole(role);
                setLoggedInUser(email);
            }
        }
    }, []);

    const toggleMenu = () => {
        setActive(!active);
        document.body.classList.toggle('no-scroll', !active);
    };

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        setLoggedInUser(null);
        setUserRole(null);
        router.push('/');
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

    return (
        <header className="header">
            <div className="header-top">
                <div className="logo-container">
                    <Link href="/">
                        <div className="logo"></div>
                    </Link>
                </div>
                <div className={loggedInUser ? "login-panel-main" : "login-panel"}>
                    {loggedInUser ? (
                        <>
                            <div className="login-panel-main-section">
                                <Link href={getPanelLink()}>
                                    <span className="login-text">Twój panel</span>
                                </Link>
                            </div>
                            <div className={loggedInUser ? "login-panel login-panel-logout" : "login-panel"}>
                                <span className="login-text">Witaj, {loggedInUser}</span>
                                <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
                            </div>
                        </>
                    ) : (
                        <Link href="/login">
                            <span className="login-text">Zaloguj się</span>
                        </Link>
                    )}
                </div>
            </div>
            <div className="nav-container">
                <div onClick={toggleMenu}>
                    <div className={active ? "activeHamburger" : "hamburger"} />
                </div>
                <div className="nav">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {userRole !== 'funeralHome' && (
                                    <div className="nav-image">
                                        <Image src={item.img} alt={item.name} layout="fill" objectFit="contain" />
                                    </div>
                                )}
                                <Link href={item.href}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={active ? "activeSidenav" : "sidenav"}>
                    <ul className="ul">
                        {menuItems.map((item, index) => (
                            <li key={index} onClick={toggleMenu}>
                                {userRole !== 'funeralHome' && (
                                    <div className="nav-image">
                                        <Image src={item.img} alt={item.name} layout="fill" objectFit="contain" />
                                    </div>
                                )}
                                <Link href={item.href}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li onClick={toggleMenu} className="login-panel-mobile">
                            {loggedInUser ? (
                                <div className="login-panel-main-section">
                                    <Link href={getPanelLink()}>
                                        <span className="login-text">Twój panel</span>
                                    </Link>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </li>
                        <li onClick={toggleMenu} className="login-panel-mobile">
                            {loggedInUser ? (
                                <div>
                                    <span className="login-text">Witaj, {loggedInUser}</span>
                                    <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <span className="login-text">Zaloguj się</span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default HeaderMenu;
