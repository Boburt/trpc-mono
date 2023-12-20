import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { roles } from "backend/drizzle/schema";
import { InferSelectModel, sql, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const rolesController = new Elysia({
  name: "@api/roles",
})
  .use(ctx)
  .get(
    "/roles",
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

      if (!user.permissions.includes("roles.list")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, roles, {});
      }
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(roles)
        .execute();
      const rolesList = (await drizzle
        .select(selectFields)
        .from(roles)
        .limit(+limit)
        .offset(+offset)
        .execute()) as InferSelectModel<typeof roles>[];
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
  .get("/roles/cached", async ({ redis, user, set, cacheController }) => {
    if (!user) {
      set.status = 401;
      return {
        message: "User not found",
      };
    }

    if (!user.permissions.includes("roles.list")) {
      set.status = 401;
      return {
        message: "You don't have permissions",
      };
    }
    const res = await cacheController.getCachedRoles({});
    return res;
  })
  .get(
    "/roles/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("roles.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      const rolesRecord = await drizzle
        .select()
        .from(roles)
        .where(eq(roles.id, id))
        .execute();
      return rolesRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .delete(
    "/roles/:id",
    async ({ params: { id }, user, set, drizzle,
      cacheController }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("roles.delete")) {
        set.status = 401;
        return {
          message: "You don't have roles",
        };
      }

      const permissionsRecord = await drizzle
        .select({
          id: roles.id,
        })
        .from(roles)
        .where(eq(roles.id, id))
        .execute();

      await drizzle.delete(roles).where(eq(roles.id, id)).execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/roles",
    async ({ body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("roles.add")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, roles, {});
      }
      const result = await drizzle
        .insert(roles)
        .values(data)
        .returning(selectFields);

      return {
        data: result[0],
      };
    },
    {
      body: t.Object({
        data: t.Object({
          name: t.String(),
          code: t.Optional(t.Nullable(t.String())),
          active: t.Optional(t.Boolean()),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .put(
    "/roles/:id",
    async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("roles.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, roles, {});
      }
      const result = await drizzle
        .update(roles)
        .set(data)
        .where(eq(roles.id, id))
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
          name: t.String(),
          code: t.Optional(t.Nullable(t.String())),
          active: t.Optional(t.Boolean()),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
