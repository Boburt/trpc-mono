import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import {
  membership_users,
  memberships,
  profiles,
} from "backend/drizzle/schema";
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
    async ({
      body: { data, fields, reference_id, org_type },
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

      const result = (await drizzle
        .insert(profiles)
        .values(
          Object.keys(data).map((key) => ({
            field_name: key,
            field_value: data[key],
            user_id: user.user.id,
            reference_id: reference_id,
          }))
        )
        .returning(selectFields)) as InferSelectModel<typeof profiles>[];

      await drizzle
        .update(memberships)
        .set({
          org_type: org_type,
        })
        .where(eq(memberships.id, reference_id))
        .execute();

      return result[0];
    },
    {
      body: t.Object({
        data: t.Record(t.String(), t.String()),
        reference_id: t.String(),
        fields: t.Optional(t.Array(t.String())),
        org_type: t.String(),
      }),
    }
  )
  .get(
    "/profiles",
    async ({ user, set, drizzle, query: { fields } }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }
      // if (!user.permissions.includes("profiles.one")) {
      //   set.status = 401;
      //   return {
      //     message: "You don't have permissions",
      //   };
      // }

      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, profiles, {});
      }

      const resMembershipsId = await drizzle
        .select()
        .from(membership_users)
        .where(eq(membership_users.user_id, user.user.id))
        .execute();

      let membership;
      if (resMembershipsId.length === 0) {
        return [];
      } else {
        const resMemberships = await drizzle
          .select()
          .from(memberships)
          .where(eq(memberships.id, resMembershipsId[0].membership_id))
          .execute();
        membership = resMemberships[0];
      }
      const resProfiles = (await drizzle
        .select(selectFields)
        .from(profiles)
        .where(eq(profiles.user_id, user.user.id))
        .execute()) as InferSelectModel<typeof profiles>[];

      let profileData: {
        first_name: string;
        last_name: string;
        sur_name: string;
        job_title: string;
        phone: string;
        email: string;
        extra_first_name: string;
        extra_last_name: string;
        extra_sur_name: string;
        extra_job_title: string;
        extra_email: string;
        extra_phone: string;
      } = {
        first_name: "",
        last_name: "",
        sur_name: "",
        job_title: "",
        phone: "",
        email: "",
        extra_first_name: "",
        extra_last_name: "",
        extra_sur_name: "",
        extra_job_title: "",
        extra_email: "",
        extra_phone: "",
      };
      if (resProfiles.length > 0) {
        for (let i = 0; i < resProfiles.length; i++) {
          let item = resProfiles[i];
          profileData[item.field_name as keyof typeof profileData] =
            item.field_value;
        }

        return {
          profile_data: profileData,
          membership_data: membership,
        };
      } else if (resMembershipsId.length > 0) {
        return { membership_data: membership };
      }
    },
    {
      query: t.Object({
        fields: t.Optional(t.String()),
      }),
    }
  )
  .put(
    "/profiles",
    async ({
      body: { data, fields, reference_id, org_type },
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
      // if (!user.permissions.includes("profiles.update")) {
      //   set.status = 401;
      //   return {
      //     message: "You don't have permissions",
      //   };
      // }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, profiles, {});
      }

      const result = await drizzle.transaction(async (tx) => {
        // Fetch existing profile entries for this user
        const existingProfiles = await tx
          .select()
          .from(profiles)
          .where(eq(profiles.user_id, user.user.id))
          .execute();

        for (const [key, value] of Object.entries(data)) {
          const existingProfile = existingProfiles.find(
            (p) => p.field_name === key
          );

          if (existingProfile) {
            // Update existing profile entry
            await tx
              .update(profiles)
              .set({
                field_value: value,
                reference_id: reference_id,
              })
              .where(
                and(
                  eq(profiles.user_id, user.user.id),
                  eq(profiles.field_name, key)
                )
              )
              .execute();
          }
        }

        if (org_type) {
          await tx
            .update(memberships)
            .set({ org_type })
            .where(eq(memberships.id, reference_id))
            .execute();
        }

        return tx
          .select(selectFields)
          .from(profiles)
          .where(
            and(
              eq(profiles.user_id, user.user.id),
              eq(profiles.reference_id, reference_id)
            )
          )
          .execute();
      });

      return result[0];
    },
    {
      body: t.Object({
        data: t.Record(t.String(), t.String()),
        reference_id: t.String(),
        fields: t.Optional(t.Array(t.String())),
        org_type: t.Optional(t.String()),
      }),
    }
  );
