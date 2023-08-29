import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

new Elysia()
  .use(
    staticPlugin({
      assets: "/dist/client",
    })
  )
  .use(ssrHandler)
  .listen(4000);
