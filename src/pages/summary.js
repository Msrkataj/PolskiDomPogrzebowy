import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SummaryForm from "@/components/form/SummaryForm";
import ChatComponent from "@/components/common/ChatComponent";


const SummaryHome = () => {
    const [minimized, setMinimized] = useState(true);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <SummaryForm/>
            </main>
            <footer>
                <Footer/>
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
}

export default SummaryHome