import Elysia, { Context, error } from "elysia";
import { drizzleDb } from "@backend/lib/db";
import cors from "@elysiajs/cors";
import jwt from "@backend/jwt";
import bearer from "@elysiajs/bearer";
import { verifyJwt } from "@backend/lib/bcrypt";
import { users, users_roles } from "backend/drizzle/schema";
import { eq } from "drizzle-orm";
import Redis from "ioredis";
import { CacheControlService } from "@backend/modules/cache_control/service";
import { AssetsService } from "@backend/modules/assets/service";
import { Queue } from "bullmq";

const client = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  //   maxRetriesPerRequest: null,
});
const formSendTgQueueName = `${process.env.PROJECT_PREFIX}form_send_tg`;
const newAssetsAddedQueue = new Queue(
  `${process.env.PROJECT_PREFIX}new_assets_added`,
  {
    connection: client,
  }
);

const cacheControlService = new CacheControlService(drizzleDb, client);
const assetsService = new AssetsService(newAssetsAddedQueue, drizzleDb);

// const permissionExtension = new Elysia({
//   name: "permission_extension",
// }).macro(({ onBeforeHandle }) => {
//   return {
//     permission(permission: string) {
//       onBeforeHandle(({ user, set }) => {
//         console.log("user", user);
//         if (!user) {
//           console.log("set.status");
//           return new Response(
//             JSON.stringify({
//               error: "User not found",
//             }),
//             {
//               status: 401,
//             }
//           );
//           return (set.status = 401);
//           return error(401, "User not found");
//         }

//         if (!user.permissions) {
//           return error(403, "You don't have permissions");
//         }

//         if (!user.permissions.includes(permission)) {
//           return error(403, "You don't have permissions");
//         }
//       });
//     },
//   };
// });

const newIndexManufacturersQueue = new Queue(
  `${process.env.PROJECT_PREFIX}index_manufacturers`,
  {
    connection: client,
  }
);

const newDeleteManufacturersQueue = new Queue(
  `${process.env.PROJECT_PREFIX}delete_manufacturers`,
  {
    connection: client,
  }
);

const newIndexManufacturerReviewQueue = new Queue(
  `${process.env.PROJECT_PREFIX}index_manufacturer_review`,
  {
    connection: client,
  }
);

const newTicketQueue = new Queue(
  `${process.env.PROJECT_PREFIX}new_ticket`,
  {
    connection: client,
  }
);

const ticketStatusChangedQueue = new Queue(
  `${process.env.PROJECT_PREFIX}ticket_status_change`,
  {
    connection: client,
  }
);

const formSendTgQueueNameQueue = new Queue(formSendTgQueueName, {
  connection: client,
});


export const ctx = new Elysia({
  name: "@app/ctx",
})
  .decorate("redis", client)
  .decorate("assetsService", assetsService)
  .decorate("drizzle", drizzleDb)
  .decorate("cacheController", cacheControlService)
  .decorate("newAssetsAddedQueue", newAssetsAddedQueue)
  .decorate("newIndexManufacturersQueue", newIndexManufacturersQueue)
  .decorate("newDeleteManufacturersQueue", newDeleteManufacturersQueue)
  .decorate("newIndexManufacturerReviewQueue", newIndexManufacturerReviewQueue)
  .decorate("formSendTgQueueNameQueue", formSendTgQueueNameQueue)
  .decorate("newTicketQueue", newTicketQueue)
  .decorate("ticketStatusChangedQueue", ticketStatusChangedQueue)
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  )
  .use(bearer())
  .use(jwt)
  .derive(async ({ bearer, cacheController, query }) => {
    let token = bearer;

    if (query && query.token) {
      token = query.token;
    }

    if (!token) {
      return {
        user: null,
      };
    }

    try {
      if (token == process.env.API_TOKEN) {
        return {
          user: null,
        };
      }

      const res = await cacheController.getCachedUserDataByToken(token);

      return {
        user: res,
      };
    } catch (error) {
      console.log("error", error);
      return {
        user: null,
      };
    }
  });

export type ContextType = Context<any, any, any>;
