import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FirstForm from "@/components/funeral/FirstForm";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FirstForm/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home