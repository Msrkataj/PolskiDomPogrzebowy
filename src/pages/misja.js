import React, { useState } from "react";
import Head from "next/head"; // Importujemy Head z next/head
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import FuneralDetailsForm from "@/components/form/FuneralDetailsForm";
import AboutUs from "@/components/mission/about-us";
import AboutUsSecond from "@/components/mission/about-us-second";
import ChatComponent from "@/components/common/ChatComponent";
import CookieConsent from "@/components/Policy_component";

const MissionHome = () => {
    const [minimized, setMinimized] = useState(true);
    const handleOpenChat = () => {
        setMinimized(false);
    };

    return (
        <>
            <Head>
                <title>O nas - Misja i Wartości | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Poznaj naszą misję, historię i wartości. Dowiedz się więcej o naszym zespole i współpracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach."
                />
                <meta
                    name="keywords"
                    content="o nas, misja, wartości, historia, zespół, współpraca, dom pogrzebowy, usługi pogrzebowe, Polski Dom Pogrzebowy"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/misja" />
                <meta property="og:title" content="O nas - Misja i Wartości | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Poznaj naszą misję, historię i wartości. Dowiedz się więcej o naszym zespole i współpracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/misja" />
                <meta property="twitter:title" content="O nas - Misja i Wartości | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Poznaj naszą misję, historię i wartości. Dowiedz się więcej o naszym zespole i współpracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach."
                />
                <meta property="twitter:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Dane strukturalne Schema.org */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "AboutPage",
                            "name": "O nas - Misja i Wartości | Polski Dom Pogrzebowy",
                            "description": "Poznaj naszą misję, historię i wartości. Dowiedz się więcej o naszym zespole i współpracy z domami pogrzebowymi. Polski Dom Pogrzebowy - Twoje wsparcie w trudnych chwilach.",
                            "url": "https://polskidompogrzebowy.pl/misja"
                        }
                        `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <AboutUs />
                <AboutUsSecond handleOpenChat={handleOpenChat} />
            </main>
            <footer>
                <Footer />
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
};

export default dynamic(() => Promise.resolve(MissionHome), { ssr: false });
