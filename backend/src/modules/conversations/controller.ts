import { ctx } from "@backend/context";
import { conversations, manufacturers, manufacturers_users, participants } from "backend/drizzle/schema";
import { InferSelectModel, and, desc, eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

export const ConversationsController = new Elysia({
    name: '@api/conversations',
})
    .use(ctx)
    .post("/conversations", async ({
        body: {
            manufacturer_id,
            user_id
        },
        user,
        set,
        drizzle
    }) => {
        if (!user) {
            set.status = 401;
            return {
                message: 'Unauthorized'
            }
        }
        if (!manufacturer_id && !user_id) {
            set.status = 400;
            return {
                message: 'Bad Request'
            }
        }

        if (manufacturer_id) {
            const manufacturerUsers = await drizzle.select({
                user_id: manufacturers_users.user_id
            }).from(manufacturers_users).where(eq(manufacturers_users.manufacturer_id, manufacturer_id)).execute();
            if (!manufacturerUsers.length) {
                set.status = 400;
                return {
                    message: 'Отсутствуют пользователи производителя'
                }
            }

            const participant = await drizzle
                .select({
                    id: conversations.id,
                })
                .from(participants)
                .leftJoin(conversations, eq(participants.conversation_id, conversations.id))
                .where(and(
                    eq(participants.user_id, user.user.id),
                    eq(conversations.manufacturer_id, manufacturer_id)
                ))
                .limit(1)
                .execute();

            if (participant.length) {
                return participant[0];
            } else {
                const manufacturer = await drizzle.select({
                    short_name: manufacturers.short_name
                }).from(manufacturers).where(eq(manufacturers.id, manufacturer_id)).execute();
                const conversation = await drizzle.insert(conversations).values({
                    manufacturer_id,
                    name: manufacturer[0].short_name,
                    is_group: true,
                    created_at: new Date().toISOString(),
                    created_by: user.user.id
                }).returning({
                    id: conversations.id
                }).execute();
                await drizzle.insert(participants).values({
                    user_id: user.user.id,
                    conversation_id: conversation[0].id,
                    joined_at: new Date().toISOString()
                }).execute();

                for (let i = 0; i < manufacturerUsers.length; i++) {
                    await drizzle.insert(participants).values({
                        user_id: manufacturerUsers[i].user_id,
                        conversation_id: conversation[0].id,
                        joined_at: new Date().toISOString()
                    }).execute();
                }

                return conversation[0];
            }
        }

        return {
            status: 201,
            body: ''
        }
    }, {
        body: t.Object({
            manufacturer_id: t.Optional(t.String()),
            user_id: t.Optional(t.String()),
        })
    })
    .get('/conversations', async ({
        user,
        set,
        drizzle
    }) => {
        if (!user) {
            set.status = 401;
            return {
                message: 'Unauthorized'
            }
        }

        const conversationsList = await drizzle
            .select({
                id: conversations.id,
                name: conversations.name,
            })
            .from(participants)
            .leftJoin(conversations, eq(participants.conversation_id, conversations.id))
            .where(eq(participants.user_id, user.user.id))
            .orderBy(desc(conversations.created_at))
            .execute() as InferSelectModel<typeof conversations>[];

        return conversationsList;

    })
    .get('/conversations/:id', async ({
        params: {
            id
        },
        user,
        set,
        drizzle
    }) => {
        if (!user) {
            set.status = 401;
            return {
                message: 'Unauthorized'
            }
        }

        const conversation = await drizzle
            .select({
                id: conversations.id,
                name: conversations.name,
            })
            .from(participants)
            .leftJoin(conversations, eq(participants.conversation_id, conversations.id))
            .where(and(
                eq(participants.user_id, user.user.id),
                eq(conversations.id, id)
            ))
            .limit(1)
            .execute();

        if (!conversation[0]) {
            set.status = 404;
            return {
                message: 'Not Found'
            }
        }

        return conversation[0];
    }, {
        params: t.Object({
            id: t.String()
        })
    })