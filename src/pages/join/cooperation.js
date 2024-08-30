import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Join from "@/components/join/Join";
import JoinComponent from "@/components/JoinComponent";

const Mission = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Join/>
                <JoinComponent/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Mission