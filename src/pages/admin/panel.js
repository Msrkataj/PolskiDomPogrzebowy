import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/admin/Dashboard";
import Stats from "@/components/admin/stats";
import AuthGuard from "@/components/panel/AuthGuard";

const HomeAdmin = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <AuthGuard>
            <main>
                <Stats/>
                <Panel/>
            </main>
            </AuthGuard>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default HomeAdmin