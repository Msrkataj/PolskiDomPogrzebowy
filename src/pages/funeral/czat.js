import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralChats from "@/components/funeral/ChatFuneral";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FuneralChats/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home