import React from "react";
import Head from "next/head"; // Importujemy Head z next/head
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Join from "@/components/join/Join";
import CookieConsent from "@/components/Policy_component";

const JoinSite = () => {
    return (
        <>
            <Head>
                <title>Dołącz do nas - Zostań Partnerem | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Zapraszamy domy pogrzebowe do współpracy. Dołącz do nas i skorzystaj z dostępu do systemu, promocji oraz wielu innych korzyści. Zwiększ swoją widoczność i dotrzyj do nowych klientów."
                />
                <meta
                    name="keywords"
                    content="dołącz, partnerstwo, współpraca, dom pogrzebowy, usługi pogrzebowe, promocja, Polski Dom Pogrzebowy"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/dolacz" />
                <meta property="og:title" content="Dołącz do nas - Zostań Partnerem | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Zapraszamy domy pogrzebowe do współpracy. Dołącz do nas i skorzystaj z dostępu do systemu, promocji oraz wielu innych korzyści. Zwiększ swoją widoczność i dotrzyj do nowych klientów."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/dolacz" />
                <meta property="twitter:title" content="Dołącz do nas - Zostań Partnerem | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Zapraszamy domy pogrzebowe do współpracy. Dołącz do nas i skorzystaj z dostępu do systemu, promocji oraz wielu innych korzyści. Zwiększ swoją widoczność i dotrzyj do nowych klientów."
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
                            "name": "Dołącz do nas - Zostań Partnerem | Polski Dom Pogrzebowy",
                            "description": "Zapraszamy domy pogrzebowe do współpracy. Dołącz do nas i skorzystaj z dostępu do systemu, promocji oraz wielu innych korzyści. Zwiększ swoją widoczność i dotrzyj do nowych klientów.",
                            "url": "https://polskidompogrzebowy.pl/dolacz"
                        }
                        `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <Join />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default JoinSite;
