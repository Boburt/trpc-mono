import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import react from "@astrojs/react";
import nodejs from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import auth from "auth-astro";

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
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    partytown(),
    auth(),
  ],
});
