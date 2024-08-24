import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { apiController } from "./modules/controllers";
import { serverTiming } from "@elysiajs/server-timing";
import { conversations, messages, users } from "@backend/../drizzle/schema";
import { eq } from "drizzle-orm";
import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";
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
  const app = new Elysia()
    .use(
      staticPlugin({
        assets: "../uploads",
      })
    )
    .get("/", () => ({ hello: "world" }))
    .use(apiController)
    .ws("/ws", {
      body: t.Object({
        message: t.String(),
        conversation_id: t.String(),
        type: t.Union([
          t.Literal("subscribe"),
          t.Literal("unsubscribe"),
          t.Literal("publish"),
        ]),
      }),
      open(ws) {
        // console.log('before open', ws.data.user);
        // console.log('before open', ws.data.body);
        if (!ws.data.user) {
          ws.terminate();
        }
      },
      async message(ws, { message, conversation_id, type }) {
        if (!ws.data.user) {
          return ws.terminate();
        }
        try {
          let conversation = await ws.data.drizzle
            .select()
            .from(conversations)
            .where(eq(conversations.id, conversation_id))
            .execute();
          if (!conversation.length) {
            return ws.terminate();
          }

          if (type === "subscribe") {
            ws.subscribe(conversation_id);
            ws.send("subscribed");
            const messageData = await ws.data.drizzle
              .select({
                id: messages.id,
                message: messages.message,
                sent_at: messages.sent_at,
                user: {
                  id: users.id,
                  first_name: users.first_name,
                  last_name: users.last_name,
                },
              })
              .from(messages)
              .leftJoin(users, eq(messages.sender_id, users.id))
              .where(eq(messages.conversation_id, conversation_id))
              .execute();

            for (let i = 0; i < messageData.length; i++) {
              ws.send({
                ...messageData[i],
                type: "message",
              });
            }
          } else if (type === "unsubscribe") {
            ws.unsubscribe(conversation_id);
            ws.send("unsubscribed");
          } else if (type === "publish") {
            try {
              const newMessage = await ws.data.drizzle
                .insert(messages)
                .values({
                  conversation_id: conversation_id,
                  sender_id: ws.data.user.user.id,
                  message: message,
                  sent_at: new Date().toISOString(),
                })
                .returning({
                  id: messages.id,
                })
                .execute();

              const messageData = await ws.data.drizzle
                .select({
                  id: messages.id,
                  message: messages.message,
                  sent_at: messages.sent_at,
                  user: {
                    id: users.id,
                    first_name: users.first_name,
                    last_name: users.last_name,
                  },
                })
                .from(messages)
                .leftJoin(users, eq(messages.sender_id, users.id))
                .where(eq(messages.id, newMessage[0].id))
                .execute();

              ws.send({
                ...messageData[0],
                type: "message",
              });
              return ws.publish(conversation_id, {
                ...messageData[0],
                type: "message",
              });
            } catch (e) {
              console.log(e);
            }
          }
        } catch (error) {
          return ws.terminate();
        }
        ws.send(message);
      },
    })
    .listen(3000);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

// export type App = typeof app;
