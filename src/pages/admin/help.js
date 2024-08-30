import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HelpComponent from "@/components/admin/HelpComponent";

const Manage = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <HelpComponent/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Manage