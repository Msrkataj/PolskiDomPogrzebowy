import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import FuneralDetailsForm from "@/components/form/FuneralDetailsForm";
import AboutUs from "@/components/mission/about-us";
import AboutUsSecond from "@/components/mission/about-us-second";
import ChatComponent from "@/components/common/ChatComponent";

const MissionHome = () => {
    const [minimized, setMinimized] = useState(true);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <AboutUs/>
                <AboutUsSecond/>
            </main>
            <footer>
                <Footer/>
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
}

export default MissionHome