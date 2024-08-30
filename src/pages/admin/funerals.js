import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralHomesTable from "@/components/admin/FuneralHomesTable";

const FuneralsSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FuneralHomesTable/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default FuneralsSite