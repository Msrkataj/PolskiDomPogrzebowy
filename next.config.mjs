import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.resolve.alias['@components'] = path.join(__dirname, 'src/components');
        config.resolve.alias['@pages'] = path.join(__dirname, 'src/pages');

        // Dodajemy konfigurację dla ładowania SCSS
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
            include: path.resolve(__dirname, 'src')
        });

        return config;
    },

};

export default nextConfig;
