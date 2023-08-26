import {
  LangsCreateArgsSchema,
  LangsFindManyArgsSchema,
  LangsFindUniqueArgsSchema,
  LangsUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const langsRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "langs.add",
    })
    .use(checkPermission)
    .input(LangsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.langsService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "langs.list",
    })
    .use(checkPermission)
    .input(LangsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.langsService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "langs.one",
    })
    .use(checkPermission)
    .input(LangsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.langsService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "langs.edit",
    })
    .use(checkPermission)
    .input(LangsUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.langsService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "langs.delete",
    })
    .use(checkPermission)
    .input(LangsFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.langsService.delete(input);
    }),

  cachedLangs: publicProcedure
    .input(LangsFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.langsService.cachedLangs(input);
    }),
});
