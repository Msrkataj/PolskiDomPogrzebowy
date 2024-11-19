import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Success from "@/components/form/Success";
import ChatComponent from "@/components/common/ChatComponent";
import dynamic from "next/dynamic";
import CookieConsent from "@/components/Policy_component";

const SuccessHome = () => {
    const [minimized, setMinimized] = useState(true);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Success/>
            </main>
            <footer>
                <Footer/>
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
}

export default dynamic (() => Promise.resolve(SuccessHome), {ssr: false})
