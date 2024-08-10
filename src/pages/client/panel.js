import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/client/Dashboard";
import Reports from "@/components/client/Reports";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Panel/>
                <Reports/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home