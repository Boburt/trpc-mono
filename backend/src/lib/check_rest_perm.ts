import { Elysia, t, Context } from "elysia";
import { verifyJwt } from "./bcrypt";
import { ContextType } from "@backend/context";
export const checkRestPermission = async ({
    set,
    request: { headers },
    permission,
    usersService,
    cacheController
}: ContextType & {
    permission?: string;
}) => {
    const token = headers.get("authorization")?.split(" ")[1] ?? null;
    if (!token) {
        set.status = 401;

        return `Unauthorized`;
    }

    if (!permission) {
        set.status = 403;

        return `Forbidden`;
    }

    if (permission) {
        let jwtResult = await verifyJwt(token);
        if (!jwtResult) {
            set.status = 401;

            return `Unauthorized`;
        }

        if (!jwtResult.payload) {
            set.status = 401;

            return `Unauthorized`;
        }

        let user = await usersService.findOne({
            where: {
                id: jwtResult.payload.id as string,
            },
            include: {
                users_roles_usersTousers_roles_user_id: true,
            },
        });

        if (!user) {
            set.status = 401;

            return `Unauthorized`;
        }

        const permissions = await cacheController.getPermissionsByRoleId(
            user.users_roles_usersTousers_roles_user_id[0].role_id
        );
        if (permissions.length === 0) {
            set.status = 403;

            return `Forbidden`;
        }

        if (!permissions.includes(permission)) {
            set.status = 403;

            return `Forbidden`;
        }

        // if (ctx.permissionsService.hasPermission(meta.permission)) {
        //   return next();
        // } else {
        //   throw new Error("No permission");
        // }
    }
};