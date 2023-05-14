/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flowery-wrench-production.up.railway.app',
                port: '',
                pathname: '/api/media/assets/products/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/api/media/assets/products/**',
            }
        ],
    },
}

module.exports = nextConfig
