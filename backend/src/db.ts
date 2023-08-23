import { PrismaClient } from "@prisma/client";
import pagination from "prisma-extension-pagination";

export const db = new PrismaClient().$extends(pagination);

// export return type of db
export type DB = typeof db;
