import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import Orders from "@/components/funeral/Orders";
import OrderDetails from "@/components/funeral/OrderDetails";
import dynamic from "next/dynamic";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <OrderDetails/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}
export default dynamic (() => Promise.resolve(Home), {ssr: false})
