import React from "react";
import Head from "next/head"; // Importujemy Head z next/head
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralHomeLogin from "@/components/panel/FuneralHomeLogin";
import CookieConsent from "@/components/Policy_component";

const FuneralLoginSite = () => {
    return (
        <>
            <Head>
                <title>Panel Domu Pogrzebowego - Zaloguj się | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Zaloguj się do panelu domu pogrzebowego, aby zarządzać formularzami od klientów i swoim profilem. Dołącz do nas i skorzystaj z wielu korzyści."
                />
                <meta
                    name="keywords"
                    content="panel domu pogrzebowego, logowanie, zarządzanie formularzami, Polski Dom Pogrzebowy"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/login-dom" />
                <meta property="og:title" content="Panel Domu Pogrzebowego - Zaloguj się | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Zaloguj się do panelu domu pogrzebowego, aby zarządzać formularzami od klientów i swoim profilem. Dołącz do nas i skorzystaj z wielu korzyści."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/login-dom" />
                <meta property="twitter:title" content="Panel Domu Pogrzebowego - Zaloguj się | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Zaloguj się do panelu domu pogrzebowego, aby zarządzać formularzami od klientów i swoim profilem. Dołącz do nas i skorzystaj z wielu korzyści."
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
                            "name": "Panel Domu Pogrzebowego - Zaloguj się | Polski Dom Pogrzebowy",
                            "description": "Zaloguj się do panelu domu pogrzebowego, aby zarządzać formularzami od klientów i swoim profilem. Dołącz do nas i skorzystaj z wielu korzyści.",
                            "url": "https://polskidompogrzebowy.pl/login-dom"
                        }
                        `,
                    }}
                />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <FuneralHomeLogin />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default FuneralLoginSite;
