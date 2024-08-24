import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@backend/../drizzle/schema";

import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
export const drizzleDb = drizzle(pool, {
  schema,
});

export type DrizzleDB = typeof drizzleDb;
