import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLogin from "@/components/panel/ClientLogin";
import CookieConsent from "@/components/Policy_component";

const LoginClientSite = () => {
    return (
        <>
            <Head>
                <title>Panel Klienta - Zaloguj się | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Zaloguj się do swojego panelu klienta, aby zarządzać swoimi danymi i sprawdzić aktualny status sprawy. Polski Dom Pogrzebowy - zawsze do Twojej dyspozycji."
                />
                <meta
                    name="keywords"
                    content="panel klienta, logowanie, zarządzanie danymi, status sprawy, Polski Dom Pogrzebowy"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/login" />
                <meta property="og:title" content="Panel Klienta - Zaloguj się | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Zaloguj się do swojego panelu klienta, aby zarządzać swoimi danymi i sprawdzić aktualny status sprawy. Polski Dom Pogrzebowy - zawsze do Twojej dyspozycji."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/login" />
                <meta property="twitter:title" content="Panel Klienta - Zaloguj się | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Zaloguj się do swojego panelu klienta, aby zarządzać swoimi danymi i sprawdzić aktualny status sprawy. Polski Dom Pogrzebowy - zawsze do Twojej dyspozycji."
                />
                <meta property="twitter:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Dane strukturalne Schema.org */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": "Panel Klienta - Zaloguj się | Polski Dom Pogrzebowy",
                            "description": "Zaloguj się do swojego panelu klienta, aby zarządzać swoimi danymi i sprawdzić aktualny status sprawy. Polski Dom Pogrzebowy - zawsze do Twojej dyspozycji.",
                            "url": "https://polskidompogrzebowy.pl/login"
                        }
                        `,
                    }}
                />
                {/* Meta tagi dla robotów wyszukiwarek */}
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <ClientLogin />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default LoginClientSite;
