import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralHomeApplicationsTable from "@/components/admin/FuneralHomeApplicationsTable";

const FuneralsSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FuneralHomeApplicationsTable/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default FuneralsSite