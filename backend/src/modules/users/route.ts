import { publicRouter, publicProcedure } from "@backend/trpc";
import {
  UsersCreateArgsSchema,
  UsersDeleteArgsSchema,
  UsersFindManyArgsSchema,
  UsersFindUniqueArgsSchema,
  UsersSchema,
  UsersUpdateArgsSchema,
  Users_rolesUncheckedCreateInputSchema,
} from "@backend/lib/zod";
import { loginInput, refreshTokenInput } from "./dto/users.dto";

export const usersRouter = publicRouter({
  add: publicProcedure
    .input(UsersCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersService.create(input);
    }),
  list: publicProcedure
    .input(UsersFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersService.findMany(input);
    }),
  one: publicProcedure
    .input(UsersFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersService.findOne(input);
    }),
  renew: publicProcedure
    .input(UsersUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersService.update(input);
    }),

  delete: publicProcedure
    .input(UsersDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersService.delete(input);
    }),

  assignRole: publicProcedure
    .input(Users_rolesUncheckedCreateInputSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersService.assignRole(input);
    }),

  refreshToken: publicProcedure
    .input(refreshTokenInput)
    .mutation(({ input, ctx }) => {
      return ctx.usersService.refreshToken(input);
    }),
  login: publicProcedure.input(loginInput).mutation(({ input, ctx }) => {
    console.log("try login");
    return ctx.usersService.login(input);
  }),
});
