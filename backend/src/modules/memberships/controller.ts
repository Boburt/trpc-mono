import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { memberships } from "backend/drizzle/schema";
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
      const result = (await drizzle
        .insert(memberships)
        .values(data)
        .returning(selectFields)) as InferSelectModel<typeof memberships>[];

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
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
