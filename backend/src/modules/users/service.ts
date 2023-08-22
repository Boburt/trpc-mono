import { PaginationType } from "@backend/lib/pagination_interface";
import {
  UsersFindManyArgsSchema,
  UsersFindUniqueArgsSchema,
  Users,
  Users_roles,
  Users as usersSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import {
  comparePassword,
  hashPassword,
  md5hash,
  signJwt,
} from "@backend/lib/bcrypt";
import { z } from "zod";
import { loginInput, typeLoginOutput } from "./dto/users.dto";
import { TRPCError } from "@trpc/server";
import { CacheControlService } from "../cache_control/service";

export class UsersService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheController: CacheControlService
  ) {}

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
  ): Promise<PaginationType<Omit<usersSchema, "password">>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [users, meta] = await this.prisma.users.paginate(input).withPages({
      limit: take,
      page: skip,
      includePageCount: true,
    });
    return {
      items: users.map((user) => {
        return this.exclude(user, ["password"]) as Omit<
          usersSchema,
          "password"
        >;
      }),
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof UsersFindUniqueArgsSchema>
  ): Promise<Omit<usersSchema, "password"> | null> {
    const user = await this.prisma.users.findUnique(input);

    if (!user) {
      return null;
    }

    return this.exclude(user, ["password"]) as Omit<usersSchema, "password">;
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
    const user = await this.prisma.users.findUnique({
      where: {
        login: input.login,
      },
      include: {
        users_roles_usersTousers_roles_user_id: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
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
    return {
      data: user,
      refreshToken,
      accessToken,
      rights: permissions,
    };
  }
}
