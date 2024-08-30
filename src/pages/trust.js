import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChooseFuneral from "@/components/form/ChooseFuneral";
import FuneralDetailsForm from "@/components/form/FuneralDetailsForm";
import AboutUs from "@/components/mission/about-us";
import AboutUsSecond from "@/components/mission/about-us-second";
import Trust from "@/components/trust/Trust";
import TrustSecond from "@/components/trust/TrustSecond";

const TrustUs = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Trust/>
                <TrustSecond/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default TrustUs