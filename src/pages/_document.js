// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="pl">
                <Head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                    <link rel="icon" type="image/webp" sizes="32x32" href="/favicon.webp" />
                    <link rel="icon" type="image/webp" sizes="16x16" href="/favicon.webp" />
                    <link rel="apple-touch-icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
