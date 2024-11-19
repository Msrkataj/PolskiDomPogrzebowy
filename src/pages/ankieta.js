import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import Ankieta_module from "@/components/funeral/Ankieta_module";

const AnkietaPage = () => {


    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Ankieta_module/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default dynamic (() => Promise.resolve(AnkietaPage), {ssr: false})
