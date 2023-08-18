import {
  api_tokensCreateArgsSchema,
  api_tokensFindManyArgsSchema,
  api_tokensFindUniqueArgsSchema,
  api_tokensUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const apiTokensRouter = publicRouter({
  add: publicProcedure
    .input(api_tokensCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.apiTokensService.create(input);
    }),
  list: publicProcedure
    .input(api_tokensFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.apiTokensService.findMany(input);
    }),

  one: publicProcedure
    .input(api_tokensFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.apiTokensService.findOne(input);
    }),

  renew: publicProcedure
    .input(api_tokensUpdateArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.apiTokensService.update(input);
    }),

  delete: publicProcedure
    .input(api_tokensFindUniqueArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.apiTokensService.delete(input);
    }),

  cachedApiTokens: publicProcedure
    .input(api_tokensFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.apiTokensService.cachedApiTokens(input);
    }),
});
