import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import nodejs from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import auth from "auth-astro";

import tunnel from "astro-tunnel";

// https://astro.build/config
export default defineConfig({
  adapter: nodejs({
    mode: "middleware",
  }),
  output: "hybrid",
  image: {
    service: sharpImageService(),
  },
  server: {
    port: 4000,
    host: true,
  },
  site: process.env.WEB_URL,
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    partytown(),
    auth(),
    tunnel({
      port: 4000,
    }),
  ],
});
