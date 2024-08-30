import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Funeral from "@/components/client/Funeral";

const FuneralClient = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main className="main-mobile">
                <Funeral/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default FuneralClient