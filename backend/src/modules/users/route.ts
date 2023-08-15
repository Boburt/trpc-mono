import { publicRouter, publicProcedure } from "@backend/trpc";
import {
  usersCreateArgsSchema,
  usersFindManyArgsSchema,
  usersFindUniqueArgsSchema,
  usersUpdateArgsSchema,
} from "@backend/lib/zod";

export const usersRouter = publicRouter({
  add: publicProcedure
    .input(usersCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersService.create(input);
    }),
  list: publicProcedure
    .input(usersFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersService.findMany(input);
    }),
  one: publicProcedure
    .input(usersFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersService.findOne(input);
    }),
  renew: publicProcedure
    .input(usersUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersService.update(input);
    }),
});
