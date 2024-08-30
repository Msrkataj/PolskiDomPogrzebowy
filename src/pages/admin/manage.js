import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import ManageForm from "@/components/funeral/ManageForm";

const Manage = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <ManageForm/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Manage