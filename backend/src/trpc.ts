// trpc.ts
import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { PrismaClient } from "@prisma/client";
import pagination from "prisma-extension-pagination";

const db = new PrismaClient().$extends(pagination);

// export return type of db
export type DB = typeof db;

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    name: "elysia",
    prisma: db,
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();

export const publicProcedure = t.procedure;
export const publicRouter = t.router;
