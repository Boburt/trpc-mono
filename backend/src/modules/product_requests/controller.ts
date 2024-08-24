import { ctx } from "@backend/context";
import {
  productRequestItems,
  productRequests,
  products,
  users,
} from "backend/drizzle/schema";
import { and, desc, eq, gte, ilike, lte, sql, SQLWrapper } from "drizzle-orm";
import { Elysia, t } from "elysia";

export const productRequestsController = new Elysia({
  name: "@api/product_requests",
})
  .use(ctx)
  .post(
    "/product_requests",
    async ({ body, user, set, drizzle, notifyAboutNewProductRequestQueue }) => {
      const { firstName, lastName, phone, email, products } = body;

      const newRequest = await drizzle
        .insert(productRequests)
        .values({
          userId: user?.user.id,
          firstName,
          lastName,
          phone,
          email,
        })
        .returning()
        .execute();

      const requestId = newRequest[0].id;

      const requestItems = products.map((product: any) => ({
        requestId,
        productId: product.id,
        quantity: product.quantity,
      }));

      await drizzle.insert(productRequestItems).values(requestItems).execute();
      await notifyAboutNewProductRequestQueue.add(
        `product_request_${requestId}`,
        { id: requestId },
        {
          removeOnComplete: true,
          removeOnFail: true,
        }
      );
      return {
        message: "Product request submitted successfully",
        requestId,
      };
    },
    {
      body: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        phone: t.String(),
        email: t.Optional(t.String()),
        products: t.Array(
          t.Object({
            id: t.String(),
            quantity: t.Number(),
          })
        ),
      }),
    }
  )
  .get(
    "/product_requests",
    async ({
      user,
      set,
      drizzle,
      query: { page, limit, dateFrom, dateTo, status, search },
    }) => {
      if (!user || !user.permissions.includes("products_requests.list")) {
        set.status = 401;
        return { message: "Unauthorized" };
      }

      const offset = (page - 1) * limit;
      let whereClause: SQLWrapper[] = [];

      if (dateFrom && dateTo) {
        whereClause.push(
          ...[
            gte(productRequests.created_at, new Date(dateFrom).toISOString()),
            lte(productRequests.created_at, new Date(dateTo).toISOString()),
          ]
        );
      }

      if (status && status !== "all") {
        whereClause.push(eq(productRequests.status, status));
      }

      if (search) {
        whereClause.push(ilike(users.first_name, `%${search}%`));
      }

      const [requests, total] = await Promise.all([
        drizzle
          .select()
          .from(productRequests)
          .where(and(...whereClause))
          .limit(limit)
          .offset(offset)
          .orderBy(desc(productRequests.created_at)),

        drizzle
          .select({ count: sql<number>`count(*)` })
          .from(productRequests)
          .where(and(...whereClause))
          .execute(),
      ]);

      return {
        requests,
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / limit),
      };
    },
    {
      query: t.Object({
        page: t.Numeric(),
        limit: t.Numeric(),
        dateFrom: t.String(),
        dateTo: t.String(),
        status: t.Optional(t.String()),
        search: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/product_requests/:id",
    async ({ user, set, drizzle, params: { id } }) => {
      if (!user || !user.permissions.includes("products_requests.one")) {
        set.status = 401;
        return { message: "Unauthorized" };
      }

      const request = await drizzle
        .select({
          id: productRequests.id,
          requestNumber: productRequests.requestNumber,
          status: productRequests.status,
          created_at: productRequests.created_at,
          firstName: productRequests.firstName,
          lastName: productRequests.lastName,
          products: sql<{ id: string; name: string; quantity: number }[]>`
        jsonb_agg(
          jsonb_build_object(
            'id', products.id,
            'name', products.name,
            'quantity', product_request_items.quantity
          )
        )
      `,
        })
        .from(productRequests)
        .leftJoin(
          productRequestItems,
          eq(productRequests.id, productRequestItems.requestId)
        )
        .leftJoin(products, eq(productRequestItems.productId, products.id))
        .where(eq(productRequests.id, id))
        .groupBy(
          productRequests.id,
          productRequests.status,
          productRequests.created_at,
          productRequests.firstName,
          productRequests.lastName
        )
        .execute();

      if (request.length == 0) {
        set.status = 404;
        return { message: "Product request not found" };
      }

      return request[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .put(
    "/product_requests/:id",
    async ({ user, set, drizzle, params: { id }, body }) => {
      if (!user || !user.permissions.includes("products_requests.edit")) {
        set.status = 401;
        return { message: "Unauthorized" };
      }

      const updatedRequest = await drizzle
        .update(productRequests)
        .set({ status: body.status })
        .where(eq(productRequests.id, id))
        .returning()
        .execute();

      if (!updatedRequest.length) {
        set.status = 404;
        return { message: "Product request not found" };
      }

      return updatedRequest[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        status: t.Union([
          t.Literal("pending"),
          t.Literal("approved"),
          t.Literal("rejected"),
        ]),
      }),
    }
  );
