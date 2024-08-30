import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FirstSummary from "@/components/funeral/FirstSummary";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FirstSummary/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home