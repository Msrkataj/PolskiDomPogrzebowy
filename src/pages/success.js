import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/form/Form";
import Success from "@/components/form/Success";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Success/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home