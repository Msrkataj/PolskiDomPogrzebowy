import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stats from "@/components/admin/stats";

const StatsSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Stats/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default StatsSite