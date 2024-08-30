import React, { useState, useEffect } from "react";
import Link from 'next/link';
import data from '../data/data.json';
import Image from "next/image";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

const HeaderMenu = () => {
    const [active, setActive] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isClient, setIsClient] = useState(false); // Track client-side rendering
    const router = useRouter();

    useEffect(() => {
        // Set flag to indicate that we are on the client side
        setIsClient(true);

        // Fetch user details from localStorage only on client-side
        const role = localStorage.getItem('userRole');
        const email = localStorage.getItem('userEmail');
        if (role && email) {
            setUserRole(role);
            setLoggedInUser(email);
        }
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
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('formId');
        localStorage.removeItem('email');
        localStorage.removeItem('formData');
        localStorage.removeItem('loginTime');
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

    const getMenuItems = () => {
        if (userRole === 'funeralHome') {
            return data.FuneralmenuItems;
        } else if (userRole === 'admin') {
            return data.AdminmenuItems;
        } else {
            return data.menuItems;
        }
    };

    const getMenuMobileItems = () => {
        if (userRole === 'funeralHome') {
            return data.FuneralmenuMobileItems;
        } else if (userRole === 'admin') {
            return data.AdminmenuMobileItems;
        } else {
            return data.menuMobileItems;
        }
    };

    const menuItems = getMenuItems();
    const menuMobileItems = getMenuMobileItems();
    console.log(menuItems[0].img)
    console.log(data.menuItems[0].img)

    return (
        <div className={loggedInUser && userRole !== 'funeralHome' && userRole !== 'admin' ? "header" : "header header-mobile"}>
            <div className="header-top">
                <div className="logo-container">
                    <Link href="/">
                        <div style={{position: "relative", width: "300px", height: "50px"}}>
                            <Image
                                src="/assets/logo.webp"
                                alt="Polskidompogrzebowy.pl"
                                fill
                                sizes="(max-width: 768px) 205vw, 300px"
                                priority
                                style={{objectFit: "contain"}}
                            />
                        </div>
                    </Link>
                </div>
                <div className={loggedInUser ? "login-panel-main" : "login-panel"}>
                    {loggedInUser ? (
                        <div className="login-panel login-panel-logout">
                            <span className="login-text">Witaj, {loggedInUser}</span>
                            {userRole !== 'funeralHome' && userRole !== 'admin' ? (
                                <Link href={getPanelLink()}>
                                    <span className="login-text">Twój panel</span>
                                </Link>
                            ) : null}
                            <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
                        </div>
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
                        {isClient && menuItems.map((item, index) => (
                            <li key={index}>
                                <div className="nav-image">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                        style={{ objectFit: 'contain' }}
                                        loading={"lazy"}
                                    />
                                </div>
                                <Link href={item.href}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={active ? "activeSidenav" : "sidenav"}>
                    <ul className="ul">
                        {isClient && menuMobileItems.map((item, index) => (
                            <li key={index} onClick={toggleMenu}>
                                <span className="nav-image">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                        style={{ objectFit: 'contain' }}
                                        loading={"lazy"}
                                    />
                                </span>
                                <Link href={item.href}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <span className="login-panel-mobile-info">
                        <p>Telefon kontaktowy</p>
                        <p className="phone-number">600 000 000</p>
                    </span>
                </div>
            </div>
        </div>
    );
};
export default dynamic (() => Promise.resolve(HeaderMenu), {ssr: false})

