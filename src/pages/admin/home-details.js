import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import MyFuneral from "@/components/funeral/MyFuneral";
import FuneralHomeDetails from "@/components/admin/FuneralHomeDetails";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <FuneralHomeDetails/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home