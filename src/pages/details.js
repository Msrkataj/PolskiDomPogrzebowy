import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/form/Form";
import Details from "@/components/form/Details";
import DetailsSecond from "@/components/form/DetailsSecond";
import FormPage from "@/components/form/FormPage";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FormPage/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home