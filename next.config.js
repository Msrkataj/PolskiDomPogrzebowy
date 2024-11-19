// next.config.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    publicRuntimeConfig: {
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
    env: {
        EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
    },
    async redirects() {
        return [
            {
                source: '/funeral/checkFirstLogin',
                destination: '/funeral/panel',
                permanent: true,
            },
            {
                source: '/funeral/first',
                destination: '/funeral/panel',
                permanent: true,
            },
        ];
    },
};

// Export the configuration with Bundle Analyzer
module.exports = withBundleAnalyzer(nextConfig);
