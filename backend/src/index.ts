
import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";
import app from "./app";

if (process.env.NODE_ENV === "development") {
  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
} else {
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Start N workers for the number of CPUs
    for (let i = 0; i < cpus().length; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} exited`);
    });
  } else {

    app.listen(3000);

    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  }

}


