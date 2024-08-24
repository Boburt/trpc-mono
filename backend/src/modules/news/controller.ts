import { ctx } from "@backend/context";
import { Elysia, t } from "elysia";

export const newsController = new Elysia({
    name: "@api/news",
})
    .use(ctx)
    .get("/news/public", async ({
        query: { limit },
    }) => {
        const newsFile = Bun.file("./news.json");
        const news = await newsFile.json();
        return limit ? news.slice(0, +limit) : news;
    }, {
        query: t.Object({
            limit: t.Optional(t.String()),
        }),
    })