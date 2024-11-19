import React from "react";
import Head from "next/head"; // Importujemy Head z next/head
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Password from "@/components/common/Password";
import PasswordClient from "@/components/common/PasswordClient";

const JoinFormPage = () => {
    return (
        <>
            <Head>
                <title>Dołącz do nas - Formularz zgłoszeniowy | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Wypełnij formularz o nowe hasło"
                />
                <meta
                    name="keywords"
                    content="Wypełnij formularz o nowe hasło"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/zapomiane-haslo-uzytkownik" />
                <meta property="og:title" content="Zapomniales hasła - Formularz | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Wypełnij formularz o nowe hasło"
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/zapomiane-haslo" />
                <meta property="twitter:title" content="Zapomniales hasła - Formularz | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Wypełnij formularz o nowe hasło"
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
                            "name": "Zapomniales hasła - Formularz | Polski Dom Pogrzebowy",
                            "description": "Wypełnij formularz o nowe hasło",
                            "url": "https://polskidompogrzebowy.pl/zapomiane-haslo"
                        }
                        `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <PasswordClient/>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default JoinFormPage;
