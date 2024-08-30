import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLogin from "@/components/panel/ClientLogin";
import SummaryForm from "@/components/form/SummaryForm";

const LoginClientSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <ClientLogin/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default LoginClientSite