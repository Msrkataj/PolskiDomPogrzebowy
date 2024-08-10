import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import MyFuneral from "@/components/funeral/MyFuneral";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <MyFuneral/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home