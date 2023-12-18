import { ctx } from "@backend/context";
import { checkRestPermission } from "@backend/lib/check_rest_perm";
import Elysia, { t } from "elysia";

export const assetsController = new Elysia({
    name: "@api/assets",
}).use(ctx).post(
    "/upload-assets",
    ({ body, assetsService }) => {
        return assetsService.addAsset(body);
    },
    {
        body: t.Object({
            model: t.String(),
            name: t.String(),
            file: t.File(),
            code: t.Optional(t.String()),
            model_id: t.Optional(t.String()),
        }),
        beforeHandle: checkRestPermission,
    }
)