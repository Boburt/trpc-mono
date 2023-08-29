/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    TRPC_API_URL: process.env.TRPC_API_URL,
  },
};

module.exports = nextConfig;
