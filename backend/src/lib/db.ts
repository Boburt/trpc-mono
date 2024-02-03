import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@backend/../drizzle/schema";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!, {
  idle_timeout: 0,
  max_lifetime: 0,
});
export const drizzleDb = drizzle(queryClient, {
  schema,
});

export type DrizzleDB = typeof drizzleDb;
