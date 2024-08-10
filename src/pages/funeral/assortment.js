import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import ManageForm from "@/components/funeral/ManageForm";
import FuneralHomeAssortment from "@/components/funeral/FuneralHomeAssortment";

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