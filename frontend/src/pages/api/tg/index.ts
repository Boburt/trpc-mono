import { apiClient } from "@frontend/src/utils/eden";
import { APIRoute } from "astro";
import { createHash, createHmac } from "crypto";

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const id = params.get("id");
  const botToken = import.meta.env.BOT_TOKEN;

  const query: Record<string, string> = {};

  params.forEach((value, key) => {
    query[key] = value;
  });

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
  console.log('data', data);
  console.log('status', status)
  if (status == 200 && data && "accessToken" in data) {
    return redirect(`/login?token=${data.accessToken}`, 307);
  } else if (status != 200 || error) {
    return redirect(`/login?error=${error?.message}`, 307);
  } else {
    return redirect(`/login?error=Unauthorized`, 307);
  }

  /**
   * check telegram authorization using params
   */

  return new Response(JSON.stringify(query));
};
