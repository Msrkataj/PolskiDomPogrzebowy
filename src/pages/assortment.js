import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/form/Form";
import Assortment from "@/components/form/Assortment";
import ChooseFuneral from "@/components/form/ChooseFuneral";

const Home = () => {
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

export default Home