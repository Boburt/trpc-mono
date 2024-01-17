/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
    "./node_modules/@nextui-org/theme/dist/components/table.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    // themes: [
    //   {
    //     light: {
    //       ...require("daisyui/src/theming/themes")["[data-theme=light]"],
    //       primary: "#2563eb",
    //       secondary: "#22d3ee",
    //       error: "#dc2626",
    //     },
    //   },
    //   {
    //     dark: {
    //       ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
    //       primary: "#2563eb",
    //       secondary: "#22d3ee",
    //       error: "#dc2626",
    //     },
    //   },
    // ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("preline/plugin"),
    nextui(),
  ],
};
