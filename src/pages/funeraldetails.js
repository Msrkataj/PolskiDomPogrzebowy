import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import FuneralDetailsForm from "@/components/form/FuneralDetailsForm";

const Home = () => {
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
        </>
    );
}

export default Home