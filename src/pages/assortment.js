import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Assortment from "@/components/form/Assortment";
import ChooseFuneral from "@/components/form/ChooseFuneral";

const AssortymentHome = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main >
                <ChooseFuneral success={false}/>
                <Assortment/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default AssortymentHome