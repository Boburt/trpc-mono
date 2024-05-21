// disablePrerenderPlugin.js

export default function disablePrerenderPlugin() {
  return {
    name: "disable-prerender",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        injectScript("page-ssr", "export const prerender = false;");
      },
    },
  };
}
