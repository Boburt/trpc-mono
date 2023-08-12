/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
};

module.exports = nextConfig;
