import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reviews from "@/components/admin/Reviews";

const FuneralReviews = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Reviews/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default FuneralReviews;