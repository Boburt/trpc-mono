
import { defineMiddleware } from "astro/middleware";
import { apiClient } from "./utils/eden";
export const onRequest = defineMiddleware(async (context, next) => {
    console.log('davr');
    const url = new URL(context.request.url);
    const params = url.searchParams;
    const id = params.get("id");

    const query: Record<string, string> = {};

    params.forEach((value, key) => {
        query[key] = value;
    });

    if (query["auth_date"] && query["hash"]) {

        const {
            data,
            error,
            status
        } = await apiClient.api.users.tg.post({
            id: query["id"],
            first_name: query["first_name"],
            last_name: query["last_name"],
            username: query["username"],
            photo_url: query["photo_url"],
            auth_date: query["auth_date"],
            hash: query["hash"],
        });
        if (status == 200 && data && "accessToken" in data) {
            context.cookies.set("x-token", data.accessToken);
            context.locals.user = data.user;
            context.locals.permissions = data.permissions;
            return next();
        } else if (status != 200 || error) {
            return Response.redirect(new URL("/403", context.url));
        } else {
            return Response.redirect(new URL("/403", context.url));
        }

    }

    if (context.url.pathname.startsWith("/profile/")) {

        const accessToken = context.cookies.get("x-token")?.value;
        if (accessToken) {
            const { data, error } = await apiClient.api.users.me.get({
                $headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (data && "user" in data && data.user) {
                context.locals.user = data.user;
                context.locals.permissions = data.permissions;
                return next();
            } else {
                return Response.redirect(new URL("/403", context.url));
            }
        } else {
            return Response.redirect(new URL("/403", context.url));
        }
    } else {
        return next();
    }
});