import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import FuneralDetailsForm from "@/components/form/FuneralDetailsForm";
import ChatComponent from "@/components/common/ChatComponent";

const FuneralDetailsFormSite = () => {
    const [minimized, setMinimized] = useState(true);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FuneralDetailsForm/>
            </main>
            <footer>
                <Footer/>
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
}

export default FuneralDetailsFormSite