import React from "react";
import Head from "next/head"; // Importujemy Head z next/head
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinComponent from "@/components/JoinComponent";

const JoinFormPage = () => {
    return (
        <>
            <Head>
                <title>Dołącz do nas - Formularz zgłoszeniowy | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Wypełnij formularz zgłoszeniowy, aby dołączyć do naszej sieci domów pogrzebowych. Skorzystaj z możliwości współpracy i zwiększ swoją widoczność wśród klientów."
                />
                <meta
                    name="keywords"
                    content="formularz zgłoszeniowy, dołącz do nas, współpraca, dom pogrzebowy, Polski Dom Pogrzebowy"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/dolacz-formularz" />
                <meta property="og:title" content="Dołącz do nas - Formularz zgłoszeniowy | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Wypełnij formularz zgłoszeniowy, aby dołączyć do naszej sieci domów pogrzebowych. Skorzystaj z możliwości współpracy i zwiększ swoją widoczność wśród klientów."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/dolacz-formularz" />
                <meta property="twitter:title" content="Dołącz do nas - Formularz zgłoszeniowy | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Wypełnij formularz zgłoszeniowy, aby dołączyć do naszej sieci domów pogrzebowych. Skorzystaj z możliwości współpracy i zwiększ swoją widoczność wśród klientów."
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
                            "name": "Dołącz do nas - Formularz zgłoszeniowy | Polski Dom Pogrzebowy",
                            "description": "Wypełnij formularz zgłoszeniowy, aby dołączyć do naszej sieci domów pogrzebowych. Skorzystaj z możliwości współpracy i zwiększ swoją widoczność wśród klientów.",
                            "url": "https://polskidompogrzebowy.pl/dolacz-formularz"
                        }
                        `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <JoinComponent />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default JoinFormPage;
