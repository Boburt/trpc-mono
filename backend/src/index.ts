import { Elysia, type HookHandler, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";
import { staticPlugin } from "@elysiajs/static";
import {
  publicRouter,
  createContext,
  usersService,
  cacheControlService,
  assetsService,
  client as redisClient,
} from "./trpc";
import { router } from "./_routes";
import jwt from "./jwt";
import { db } from "./db";
import { verifyJwt } from "./lib/bcrypt";

const checkRestPermission = async ({
  set,
  request: { headers },
  permission,
}: Parameters<HookHandler>[0] & {
  permission?: string;
}) => {
  const token = headers.get("authorization")?.split(" ")[1] ?? null;
  if (!token) {
    set.status = 401;

    return `Unauthorized`;
  }

  if (!permission) {
    set.status = 403;

    return `Forbidden`;
  }

  if (permission) {
    let jwtResult = await verifyJwt(token);
    if (!jwtResult) {
      set.status = 401;

      return `Unauthorized`;
    }

    if (!jwtResult.payload) {
      set.status = 401;

      return `Unauthorized`;
    }

    let user = await usersService.findOne({
      where: {
        id: jwtResult.payload.id as string,
      },
      include: {
        users_roles_usersTousers_roles_user_id: true,
      },
    });

    if (!user) {
      set.status = 401;

      return `Unauthorized`;
    }

    const permissions = await cacheControlService.getPermissionsByRoleId(
      user.users_roles_usersTousers_roles_user_id[0].role_id
    );
    if (permissions.length === 0) {
      set.status = 403;

      return `Forbidden`;
    }

    if (!permissions.includes(permission)) {
      set.status = 403;

      return `Forbidden`;
    }

    // if (ctx.permissionsService.hasPermission(meta.permission)) {
    //   return next();
    // } else {
    //   throw new Error("No permission");
    // }
  }
};

const app = new Elysia()
  .use(
    staticPlugin({
      assets: "../uploads",
    })
  )
  .state("prisma", db)
  .state("redis", redisClient)
  .state("assetsService", assetsService)
  .use(cors())
  .use(jwt)
  .get("/", () => ({ hello: "world" }))
  .decorate("permission", "assets.add")
  .post(
    "/upload-assets",
    ({ body, store: { assetsService } }) => {
      return assetsService.addAsset(body);
    },
    {
      body: t.Object({
        model: t.String(),
        name: t.String(),
        file: t.File(),
        code: t.Optional(t.String()),
        model_id: t.Optional(t.String()),
      }),
      beforeHandle: checkRestPermission,
    }
  )
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
