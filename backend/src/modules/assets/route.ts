import {
  AssetsFindManyArgsSchema,
  LangsCreateArgsSchema,
  LangsFindManyArgsSchema,
  LangsFindUniqueArgsSchema,
  LangsUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const assetsRouter = publicRouter({
  list: publicProcedure
    .meta({
      permission: "assets.list",
    })
    .use(checkPermission)
    .input(AssetsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.assetsService.listAssets(input);
    }),
});
