import {
  SeoLinksCreateArgsSchema,
  SeoLinksFindManyArgsSchema,
  SeoLinksFindUniqueArgsSchema,
  SeoLinksUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";
import { seoLinkByLinkSchema } from "./dto/seo_links.dto";

export const seoLinksRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "seo_links.add",
    })
    .use(checkPermission)
    .input(SeoLinksCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.seoLinksService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "seo_links.list",
    })
    .use(checkPermission)
    .input(SeoLinksFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.seoLinksService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "seo_links.one",
    })
    .use(checkPermission)
    .input(SeoLinksFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.seoLinksService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "seo_links.edit",
    })
    .use(checkPermission)
    .input(SeoLinksUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.seoLinksService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "seo_links.delete",
    })
    .use(checkPermission)
    .input(SeoLinksFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.seoLinksService.delete(input);
    }),

  getByLink: publicProcedure
    .input(seoLinkByLinkSchema)
    .query(({ input, ctx }) => {
      return ctx.seoLinksService.getByLink(input);
    }),
});
