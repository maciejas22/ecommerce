/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: 'https://flowery-wrench-production.up.railway.app/api/'
    }
}

module.exports = nextConfig
