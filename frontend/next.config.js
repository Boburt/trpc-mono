/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
    externalDir: true,
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
