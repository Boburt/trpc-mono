import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import nodejs from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import auth from "auth-astro";
import * as sass from "sass";

import tunnel from "astro-tunnel";

// https://astro.build/config
export default defineConfig({
  adapter: nodejs({
    mode: "standalone",
  }),
  output: "server",
  image: {
    service: sharpImageService(),
  },
  server: {
    port: 4000,
    host: true,
  },
  site: process.env.WEB_URL,
  prefetch: false,
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
  },
  integrations: [react(), sitemap(), partytown(), auth()],
});
