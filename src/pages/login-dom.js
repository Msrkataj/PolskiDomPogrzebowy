import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralHomeLogin from "@/components/panel/FuneralHomeLogin";

const FuneralLoginSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FuneralHomeLogin/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default FuneralLoginSite