import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { profiles } from "backend/drizzle/schema";
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

export const profilesController = new Elysia({
  name: "@api/profiles",
})
  .use(ctx)
  .post(
    "/profiles",
    async ({ body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      //   if (!user.permissions.includes("profiles.add")) {
      //     set.status = 401;
      //     return {
      //       message: "You don't have permissions",
      //     };
      //   }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, profiles, {});
      }
      const result = await drizzle
        .insert(profiles)
        .values(
          Object.keys(data).map((key) => ({
            field_name: key,
            field_value: data[key],
            user_id: user.user.id,
          }))
        )
        .returning(selectFields);

      return {
        data: result[0],
      };
    },
    {
      body: t.Object({
        data: t.Record(t.String(), t.Any()),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
