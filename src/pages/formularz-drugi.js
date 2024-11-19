import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/form/Form";
import Details from "@/components/form/Details";
import DetailsSecond from "@/components/form/DetailsSecond";
import FormPage from "@/components/form/FormPage";
import ChatComponent from "@/components/common/ChatComponent";

const DetailsPage = () => {
    const [minimized, setMinimized] = useState(true);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FormPage/>
            </main>
            <footer>
                <Footer/>
            </footer>
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
}

export default DetailsPage;