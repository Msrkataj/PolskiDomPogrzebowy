import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reviews from "@/components/admin/Reviews";
import Rate from "@/components/admin/Rate";

const FuneralReviews = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Rate/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default FuneralReviews;