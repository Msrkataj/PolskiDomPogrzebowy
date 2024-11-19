import React from "react";
import Head from "next/head"; // Importujemy Head z next/head
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import FuneralDetailsForm from "@/components/form/FuneralDetailsForm";
import AboutUs from "@/components/mission/about-us";
import AboutUsSecond from "@/components/mission/about-us-second";
import Trust from "@/components/trust/Trust";
import TrustSecond from "@/components/trust/TrustSecond";
import CookieConsent from "@/components/Policy_component";

const TrustUs = () => {
    return (
        <>
            <Head>
                <title>Zaufali nam - Opinie i Lista Domów Pogrzebowych | Polski Dom Pogrzebowy</title>
                <meta
                    name="description"
                    content="Przeczytaj opinie naszych klientów i zobacz listę domów pogrzebowych, które nam zaufały. Dołącz do grona zadowolonych użytkowników Polski Dom Pogrzebowy."
                />
                <meta
                    name="keywords"
                    content="opinie, domy pogrzebowe, zaufali nam, usługi pogrzebowe, Polski Dom Pogrzebowy"
                />
                <meta name="author" content="Polski Dom Pogrzebowy" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://polskidompogrzebowy.pl/zaufali-nam" />
                <meta property="og:title" content="Zaufali nam - Opinie i Lista Domów Pogrzebowych | Polski Dom Pogrzebowy" />
                <meta
                    property="og:description"
                    content="Przeczytaj opinie naszych klientów i zobacz listę domów pogrzebowych, które nam zaufały. Dołącz do grona zadowolonych użytkowników Polski Dom Pogrzebowy."
                />
                <meta property="og:image" content="https://polskidompogrzebowy.pl/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://polskidompogrzebowy.pl/zaufali-nam" />
                <meta property="twitter:title" content="Zaufali nam - Opinie i Lista Domów Pogrzebowych | Polski Dom Pogrzebowy" />
                <meta
                    property="twitter:description"
                    content="Przeczytaj opinie naszych klientów i zobacz listę domów pogrzebowych, które nam zaufały. Dołącz do grona zadowolonych użytkowników Polski Dom Pogrzebowy."
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
                            "name": "Zaufali nam - Opinie i Lista Domów Pogrzebowych | Polski Dom Pogrzebowy",
                            "description": "Przeczytaj opinie naszych klientów i zobacz listę domów pogrzebowych, które nam zaufały. Dołącz do grona zadowolonych użytkowników Polski Dom Pogrzebowy.",
                            "url": "https://polskidompogrzebowy.pl/zaufali-nam"
                        }
                        `,
                    }}
                />
            </Head>
            <header>
                <Header />
            </header>
            <main>
                <Trust />
                <TrustSecond />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default dynamic(() => Promise.resolve(TrustUs), { ssr: false });
