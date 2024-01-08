import { APIRoute } from "astro";
import { createHash, createHmac } from "crypto";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const id = params.get("id");
  const botToken = import.meta.env.BOT_TOKEN;

  const query: Record<string, string> = {};

  params.forEach((value, key) => {
    query[key] = value;
  });

  const { hash, ...data } = query;
  const secret = createHash("sha256").update(botToken).digest();

  const checkString = Object.keys(data)
    .sort()
    .filter((k) => data[k])
    .map((k) => `${k}=${data[k]}`)
    .join("\n");
  const hmac = createHmac("sha256", secret).update(checkString).digest("hex");

  if (hmac !== hash) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (new Date().getTime() - Number(data.auth_date) * 1000 > 86400) {
    return new Response("Unauthorized", { status: 401 });
  }

  /**
   * check telegram authorization using params
   */

  return new Response(JSON.stringify(query));
};
