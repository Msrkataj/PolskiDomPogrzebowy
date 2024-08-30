import React, {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/search/Search";
import Results from "@/components/search/Results";
import ChatComponent from "@/components/common/ChatComponent";

const SearchHome = () => {
    const [minimized, setMinimized] = useState(true);

    const handleOpenChat = () => {
        setMinimized(false);
    };

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
            <ChatComponent minimized={minimized} setMinimized={setMinimized} />
        </>
    );
}

export default SearchHome