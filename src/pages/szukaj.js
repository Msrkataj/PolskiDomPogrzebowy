import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/search/Search";
import Results from "@/components/search/Results";
import ChatComponent from "@/components/common/ChatComponent";
import CookieConsent from "@/components/Policy_component";

const SearchHome = () => {
    const [minimized, setMinimized] = useState(true);

    const handleOpenChat = () => {
        setMinimized(false);
    };

    return (
        <>
            <Head>
                <title>Znajdź Najbliższe Domy Pogrzebowe - Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Wyszukaj pobliskie domy pogrzebowe i załatw wszystkie formalności online. Polski Dom Pogrzebowy oferuje kompleksowe usługi pogrzebowe dostępne zdalnie."
                />
                <meta
                    name="keywords"
                    content="dom pogrzebowy, usługi pogrzebowe, zakład pogrzebowy, pogrzeb, formalności pogrzebowe, online, wyszukiwarka domów pogrzebowych"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/szukaj" />
                <meta property="og:title" content="Znajdź Najbliższe Domy Pogrzebowe - Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Wyszukaj pobliskie domy pogrzebowe i załatw wszystkie formalności online. Polski Dom Pogrzebowy oferuje kompleksowe usługi pogrzebowe dostępne zdalnie."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/szukaj" />
                <meta property="twitter:title" content="Znajdź Najbliższe Domy Pogrzebowe - Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Wyszukaj pobliskie domy pogrzebowe i załatw wszystkie formalności online. Polski Dom Pogrzebowy oferuje kompleksowe usługi pogrzebowe dostępne zdalnie."
                />
                <meta property="twitter:image" content="https://polskidompogrzebowy.pl/favicon.webp" />

                {/* Dane strukturalne Schema.org */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Znajdź Najbliższe Domy Pogrzebowe - Polski Dom Pogrzebowy",
                        "description": "Wyszukaj pobliskie domy pogrzebowe i załatw wszystkie formalności online. Polski Dom Pogrzebowy oferuje kompleksowe usługi pogrzebowe dostępne zdalnie.",
                        "url": "https://polskidompogrzebowy.pl/szukaj"
                    }
                    `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <Search />
                <Results />
            </main>
            <footer>
                <Footer />
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
            <CookieConsent/>
        </>
    );
};

export default dynamic(() => Promise.resolve(SearchHome), { ssr: false });
