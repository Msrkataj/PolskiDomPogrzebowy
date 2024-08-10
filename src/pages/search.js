import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/search/Search";
import Results from "@/components/search/Results";

const Home = () => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Search/>
                <Results/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Home