// import { users } from "@backend/../drizzle/schema";
/// <reference path="@backend/../drizzle/schema" />
/// <reference path="drizzle-orm/table.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user?: InferSelectModel<typeof users>;
    permissions?: string[];
  }
}
