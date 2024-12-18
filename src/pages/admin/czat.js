import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import Orders from "@/components/funeral/Orders";
import OrderDetails from "@/components/funeral/OrderDetails";
import ClientsComponet from "@/components/funeral/ClientsComponet";
import ClientsComponets from "@/components/admin/ClientsComponets";
import Czat from "@/pages/admin/czat";
import AdminChats from "@/components/common/ChatAdmin";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <AdminChats/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home