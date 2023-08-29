import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4000,
    host: false
  },
  integrations: [tailwind(), compress(), react()]
});