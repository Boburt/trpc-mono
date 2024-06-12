import { defineMiddleware } from "astro/middleware";
import { apiClient } from "./utils/eden";
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const params = url.searchParams;
  const id = params.get("id");

  const query: Record<string, string> = {};

  params.forEach((value, key) => {
    query[key] = value;
  });

  if (query["auth_date"] && query["hash"]) {
    const { data, error, status } = await apiClient.api.users.tg.post({
      id: query["id"],
      first_name: query["first_name"],
      last_name: query["last_name"],
      username: query["username"],
      photo_url: query["photo_url"],
      auth_date: query["auth_date"],
      hash: query["hash"],
    });
    if (status == 200 && data && "accessToken" in data) {
      context.cookies.set("x-token", data.accessToken, {
        path: "/",
      });
      context.cookies.set("x-refresh-token", data.refreshToken, {
        path: "/",
      });
      context.locals.user = data.user;
      context.locals.permissions = data.permissions;

      const url = new URL(context.request.url);

      // remove query following query params from url: id, auth_date, hash, first_name, last_name, username, photo_url. Others are kept.
      url.searchParams.delete("id");
      url.searchParams.delete("auth_date");
      url.searchParams.delete("hash");
      url.searchParams.delete("first_name");
      url.searchParams.delete("last_name");
      url.searchParams.delete("username");
      url.searchParams.delete("photo_url");

      // return Response.redirect to the url without query params

      return Response.redirect(url);
    } else if (status != 200 || error) {
      return Response.redirect(new URL("/403", context.url));
    } else {
      return Response.redirect(new URL("/403", context.url));
    }
  }

  const accessToken = context.cookies.get("x-token")?.value;
  if (accessToken) {
    const { data, error } = await apiClient.api.users.me.get({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data && "user" in data && data.user) {
      context.locals.user = data.user;
      context.locals.permissions = data.permissions;
      return next();
    } else if (context.url.pathname.startsWith("/profile")) {
      return Response.redirect(new URL("/403", context.url));
    } else {
      return next();
    }
  } else if (context.url.pathname.startsWith("/profile")) {
    return Response.redirect(new URL("/403", context.url));
  } else {
    return next();
  }
});
