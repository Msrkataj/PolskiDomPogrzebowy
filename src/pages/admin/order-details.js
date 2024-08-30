import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import OrderDetails from "@/components/admin/OrderDetails";

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

export default Home