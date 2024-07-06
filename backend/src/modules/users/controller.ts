import Elysia, { error, t } from "elysia";
import { users, users_roles } from "@backend/../drizzle/schema";
import { createHash, createHmac } from "crypto";
import {
  InferSelectModel,
  SQLWrapper,
  and,
  eq,
  getTableColumns,
  sql,
} from "drizzle-orm";
import {
  comparePassword,
  generateRandomPassword,
  hashPassword,
  signJwt,
  verifyJwt,
} from "@backend/lib/bcrypt";
import { SelectedFields } from "drizzle-orm/pg-core";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { createInsertSchema } from "drizzle-typebox";
import { drizzleDb } from "@backend/lib/db";
import { ctx } from "@backend/context";
import { userById, userByLogin, userFirstRole, userPasswordByLogin } from "@backend/lib/prepare_statements";

type UsersModel = InferSelectModel<typeof users>;

function exclude<User extends Record<string, unknown>, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const filteredEntries = Object.entries(
    user as Record<string, unknown>
  ).filter(([key]) => !keys.includes(key as Key));
  const filteredObject = Object.fromEntries(filteredEntries) as unknown as Omit<
    User,
    Key
  >;
  return filteredObject;
}

export const usersController = new Elysia({
  name: "@api/users",
})
  .use(ctx)
  .post(
    "/users/login",
    async ({ body: { login, password }, set, cacheController }) => {
      const user = await userByLogin.execute({ login }) as InferSelectModel<typeof users>;

      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      const userPasswords = await userPasswordByLogin.execute({ login });

      const isPasswordSame = await comparePassword(
        password,
        userPasswords!.salt!,
        userPasswords!.password
      );

      if (!isPasswordSame) {
        set.status = 401;
        return {
          message: "Password is incorrect",
        };
      }

      if (user.status == "blocked") {
        set.status = 401;
        return {
          message: "User is blocked",
        };
      }
      const accessToken = await signJwt(
        {
          id: user.id,
          login: user.login,
          first_name: user.first_name,
          last_name: user.last_name,
          tg_username: user.tg_username,
        },
        process.env.JWT_EXPIRES_IN
      );

      const refreshToken = await signJwt(
        {
          id: user.id,
          login: user.login,
          first_name: user.first_name,
          last_name: user.last_name,
          tg_username: user.tg_username,
        },
        process.env.JWT_REFRESH_EXPIRES_IN
      );

      const res = await cacheController.cacheUserDataByToken(accessToken,
        refreshToken, user.id);
      // @ts-ignore
      const { permissions, ...result } = res;
      return result;
    },
    {
      body: t.Object({
        login: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/users/refresh_token",
    async ({ body: { refreshToken }, set, cacheController }) => {
      let jwtResult = await verifyJwt(refreshToken);
      if (!jwtResult) {
        set.status = 401;
        return {
          message: "Invalid token",
        };
      }

      if (!jwtResult.payload) {
        set.status = 401;
        return {
          message: "Invalid token",
        };
      }

      const user = await userById.execute({ id: jwtResult.payload.id }) as InferSelectModel<typeof users>;

      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (user.status == "blocked") {
        set.status = 401;
        return {
          message: "User is blocked",
        };
      }

      const accessToken = await signJwt(
        {
          id: user.id,
          login: user.login,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        process.env.JWT_EXPIRES_IN
      );

      const refreshTokenNew = await signJwt(
        {
          id: user.id,
          login: user.login,
          first_name: user.first_name,
          last_name: user.last_name,
        },
        process.env.JWT_REFRESH_EXPIRES_IN
      );

      const userRole = await userFirstRole.execute({ user_id: user.id });

      // getting rights
      let permissions: string[] = [];
      if (userRole) {
        permissions = await cacheController.getPermissionsByRoleId(
          userRole.role_id
        );
      }

      const resultUser = exclude(user, [
        "password",
        "salt",
        // @ts-ignore
        "users_roles_usersTousers_roles_user_id",
      ]);

      return {
        data: resultUser,
        refreshToken: refreshTokenNew,
        accessToken,
        rights: permissions,
      };
    },
    {
      body: t.Object({
        refreshToken: t.String(),
      }),
    }
  )
  .post(
    "/users/assign_role",
    async ({ body: { user_id, role_id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("users.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      await drizzle
        .delete(users_roles)
        .where(eq(users_roles.user_id, user_id))
        .execute();
      await drizzle.insert(users_roles).values({ user_id, role_id }).execute();
      return {
        data: {
          user_id,
          role_id,
        },
      };
    },
    {
      body: t.Object({
        user_id: t.String(),
        role_id: t.String(),
      }),
    }
  )
  .post(
    "/users/tg",
    async ({ body, drizzle, cacheController }) => {
      const { hash, ...data } = body;
      console.log('before bot token');
      const botToken = process.env.BOT_TOKEN;
      const secret = createHash("sha256").update(botToken!).digest();

      const checkString = Object.keys(data)
        .sort()
        // @ts-ignore
        .filter((k) => data[k])
        // @ts-ignore
        .map((k) => `${k}=${data[k]}`)
        .join("\n");
      console.log('checkString', checkString)
      const hmac = createHmac("sha256", secret)
        .update(checkString)
        .digest("hex");

      if (hmac !== hash) {
        return error("Unauthorized", { status: 401 });
      }

      if (new Date().getTime() - Number(data.auth_date) * 1000 > 86400) {
        return error("Unauthorized", { status: 401 });
      }

      let user = await drizzle.select({
        id: users.id,
        login: users.login,
        first_name: users.first_name,
        last_name: users.last_name,
        photo_url: users.photo_url,
        tg_id: users.tg_id,
        tg_username: users.tg_username,
      }).from(users).where(eq(users.tg_id, data.id)).execute();

      if (user.length == 0) {

        const { hash: passwordHash, salt } = await hashPassword(generateRandomPassword(12));
        user = await drizzle.insert(users).values({
          first_name: data.first_name,
          last_name: data.last_name,
          tg_username: data.username,
          photo_url: data.photo_url,
          tg_id: data.id,
          status: "active",
          password: passwordHash,
          salt,
          login: data.username ?? data.id,
        }).returning({
          id: users.id,
          login: users.login,
          first_name: users.first_name,
          last_name: users.last_name,
          photo_url: users.photo_url,
          tg_username: users.tg_username,
          tg_id: users.tg_id,
        }).execute();
      }

      const accessToken = await signJwt(
        {
          id: user[0].id,
          login: user[0].login,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          tg_username: user[0].tg_username,
        },
        process.env.JWT_EXPIRES_IN
      );

      const refreshToken = await signJwt(
        {
          id: user[0].id,
          login: user[0].login,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          tg_username: user[0].tg_username,
        },
        process.env.JWT_REFRESH_EXPIRES_IN
      );

      const userRole = await userFirstRole.execute({ user_id: user[0].id });

      // getting rights
      let permissions: string[] = [];
      if (userRole) {
        permissions = await cacheController.getPermissionsByRoleId(
          userRole.role_id
        );
      }
      const res = await cacheController.cacheUserDataByToken(accessToken,
        refreshToken, user[0].id);

      // @ts-ignore
      const { permissions: permissionsList, ...result } = res;
      return result;

    },
    {
      body: t.Object({
        id: t.String(),
        first_name: t.String(),
        last_name: t.Optional(t.String()),
        username: t.Optional(t.String()),
        photo_url: t.Optional(t.String()),
        auth_date: t.String(),
        hash: t.String(),
      }),
    }
  )
  .get(
    "/users",
    async ({
      query: { limit, offset, sort, filters, fields },
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

      if (!user.permissions.includes("users.list")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let res: {
        [key: string]: UsersModel & {
          work_schedules: {
            id: string;
            user_id: string;
            work_schedule_id: string;
            start_time: string;
            end_time: string;
            day: string;
          }[];
        };
      } = {};
      let selectFields: SelectedFields = {};
      if (fields) {
        fields = fields
          .split(",")
          .filter((item) => item != "password")
          .join(",");
        selectFields = parseSelectFields(fields, users, {});
      }
      let whereClause: (SQLWrapper | undefined)[] = [];
      if (filters) {
        whereClause = parseFilterFields(filters, users, {});
      }
      const usersCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(and(...whereClause))
        .execute();

      const { password, salt, ...usersFields } = getTableColumns(users);

      const usersDbSelect = drizzle
        .select(usersFields)
        .from(users)
        .where(and(...whereClause))
        .limit(+limit)
        .offset(+offset)
        .as("users");

      // @ts-ignore
      const usersList: UsersModel[] = await drizzle
        .select(selectFields)
        .from(usersDbSelect)
        .execute();
      console.log(
        "sql",
        drizzle.select(selectFields).from(usersDbSelect).toSQL().sql
      );
      usersList.forEach((user) => {
        if (!res[user.id]) {
          res[user.id] = {
            ...user,
            work_schedules: [],
          };
        }
        // @ts-ignore
        if (user.work_schedules) {
          // @ts-ignore
          res[user.id].work_schedules.push(user.work_schedules);
        }
      });

      return {
        total: usersCount[0].count,
        data: Object.values(res),
      };
    },
    {
      query: t.Object({
        limit: t.String(),
        offset: t.String(),
        sort: t.Optional(t.String()),
        filters: t.Optional(t.String()),
        fields: t.Optional(t.String()),
      }),
    }
  )
  .get('/users/my_permissions', async ({ user, set, drizzle }) => {
    if (!user) {
      set.status = 401;
      return {
        message: "User not found",
      };
    }
    return user.permissions;
  })
  .get("/users/me", async ({ user, set, cacheController }) => {
    if (!user) {
      set.status = 401;
      return {
        message: "User not found",
      };
    }
    return user;
  })
  .get(
    "/users/:id",
    async ({
      params: { id },
      // @ts-ignore
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

      if (!user.permissions.includes("users.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      const { password, salt, ...usersFields } = getTableColumns(users);
      const permissionsRecord = await drizzle
        .select(usersFields)
        .from(users)
        .where(eq(users.id, id))
        .execute();
      return {
        data: permissionsRecord[0],
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/users",
    async ({
      body: { data, fields },
      // @ts-ignore
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

      if (!user.permissions.includes("users.add")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      if (data.password) {
        const { hash, salt } = await hashPassword(data.password);
        data.password = hash;
        data.salt = salt;
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, users, {});
      }
      const result = await drizzle
        .insert(users)
        .values(data)
        .returning(selectFields);

      return result[0];
    },
    {
      body: t.Object({
        // @ts-ignore
        data: createInsertSchema(users) as any,
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .put(
    "/users/:id",
    async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("users.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, users, {});
      }

      if (data.password) {
        let password = data.password;
        if (typeof password != "string") {
          password = password.set!;
        }
        const { hash, salt } = await hashPassword(password);
        data.password = hash;
        data.salt = salt;
      }

      const result = await drizzle
        .update(users)
        .set(data)
        .where(eq(users.id, id))
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
        // @ts-ignore
        data: createInsertSchema(users) as any,
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
