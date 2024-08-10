import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import Orders from "@/components/funeral/Orders";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Orders/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home