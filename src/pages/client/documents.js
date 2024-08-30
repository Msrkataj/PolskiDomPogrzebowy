import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Documents from "@/components/client/Documents";

const DocumentsSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main className="main-mobile">
                <Documents/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default DocumentsSite