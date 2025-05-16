/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SOCKET_URL: process.env.SOCKET_URL
  },
  reactStrictMode: false,
}

module.exports = nextConfig
