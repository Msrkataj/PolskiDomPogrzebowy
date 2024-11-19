import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from "@/components/Header";
import SearchHome from "@/components/SearchHome";
import SupportHome from "@/components/SupportHome";
import FeaturesHome from "@/components/FeaturesHome";
import BenefitsHome from "@/components/BenefitsHome";
import FotoHome from "@/components/FotoHome";
import ProfessionalCeremonyHome from "@/components/ProfessionalCeremonyHome";
import HowHome from "@/components/HowHome";
import ContactHome from "@/components/ContactHome";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/Policy_component";

const LazyChatComponent = dynamic(() => import('@/components/common/ChatComponent'), { ssr: false });

const Home = () => {
    const [showChat, setShowChat] = useState(false);
    const [minimized, setMinimized] = useState(true);

    const handleOpenChat = () => {
        setShowChat(true);
        setMinimized(false);
    };

    return (
        <>
            <Head>
                <title>Polski Dom Pogrzebowy - Kompleksowe Usługi Pogrzebowe Online</title>
                <meta name="description" content="Wyszukaj zakłady pogrzebowe w pobliżu i załatw wszystkie formalności online. Kompleksowe usługi pogrzebowe dostępne zdalnie." />
                <meta name="keywords" content="dom pogrzebowy, usługi pogrzebowe, zakład pogrzebowy, pogrzeb, formalności pogrzebowe, online" />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/" />
                <meta property="og:title" content="Polski Dom Pogrzebowy - Kompleksowe Usługi Pogrzebowe Online" />
                <meta property="og:description" content="Wyszukaj zakłady pogrzebowe w pobliżu i załatw wszystkie formalności online. Kompleksowe usługi pogrzebowe dostępne zdalnie." />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/" />
                <meta property="twitter:title" content="Polski Dom Pogrzebowy - Kompleksowe Usługi Pogrzebowe Online" />
                <meta property="twitter:description" content="Wyszukaj zakłady pogrzebowe w pobliżu i załatw wszystkie formalności online. Kompleksowe usługi pogrzebowe dostępne zdalnie." />
                <meta property="twitter:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Dane strukturalne Schema.org */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Polski Dom Pogrzebowy",
                        "url": "https://polskidompogrzebowy.pl",
                        "logo": "https://polskidompogrzebowy.pl/logo.png",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+48 123 456 789",
                            "contactType": "Obsługa klienta",
                            "areaServed": "PL",
                            "availableLanguage": ["Polish"]
                        },
                        "sameAs": [
                            "https://www.facebook.com/polskidompogrzebowy",
                            "https://www.instagram.com/polskidompogrzebowy"
                        ]
                    }
                    `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <SearchHome handleOpenChat={handleOpenChat} />
                <SupportHome />
                <FeaturesHome />
                <BenefitsHome />
                <FotoHome handleOpenChat={handleOpenChat} />
                <ProfessionalCeremonyHome />
                <HowHome />
                <ContactHome />
            </main>
            <footer>
                <Footer handleOpenChat={handleOpenChat} />
            </footer>
            {showChat && <LazyChatComponent minimized={minimized} setMinimized={setMinimized} />}
            <CookieConsent/>
        </>
    );
}

export default Home;
