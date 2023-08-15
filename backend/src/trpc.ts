// trpc.ts
import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

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

export const db = new PrismaClient().$extends(pagination);

// export return type of db
export type DB = typeof db;

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  let permissionsService = new PermissionsService(db);
  let rolesService = new RolesService(db);
  let rolesPermissionsService = new RolesPermissionsService(db);
  let usersService = new UsersService(db);
  let usersPermissionsService = new UsersPermissionsService(db);
  let usersRolesService = new UsersRolesService(db);
  let workSchedulesService = new WorkSchedulesService(db);
  let terminalsService = new TerminalsService(db);
  let organizationService = new OrganizationService(db);
  let usersTerminalsService = new UsersTerminalsService(db);
  return {
    name: "elysia",
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
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();

export const publicProcedure = t.procedure;
export const publicRouter = t.router;
