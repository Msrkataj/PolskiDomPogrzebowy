import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Assortment from "@/components/form/Assortment";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import dynamic from "next/dynamic";

const LazyChatComponent = dynamic(() => import('@/components/common/ChatComponent'), { ssr: false });

const AssortymentHome = () => {
    const [showChat, setShowChat] = useState(false);
    const [minimized, setMinimized] = useState(true);

    const handleOpenChat = () => {
        setShowChat(true);
        setMinimized(false);
    };

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <ChooseFuneral success={false} handleOpenChat={handleOpenChat}/> {/* Przekazanie handleOpenChat */}
                <Assortment/>
            </main>
            <footer>
                <Footer/>
            </footer>
            {showChat && <LazyChatComponent minimized={minimized} setMinimized={setMinimized} />}
        </>
    );
};

export default dynamic(() => Promise.resolve(AssortymentHome), { ssr: false });
