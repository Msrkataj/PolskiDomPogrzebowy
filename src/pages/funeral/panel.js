import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Panel/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home