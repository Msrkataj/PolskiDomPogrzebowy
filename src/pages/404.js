import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Custom404 = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
            background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
            color: '#ffffff',
            textAlign: 'center',
            padding: '20px',
        },
        content: {
            maxWidth: '600px',
        },
        title: {
            fontSize: '10rem',
            fontWeight: '900',
            margin: '0',
            color: '#fff',
        },
        subtitle: {
            fontSize: '2rem',
            margin: '10px 0',
        },
        description: {
            fontSize: '1.2rem',
            marginBottom: '30px',
            color: '#f7f7f7',
        },
        button: {
            padding: '15px 30px',
            fontSize: '1.1rem',
            backgroundColor: '#ffffff',
            color: '#ff5f6d',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#ff5f6d',
            color: '#ffffff',
        },
        animation: {
            marginTop: '30px',
            animation: 'float 4s ease-in-out infinite',
        },
        image: {
            width: '300px',
            maxWidth: '100%',
        },
        '@keyframes float': {
            '0%': { transform: 'translatey(0px)' },
            '50%': { transform: 'translatey(-20px)' },
            '100%': { transform: 'translatey(0px)' },
        },
    };

    return (
        <>
            <header>
                <Header/>
            </header>
            <main style={styles.container}>
                <div style={styles.content}>
                    <h1 style={styles.title}>404</h1>
                    <p style={styles.subtitle}>Ups! Nie znaleźliśmy tej strony.</p>
                    <p style={styles.description}>
                        Strona, której szukasz, mogła zostać usunięta, zmieniono jej nazwę lub jest tymczasowo niedostępna.
                    </p>
                    <Link href="/">
                        <button
                            style={styles.button}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5f6d'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                        >
                            Wróć do strony głównej
                        </button>
                    </Link>
                </div>
                <div style={styles.animation}>
                </div>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
};

export default Custom404;
