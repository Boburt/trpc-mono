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
  env: {
    TRPC_API_URL: process.env.TRPC_API_URL,
  },
};

module.exports = nextConfig;

// import million from "million/compiler";
// const nextConfig = {
//   experimental: {
//     swcPlugins: [
//       [
//         "next-superjson-plugin",
//         {
//           excluded: [],
//         },
//       ],
//     ],
//     externalDir: true,
//   },
//   reactStrictMode: true,
// };

// const millionConfig = {
//   auto: true,
//   // if you're using RSC:
//   // auto: { rsc: true },
// };

// export default million.next(nextConfig, millionConfig);
