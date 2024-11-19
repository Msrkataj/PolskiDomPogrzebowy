import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralHomeAssortment from "@/components/funeral/FuneralHomeAssortment";
import dynamic from "next/dynamic";

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

export default dynamic (() => Promise.resolve(Assortment), {ssr: false})
