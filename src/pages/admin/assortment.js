import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralHomeAssortment from "@/components/admin/FuneralHomeAssortment";

const Assortment = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FuneralHomeAssortment/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Assortment