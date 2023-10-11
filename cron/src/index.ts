import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";
import fs from "fs";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(
    cron({
      name: "heartbeat",
      pattern: "0 * * * * *",
      async run() {
        console.log("heartbeat cron is working");
        // await fs.appendFileSync("heartbeat.txt", "heartbeat\n");
      },
    })
  )
  .listen(8080);

console.log(
  `🦊 Cron server is running at ${app.server?.hostname}:${app.server?.port}`
);
