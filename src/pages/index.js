import React from "react";
import Header from "@/components/Header";
import SearchHome from "@/components/SearchHome";
import SupportHome from "@/components/SupportHome";
import FeaturesHome from "@/components/FeaturesHome";
import BenefitsHome from "@/components/BenefitsHome";
import FotoHome from "@/components/FotoHome";
import ProfessionalCeremonyHome from "@/components/ProfessionalCeremonyHome";
import HowHome from "@/components/HowHome";
import ContactHome from "@/components/ContactHome";
import Footer from "@/components/Footer";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <SearchHome/>
                <SupportHome/>
                <FeaturesHome/>
                <BenefitsHome/>
                <FotoHome/>
                <ProfessionalCeremonyHome/>
                <HowHome/>
                <ContactHome/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home