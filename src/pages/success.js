import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Success from "@/components/form/Success";
import ChatComponent from "@/components/common/ChatComponent";

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

export default SuccessHome