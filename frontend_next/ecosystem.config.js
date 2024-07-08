module.exports = {
  apps: [
    {
      name: "frontend_next",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
        NEXTAUTH_SECRET: "n5ynN6IqRw67agHnmBLvvpqssgfdrdsY6gI4YIUvVD8=",
        NEXTAUTH_URL: "https://dev.fungeek.net",
        NEXT_PUBLIC_API_URL: "https://api.fungeek.net",
        WEB_URL: "http://localhost:4000",
        NEXT_PUBLIC_WSS_URL: "ws://api.fungeek.net/ws",
        PORT: 4000,
      },
    },
  ],
};
