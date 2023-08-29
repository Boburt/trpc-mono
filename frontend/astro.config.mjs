import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import react from "@astrojs/react";
import nodejs from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: nodejs({
    mode: "middleware",
  }),
  output: "hybrid",
  experimental: {
    assets: true,
  },
  image: {
    service: sharpImageService(),
  },
  server: {
    port: 4000,
    host: false,
  },
  integrations: [tailwind(), compress(), react()],
});