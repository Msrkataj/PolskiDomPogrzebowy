import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FirstLogin from "@/components/funeral/FirstLogin";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FirstLogin/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home