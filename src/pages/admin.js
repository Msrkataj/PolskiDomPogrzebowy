import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FuneralHomeLogin from "@/components/panel/FuneralHomeLogin";
import AdminLogin from "@/components/panel/AdminLogin";

const AdminLoginSite = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <AdminLogin/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default AdminLoginSite