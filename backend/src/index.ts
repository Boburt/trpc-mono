import { Elysia, type HookHandler, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";
import { staticPlugin } from "@elysiajs/static";
import {
  createContext,
} from "./trpc";
import { router } from "./_routes";
import { apiController } from "./modules/controllers";
import serverTiming from "@elysiajs/server-timing";

const app = new Elysia()
  .use(serverTiming())
  .use(
    staticPlugin({
      assets: "../uploads",
    })
  )
  .get("/", () => ({ hello: "world" }))
  .use(apiController)
  .decorate("permission", "assets.add")
  .use(
    trpc(router, {
      createContext,
    })
  )
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
