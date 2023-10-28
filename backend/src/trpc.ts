// trpc.ts

import { TRPCError, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createClient } from "redis";
import Redis from "ioredis";
import { Queue } from "bullmq";

import { PermissionsService } from "./modules/permissions/service";
import { RolesService } from "./modules/roles/service";
import { RolesPermissionsService } from "./modules/roles_permissions/service";
import { UsersService } from "./modules/users/service";
import { UsersPermissionsService } from "./modules/users_permissions/service";
import { UsersRolesService } from "./modules/users_roles/service";
import { CacheControlService } from "./modules/cache_control/service";
import { SessionsService } from "./modules/sessions/service";
import { ApiTokensService } from "./modules/api_tokens/service";
import { db } from "./db";
import { verifyJwt } from "./lib/bcrypt";
import { LangsService } from "./modules/langs/service";
import { CategoriesService } from "./modules/categories/service";
import { ImageSizesService } from "./modules/image_sizes/service";
import { AssetsService } from "./modules/assets/service";
import { ManufacturersService } from "./modules/manufacturers/service";
import { ManufacturersCategoriesService } from "./modules/manufacturers_categories/service";
import { CitiesService } from "./modules/cities/service";
import { ManufacturersPropertiesCategoriesService } from "./modules/manufacturers_properties_categories/service";
import { ManufacturersPropertiesService } from "./modules/manufacturers_properties/service";
import { UsersWithRelations } from "./lib/zod";
import { ManufacturersReviewsService } from "./modules/manufacturers_reviews/service";
import { SeoLinksService } from "./modules/seo_links/service";

// redis
export const client = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  //   maxRetriesPerRequest: null,
});
export type RedisClientType = typeof client;

// bull queues

export const newAssetsAddedQueue = new Queue(
  `${process.env.PROJECT_PREFIX}new_assets_added`,
  {
    connection: client,
  }
);

export const newIndexManufacturersQueue = new Queue(
  `${process.env.PROJECT_PREFIX}index_manufacturers`,
  {
    connection: client,
  }
);

export const newDeleteManufacturersQueue = new Queue(
  `${process.env.PROJECT_PREFIX}delete_manufacturers`,
  {
    connection: client,
  }
);

export const newIndexManufacturerReviewQueue = new Queue(
  `${process.env.PROJECT_PREFIX}index_manufacturer_review`,
  {
    connection: client,
  }
);

// services
export const cacheControlService = new CacheControlService(db, client);
const permissionsService = new PermissionsService(db, cacheControlService);
const rolesService = new RolesService(db, cacheControlService);
const rolesPermissionsService = new RolesPermissionsService(
  db,
  cacheControlService
);
export const usersService = new UsersService(db, cacheControlService);
const usersPermissionsService = new UsersPermissionsService(db);
const usersRolesService = new UsersRolesService(db);
const sessionsService = new SessionsService(db);
const apiTokensService = new ApiTokensService(db, cacheControlService);
const langsService = new LangsService(db, cacheControlService);
const categoriesService = new CategoriesService(db, cacheControlService);
const imageSizesService = new ImageSizesService(db, cacheControlService);
const seoLinksService = new SeoLinksService(db, cacheControlService);
export const assetsService = new AssetsService(db, newAssetsAddedQueue);
const manufacturersService = new ManufacturersService(
  db,
  cacheControlService,
  newDeleteManufacturersQueue,
  newIndexManufacturerReviewQueue
);
const citiesService = new CitiesService(db, cacheControlService);

const manufacturersCategories = new ManufacturersCategoriesService(db);
const manufacturersPropertiesCategories =
  new ManufacturersPropertiesCategoriesService(db, cacheControlService);
const manufacturersProperties = new ManufacturersPropertiesService(
  db,
  cacheControlService,
  newIndexManufacturersQueue
);
const manufacturersReviewsService = new ManufacturersReviewsService(
  db,
  newIndexManufacturerReviewQueue
);

interface Meta {
  permission?: string;
}

// context trpc
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    // prisma: db,
    permissionsService,
    rolesService,
    rolesPermissionsService,
    usersService,
    usersPermissionsService,
    usersRolesService,
    cacheControlService,
    sessionsService,
    apiTokensService,
    langsService,
    categoriesService,
    imageSizesService,
    manufacturersService,
    manufacturersCategories,
    assetsService,
    citiesService,
    manufacturersPropertiesCategoriesService: manufacturersPropertiesCategories,
    manufacturersPropertiesService: manufacturersProperties,
    manufacturersReviewsService,
    seoLinksService,
    token: opts.req.headers.get("authorization")?.split(" ")[1] ?? null,
    user: null as Omit<UsersWithRelations, "password"> | null,
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .meta<Meta>()
  .create();
// @ts-ignore
export const checkPermission = t.middleware(async ({ meta, next, ctx }) => {
  if (!ctx.token) {
    return new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  if (!meta?.permission) {
    return new TRPCError({
      code: "FORBIDDEN",
      message: "Forbidden",
    });
  }

  if (meta.permission) {
    let jwtResult = await verifyJwt(ctx.token);
    if (!jwtResult) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    if (!jwtResult.payload) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    let user = await ctx.usersService.findOne({
      where: {
        id: jwtResult.payload.id as string,
      },
      include: {
        users_roles_usersTousers_roles_user_id: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    const permissions = await ctx.cacheControlService.getPermissionsByRoleId(
      user.users_roles_usersTousers_roles_user_id[0].role_id
    );
    if (permissions.length === 0) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Forbidden",
      });
    }

    if (!permissions.includes(meta.permission)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Forbidden",
      });
    }

    return next();
    // if (ctx.permissionsService.hasPermission(meta.permission)) {
    //   return next();
    // } else {
    //   throw new Error("No permission");
    // }
  } else {
    return next();
  }
});

export const checkUser = t.middleware(async ({ next, ctx }) => {
  if (!ctx.token) {
    new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  let jwtResult = await verifyJwt(ctx.token!);
  if (!jwtResult) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  if (!jwtResult.payload) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  let user = await ctx.usersService.findOne({
    where: {
      id: jwtResult.payload.id as string,
    },
    include: {
      users_roles_usersTousers_roles_user_id: true,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  ctx.user = user;
  return next();
});

export const publicProcedure = t.procedure;
export const publicRouter = t.router;
