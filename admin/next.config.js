/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // swcTraceProfiling: true,
    externalDir: true,
    // swcPlugins: [
    //   [
    //     "next-superjson-plugin",
    //     {
    //       excluded: [],
    //     },
    //   ],
    // ],
  },
  env: {
    TRPC_API_URL: process.env.TRPC_API_URL,
  },
};

module.exports = nextConfig;
