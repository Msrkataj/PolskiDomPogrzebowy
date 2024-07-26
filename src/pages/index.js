import React from "react";
import Head from 'next/head';
import Header from "../../components/Header";
import {Homenaje} from "next/dist/compiled/@next/font/dist/google";


export async function getStaticProps() {
    return {
        props: {
            title: "Nallipop - Animacje dla dzieci",
            description: "Animacje Nallipop - dla rodziców Warszawa i okolice, którzy chcą zapewnić dzieciom to co najlepsze. Sprawdź naszą ofertę!",
            keywords: "animacje, dzieci, oferta, wynajem, zabawa, strona główna",
            url: "https://nallipop.pl/",
            telephone: "+48795103108",
            email: "animacje@nallipop.pl",
            image: "/assets/logo.webp",
            address: {
                "@type": "PostalAddress",
                "addressLocality": "Warszawa",
                "addressCountry": "PL"
            }
        },
    };
}

export default function Home({title, description, keywords, url, telephone, email, image, address}) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": title,
        "description": description,
        "url": url,
        "address": address,
        "telephone": telephone,
        "email": email
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/assets/favicon.webp"/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:image" content={image}/>
                <meta property="og:url" content={url}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Head>
            <header>
                <Header/>
            </header>
            <main>
                <Home/>
            </main>
            <footer>
            </footer>
        </>
    );
}