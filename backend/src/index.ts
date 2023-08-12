import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";

import { publicRouter, createContext } from "./trpc";
import { router } from "./_routes";

const app = new Elysia()
  .use(cors())
  .get("/", () => ({ hello: "world" }))
  .use(
    trpc(router, {
      createContext,
      responseMeta: (opts) => {
        const { ctx, paths, errors, type } = opts;
        // assuming you have all your public routes with the keyword `public` in them
        const allPublic =
          paths && paths.every((path: string) => path.includes("public"));
        // checking that no procedures errored
        const allOk = errors.length === 0;
        // checking we're doing a query request
        const isQuery = type === "query";
        if (ctx?.res && allPublic && allOk && isQuery) {
          // cache request for 1 day + revalidate once every second
          const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
          return {
            headers: {
              "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
            },
          };
        }
        return {};
      },
    })
  )
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
