import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panel from "@/components/funeral/Dashboard";
import Rewiews from "@/pages/funeral/reviews";
import Reviews from "@/components/funeral/Reviews";

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