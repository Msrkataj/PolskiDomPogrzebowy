import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import ChatComponent from "@/components/common/ChatComponent";
import Policy_main from "@/components/Policy_main";

const PoliticsHome = () => {
    const [minimized, setMinimized] = useState(true);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main >
                <Policy_main/>
            </main>
            <footer>
                <Footer/>
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
}
export default dynamic (() => Promise.resolve(PoliticsHome), {ssr: false})

