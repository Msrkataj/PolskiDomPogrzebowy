/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    publicRuntimeConfig: {
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
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

export default nextConfig;
