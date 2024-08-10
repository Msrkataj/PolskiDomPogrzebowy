import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SummaryForm from "@/components/form/SummaryForm";


const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <SummaryForm/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home