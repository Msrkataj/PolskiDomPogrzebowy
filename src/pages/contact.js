import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import FuneralDetailsForm from "@/components/form/FuneralDetailsForm";
import Contact from "@/components/contact/Contact";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Contact/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home