// trpc.ts
import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createClient } from "redis";

import { PrismaClient } from "@prisma/client";
import pagination from "prisma-extension-pagination";
import { PermissionsService } from "./modules/permissions/service";
import { RolesService } from "./modules/roles/service";
import { RolesPermissionsService } from "./modules/roles_permissions/service";
import { UsersService } from "./modules/users/service";
import { UsersPermissionsService } from "./modules/users_permissions/service";
import { UsersRolesService } from "./modules/users_roles/service";
import { WorkSchedulesService } from "./modules/work_schedules/service";
import { TerminalsService } from "./modules/terminals/service";
import { OrganizationService } from "./modules/organization/service";
import { UsersTerminalsService } from "./modules/users_terminals/service";
import { CacheControlService } from "./modules/cache_control/service";
import { SessionsService } from "./modules/sessions/service";

export const db = new PrismaClient().$extends(pagination);

// export return type of db
export type DB = typeof db;

const client = createClient();
export type RedisClientType = typeof client;

await client.connect();
const cacheControlService = new CacheControlService(db, client);
const permissionsService = new PermissionsService(db, cacheControlService);
const rolesService = new RolesService(db, cacheControlService);
const rolesPermissionsService = new RolesPermissionsService(db);
const usersService = new UsersService(db);
const usersPermissionsService = new UsersPermissionsService(db);
const usersRolesService = new UsersRolesService(db);
const workSchedulesService = new WorkSchedulesService(db);
const terminalsService = new TerminalsService(db, cacheControlService);
const organizationService = new OrganizationService(db, cacheControlService);
const usersTerminalsService = new UsersTerminalsService(db);
const sessionsService = new SessionsService(db);

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    prisma: db,
    permissionsService,
    rolesService,
    rolesPermissionsService,
    usersService,
    usersPermissionsService,
    usersRolesService,
    workSchedulesService,
    terminalsService,
    organizationService,
    usersTerminalsService,
    cacheControlService,
    sessionsService,
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();

export const publicProcedure = t.procedure;
export const publicRouter = t.router;
