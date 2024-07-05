import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { membership_users, memberships } from "backend/drizzle/schema";
import {
  sql,
  InferSelectModel,
  eq,
  SQLWrapper,
  and,
  inArray,
} from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const membershipsController = new Elysia({
  name: "@api/memberships",
})
  .use(ctx)
  .post(
    "/memberships",
    async ({ body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      //   if (!user.permissions.includes("memberships.add")) {
      //     set.status = 401;
      //     return {
      //       message: "You don't have permissions",
      //     };
      //   }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, memberships, {});
      }

      let result;
      try {
        result = (await drizzle
          .insert(memberships)
          .values(data)
          .returning(selectFields)) as InferSelectModel<typeof memberships>[];

        await drizzle.insert(membership_users).values({
          user_id: user.user.id,
          membership_id: result[0].id,
          is_admin: true,
        });
      } catch (error) {
        console.log("Error", error);
        throw error;
      }

      return result[0];
    },
    {
      body: t.Object({
        data: t.Object({
          name: t.Optional(t.String()),
          short_name: t.Optional(t.String()),
          description: t.Optional(t.String()),
          active: t.Optional(t.Boolean()),
          type: t.String(),
          org_type: t.Optional(t.String()),
          country: t.Optional(t.String()),
          city: t.Optional(t.String()),
          rating: t.Optional(t.Number()),
          ein: t.Optional(t.Number()),
          address: t.Optional(t.String()),
          fact_address: t.Optional(t.String()),
          email: t.Optional(t.String()),
          web_site: t.Optional(t.String()),
          vat: t.Optional(t.Boolean()),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .put(
    "/memberships/:id",
    async ({ body: { data, fields }, params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      //   if (!user.permissions.includes("memberships.update")) {
      //     set.status = 401;
      //     return {
      //       message: "You don't have permissions",
      //     };
      //   }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, memberships, {});
      }

      let result;
      try {
        result = (await drizzle
          .update(memberships)
          .set(data)
          .where(eq(memberships.id, id))
          .returning(selectFields)) as InferSelectModel<typeof memberships>[];
      } catch (error) {
        console.log("Error", error);
        throw error;
      }

      return result[0];
    },
    {
      body: t.Object({
        data: t.Object({
          id: t.Optional(t.String()),
          name: t.Optional(t.Nullable(t.String())),
          short_name: t.Optional(t.Nullable(t.String())),
          description: t.Optional(t.Nullable(t.String())),
          active: t.Optional(t.Boolean()),
          type: t.Optional(t.String()),
          org_type: t.Optional(t.String()),
          country: t.Optional(t.String()),
          city: t.Optional(t.Nullable(t.String())),
          rating: t.Optional(t.Nullable(t.Number())),
          ein: t.Optional(t.Numeric()),
          address: t.Optional(t.String()),
          fact_address: t.Optional(t.String()),
          email: t.Optional(t.String()),
          web_site: t.Optional(t.Nullable(t.String())),
          vat: t.Optional(t.Boolean()),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
      params: t.Object({
        id: t.String(),
      }),
    }
  );
