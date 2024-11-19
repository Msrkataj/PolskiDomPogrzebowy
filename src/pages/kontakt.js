import React, { useState } from "react";
import Head from "next/head"; // Importujemy Head z next/head
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/contact/Contact";
import ChatComponent from "@/components/common/ChatComponent";
import CookieConsent from "@/components/Policy_component";

const ContactPage = () => {
    const [minimized, setMinimized] = useState(true);
    const handleOpenChat = () => {
        setMinimized(false);
    };
    return (
        <>
            <Head>
                <title>Kontakt - Skontaktuj się z nami | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Skontaktuj się z nami: adres, godziny otwarcia, e-mail, telefon i media społecznościowe. Wypełnij formularz kontaktowy lub skorzystaj z czatu na żywo. Jesteśmy do Twojej dyspozycji."
                />
                <meta
                    name="keywords"
                    content="kontakt, adres, godziny otwarcia, e-mail, telefon, media społecznościowe, formularz kontaktowy, czat na żywo, Polski Dom Pogrzebowy"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/kontakt" />
                <meta property="og:title" content="Kontakt - Skontaktuj się z nami | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Skontaktuj się z nami: adres, godziny otwarcia, e-mail, telefon i media społecznościowe. Wypełnij formularz kontaktowy lub skorzystaj z czatu na żywo. Jesteśmy do Twojej dyspozycji."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/kontakt" />
                <meta property="twitter:title" content="Kontakt - Skontaktuj się z nami | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Skontaktuj się z nami: adres, godziny otwarcia, e-mail, telefon i media społecznościowe. Wypełnij formularz kontaktowy lub skorzystaj z czatu na żywo. Jesteśmy do Twojej dyspozycji."
                />
                <meta property="twitter:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Dane strukturalne Schema.org */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "ContactPage",
                            "name": "Kontakt - Skontaktuj się z nami | Polski Dom Pogrzebowy",
                            "description": "Skontaktuj się z nami: adres, godziny otwarcia, e-mail, telefon i media społecznościowe. Wypełnij formularz kontaktowy lub skorzystaj z czatu na żywo. Jesteśmy do Twojej dyspozycji.",
                            "url": "https://polskidompogrzebowy.pl/kontakt",
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+48 123 456 789",
                                "contactType": "Obsługa klienta",
                                "email": "kontakt@polskidompogrzebowy.pl",
                                "areaServed": "PL",
                                "availableLanguage": ["Polish"]
                            }
                        }
                        `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <Contact handleOpenChat={handleOpenChat} />
            </main>
            <footer>
                <Footer />
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
};

export default dynamic (() => Promise.resolve(ContactPage), {ssr: false})