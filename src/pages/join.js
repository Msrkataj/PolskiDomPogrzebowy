import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinComponent from "@/components/JoinComponent";


const JoinSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <JoinComponent/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default JoinSite