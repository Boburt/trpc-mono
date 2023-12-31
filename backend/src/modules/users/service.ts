import { PaginationType } from "@backend/lib/pagination_interface";
import {
  UsersFindManyArgsSchema,
  UsersFindUniqueArgsSchema,
  Users,
  Users_roles,
  Users as usersSchema,
  UsersWithRelations,
} from "@backend/lib/zod";
import { Prisma } from "@prisma/client";
import {
  comparePassword,
  hashPassword,
  md5hash,
  signJwt,
  verifyJwt,
} from "@backend/lib/bcrypt";
import { z } from "zod";
import {
  loginInput,
  refreshTokenInput,
  typeLoginOutput,
} from "./dto/users.dto";
import { TRPCError } from "@trpc/server";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { InferSelectModel, getTableColumns, sql } from "drizzle-orm";
import { users } from "@backend/../drizzle/schema";
import { DrizzleDB } from "@backend/lib/db";

export class UsersService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheController: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) { }

  async create(input: Prisma.UsersCreateArgs): Promise<usersSchema> {
    if (input.data.password) {
      const { hash, salt } = await hashPassword(input.data.password);
      input.data.password = hash;
      input.data.salt = salt;
    }
    return await this.prisma.users.create(input);
  }

  async findMany(
    input: z.infer<typeof UsersFindManyArgsSchema>
  ): Promise<PaginationType<Omit<InferSelectModel<typeof users>, "password">>> {
    // ): Promise<PaginationType<Omit<usersSchema, "password">>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }

    delete input.take;
    delete input.skip;

    const { password, ...rest } = getTableColumns(users);

    const usersCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .execute();

    const usersList = await this.drizzle
      .select({ ...rest })
      .from(users)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +usersCount[0].count;
    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+usersCount[0].count / take),
      totalCount: +usersCount[0].count,
    };

    // const [users, meta] = await this.prisma.users.paginate(input).withPages({
    //   limit: take,
    //   page: skip,
    //   includePageCount: true,
    // });

    return {
      items: usersList,
      meta: paginationMeta,
      // items: users.map((user) => {
      //   return this.exclude(user, ["password"]) as Omit<
      //     usersSchema,
      //     "password"
      //   >;
      // }),
      // meta,
    };
  }

  async findOne(
    input: z.infer<typeof UsersFindUniqueArgsSchema>
  ): Promise<Omit<UsersWithRelations, "password"> | null> {
    const user = await this.prisma.users.findUnique(input);

    if (!user) {
      return null;
    }

    return this.exclude(user, ["password"]) as Omit<
      UsersWithRelations,
      "password"
    >;
  }

  async update(input: Prisma.UsersUpdateArgs): Promise<usersSchema> {
    if (input.data.password) {
      let password = input.data.password;
      if (typeof password != "string") {
        password = password.set!;
      }
      const { hash, salt } = await hashPassword(password);
      input.data.password = md5hash(password);
      input.data.salt = salt;
    }

    return await this.prisma.users.update(input);
  }

  private exclude<User extends Record<string, unknown>, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    const filteredEntries = Object.entries(
      user as Record<string, unknown>
    ).filter(([key]) => !keys.includes(key as Key));
    const filteredObject = Object.fromEntries(
      filteredEntries
    ) as unknown as Omit<User, Key>;
    return filteredObject;
  }
  async delete(input: Prisma.UsersDeleteArgs): Promise<usersSchema> {
    return await this.prisma.users.delete(input);
  }

  async assignRole(
    input: Prisma.Users_rolesUncheckedCreateInput
  ): Promise<Users_roles> {
    await this.prisma.users_roles.deleteMany({
      where: {
        user_id: input.user_id,
      },
    });
    console.log("user role input", input);
    return await this.prisma.users_roles.create({ data: input });
  }

  async login(
    input: z.infer<typeof loginInput>
  ): Promise<z.infer<typeof typeLoginOutput>> {
    let user = await this.prisma.users.findUnique({
      where: {
        login: input.login,
      },
      include: {
        users_roles_usersTousers_roles_user_id: true,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    // check password

    const isPasswordSame = await comparePassword(
      input.password,
      user.salt!,
      user.password
    );
    if (!isPasswordSame) {
      throw new TRPCError({
        code: "FORBIDDEN",
      });
    }

    // generate tokens

    const accessToken = await signJwt(
      {
        id: user.id,
        login: user.login,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_EXPIRES_IN
    );

    const refreshToken = await signJwt(
      {
        id: user.id,
        login: user.login,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    console.log("accessToken", accessToken);

    // getting rights
    let permissions: string[] = [];
    if (user.users_roles_usersTousers_roles_user_id.length > 0) {
      const roleId = user.users_roles_usersTousers_roles_user_id[0].role_id;
      permissions = await this.cacheController.getPermissionsByRoleId(roleId);
    }
    const resultUser = this.exclude(user, [
      "password",
      "salt",
      "users_roles_usersTousers_roles_user_id",
    ]);
    return {
      data: resultUser,
      refreshToken,
      accessToken,
      rights: permissions,
    };
  }

  async refreshToken(
    input: z.infer<typeof refreshTokenInput>
  ): Promise<z.infer<typeof typeLoginOutput>> {
    let jwtResult = await verifyJwt(input.refreshToken);
    if (!jwtResult) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    if (!jwtResult.payload) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }
    const user = await this.prisma.users.findUnique({
      where: {
        id: jwtResult.payload.id as string,
      },
      include: {
        users_roles_usersTousers_roles_user_id: {
          include: {
            roles: true,
          },
        },
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    // generate tokens

    const accessToken = await signJwt(
      {
        id: user.id,
        login: user.login,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_EXPIRES_IN
    );

    const refreshToken = await signJwt(
      {
        id: user.id,
        login: user.login,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    // getting rights
    let permissions: string[] = [];
    if (user.users_roles_usersTousers_roles_user_id.length > 0) {
      const roleId = user.users_roles_usersTousers_roles_user_id[0].role_id;
      permissions = await this.cacheController.getPermissionsByRoleId(roleId);
    }
    return {
      data: user,
      refreshToken,
      accessToken,
      rights: permissions,
    };
  }
}
