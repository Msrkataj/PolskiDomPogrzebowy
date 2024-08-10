import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/form/Form";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Form/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home