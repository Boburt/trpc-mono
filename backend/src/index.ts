import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";

import { publicRouter, createContext } from "./trpc";
import { router } from "./_routes";
import jwt from "./jwt";

const app = new Elysia()
  .use(cors())
  .use(jwt)
  .get("/", () => ({ hello: "world" }))
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
