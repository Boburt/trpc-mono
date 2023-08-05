import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";

import { publicRouter, createContext } from "./trpc";
import { router } from "./_routes";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
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
