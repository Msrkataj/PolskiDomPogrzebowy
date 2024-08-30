import React, { useState } from "react";
import dynamic from 'next/dynamic';
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

// Funkcja dynamicznego importu zostanie wykonana dopiero po kliknięciu
const LazyChatComponent = dynamic(() => import('@/components/common/ChatComponent'), { ssr: false });

const Home = () => {
    const [showChat, setShowChat] = useState(false); // Dodaj stan do kontroli wyświetlania czatu
    const [minimized, setMinimized] = useState(true); // Stan minimalizacji

    const handleOpenChat = () => {
        setShowChat(true); // Ustaw na true, aby załadować i wyświetlić ikonę czatu
        setMinimized(false); // Ustaw na false, aby otworzyć czat
    };

    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <SearchHome handleOpenChat={handleOpenChat} />
                <SupportHome />
                <FeaturesHome />
                <BenefitsHome />
                <FotoHome />
                <ProfessionalCeremonyHome />
                <HowHome />
                <ContactHome />
            </main>
            <footer>
                <Footer handleOpenChat={handleOpenChat} />
            </footer>
            {/* Renderuj LazyChatComponent tylko wtedy, gdy showChat jest true */}
            {showChat && <LazyChatComponent minimized={minimized} setMinimized={setMinimized} />}
        </>
    );
}

export default Home;
