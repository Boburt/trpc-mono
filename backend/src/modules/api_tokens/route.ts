import {
  Api_tokensCreateArgsSchema,
  Api_tokensFindManyArgsSchema,
  Api_tokensFindUniqueArgsSchema,
  Api_tokensUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const apiTokensRouter = publicRouter({
  add: publicProcedure
    .input(Api_tokensCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.apiTokensService.create(input);
    }),
  list: publicProcedure
    .input(Api_tokensFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.apiTokensService.findMany(input);
    }),

  one: publicProcedure
    .input(Api_tokensFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.apiTokensService.findOne(input);
    }),

  renew: publicProcedure
    .input(Api_tokensUpdateArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.apiTokensService.update(input);
    }),

  delete: publicProcedure
    .input(Api_tokensFindUniqueArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.apiTokensService.delete(input);
    }),

  cachedApiTokens: publicProcedure
    .input(Api_tokensFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.apiTokensService.cachedApiTokens(input);
    }),
});
