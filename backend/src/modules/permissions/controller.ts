import { permissions } from "backend/drizzle/schema";
import { InferSelectModel, eq, sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import Redis from "ioredis";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";
import { ctx } from "@backend/context";

export const permissionsController = new Elysia({
  name: "@api/permissions",
})
  .use(ctx)
  .get(
    "/permissions",
    async ({
      query: { limit, offset, sort, filter, fields },
      user,
      set,
      drizzle,
    }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("permissions.list")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, permissions, {});
      }
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(permissions)
        .execute();
      const rolesList = (await drizzle
        .select(selectFields)
        .from(permissions)
        .limit(+limit)
        .offset(+offset)
        .execute()) as InferSelectModel<typeof permissions>[];
      return {
        total: rolesCount[0].count,
        data: rolesList,
      };
    },
    {
      query: t.Object({
        limit: t.String(),
        offset: t.String(),
        sort: t.Optional(t.String()),
        filter: t.Optional(
          t.Object({
            id: t.Number(),
            name: t.String(),
            email: t.String(),
            address: t.String(),
            phone: t.String(),
          })
        ),
        fields: t.Optional(t.String()),
      }),
    }
  )
  .get("/permissions/cached", async ({ redis, user, set }) => {
    if (!user) {
      set.status = 401;
      return {
        message: "User not found",
      };
    }

    if (!user.permissions.includes("permissions.list")) {
      set.status = 401;
      return {
        message: "You don't have permissions",
      };
    }
    const res = await redis.get(`${process.env.PROJECT_PREFIX}_permissions`);
    return JSON.parse(res || "[]");
  })
  .get(
    "/permissions/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("permissions.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      const permissionsRecord = await drizzle
        .select()
        .from(permissions)
        .where(eq(permissions.id, id))
        .execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .delete(
    "/permissions/:id",
    async ({ params: { id }, user, set, drizzle,
      cacheController }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("permissions.delete")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      const permissionsRecord = await drizzle
        .select({
          id: permissions.id,
        })
        .from(permissions)
        .where(eq(permissions.id, id))
        .execute();

      await drizzle.delete(permissions).where(eq(permissions.id, id)).execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/permissions",
    async ({ body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("permissions.add")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, permissions, {});
      }
      const result = await drizzle
        .insert(permissions)
        .values(data)
        .returning(selectFields);

      return {
        data: result[0],
      };
    },
    {
      body: t.Object({
        data: t.Object({
          slug: t.String(),
          description: t.String(),
          active: t.Optional(t.Boolean()),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .put(
    "/permissions/:id",
    async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("permissions.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, permissions, {});
      }
      const result = await drizzle
        .update(permissions)
        .set(data)
        .where(eq(permissions.id, id))
        .returning(selectFields);

      return {
        data: result[0],
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        data: t.Object({
          slug: t.String(),
          description: t.String(),
          active: t.Optional(t.Boolean()),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
