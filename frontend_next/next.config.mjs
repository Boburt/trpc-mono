/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   ppr: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.0.108",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.0.213",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.fungeek.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
