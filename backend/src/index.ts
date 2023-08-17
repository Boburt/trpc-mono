import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";

import { publicRouter, createContext } from "./trpc";
import { router } from "./_routes";
import { jwt } from "@elysiajs/jwt";

const app = new Elysia()
  .use(cors())
  // .use(
  //   jwt({
  //     name: "jwt",
  //     secret: process.env.JWT_SECRET!,
  //   })
  // )
  .get("/", () => ({ hello: "world" }))
  // .get("/me", ({ jwt }) => {
  //   const sign = jwt.sign({ hello: "world" });
  //   return sign;
  // })
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
  .onStop(() => {
    console.log("🦊 Elysia is stopping...");
  })
  .listen(3000);

export type App = typeof app;

app.onStop(() => {
  console.log("🦊 Elysia is stopping...");
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
