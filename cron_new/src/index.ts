import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(
    cron({
      name: "heartbeat",
      pattern: "0 0 */1 * * *",
      run() {
        console.log("heartbeat cron is working");
      },
    })
  )
  .listen(8080);

console.log(
  `🦊 Cron server is running at ${app.server?.hostname}:${app.server?.port}`
);
