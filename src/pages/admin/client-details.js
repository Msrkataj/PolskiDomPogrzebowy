import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientDetails from "@/components/admin/ClientDetails";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <ClientDetails/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home