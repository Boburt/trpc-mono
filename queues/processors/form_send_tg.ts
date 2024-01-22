
import { drizzleDb } from "@backend/lib/db";
import { forms, forms_sent_items, manufacturers, manufacturers_users, users } from "backend/drizzle/schema";
import { SQLWrapper, and, eq, gt, gte, isNotNull, lt, lte } from "drizzle-orm";

export default async function processFormSendTg(id: string) {
    try {

        const form = await drizzleDb.query.forms.findFirst({
            where: eq(forms.id, id),
        });

        if (!form) {
            return;
        }

        await drizzleDb.update(forms).set({
            status: 'is_sending'
        }).where(eq(forms.id, id)).execute();

        if (!form.form_recipients || (typeof form.form_recipients == 'string' && form.form_recipients.length == 0)) {
            return;
        }

        const formRecipients = JSON.parse(form.form_recipients as string) as any;

        console.log("formRecipients", formRecipients);

        let role = '';
        let table = 'manufacturers'

        if (formRecipients.rules.length > 0) {
            const rootRule = formRecipients.rules[0];
            if (rootRule.rules && rootRule.rules.length > 0) {
                for (const rule of rootRule.rules) {
                    if (rule.field === 'role') {
                        role = rule.value;
                    }
                }
            } else {
                for (const rule of formRecipients.rules) {
                    if (rule.field === 'role') {
                        role = rule.value;
                    }
                }
            }

            // extract created_at from formRecipients rules
            let createdAtField: any = null;
            if (formRecipients.rules.length > 0) {
                const rootRule = formRecipients.rules[0];
                if (rootRule.rules && rootRule.rules.length > 0) {
                    for (const rule of rootRule.rules) {
                        if (rule.field === 'created_at') {
                            createdAtField = rule;
                        }
                    }
                } else {
                    for (const rule of formRecipients.rules) {
                        if (rule.field === 'created_at') {
                            createdAtField = rule;
                        }
                    }
                }
            }

            if (!role) {
                role = 'manufacturer';
            }

            if (role != 'manufacturer') {
                table = 'users';
            }

            if (role == 'manufacturer') {

                let whereClause: (SQLWrapper | undefined)[] = [
                    isNotNull(users.tg_id),
                ];

                if (createdAtField) {
                    const createdAtValue = createdAtField.value as any;
                    if (createdAtValue) {
                        const operator = createdAtField.operator;
                        const createdAtValueDateObject = new Date(createdAtValue);
                        switch (operator) {
                            case '>':
                                whereClause.push(gt(manufacturers.created_at, createdAtValueDateObject.toISOString()));
                                break;
                            case '<':
                                whereClause.push(lt(manufacturers.created_at, createdAtValueDateObject.toISOString()));
                                break;
                            case '>=':
                                whereClause.push(gte(manufacturers.created_at, createdAtValueDateObject.toISOString()));
                                break;
                            case '<=':
                                whereClause.push(lte(manufacturers.created_at, createdAtValueDateObject.toISOString()));
                                break;
                            default:
                                whereClause.push(eq(manufacturers.created_at, createdAtValueDateObject.toISOString()));
                                break;
                        }
                    }
                }

                const manufacturerUsers = await drizzleDb.select({
                    manufacturerId: manufacturers.id,
                    userId: users.id,
                    tgId: users.tg_id,
                }).from(manufacturers_users)
                    .leftJoin(manufacturers, eq(manufacturers.id, manufacturers_users.manufacturer_id))
                    .leftJoin(users, eq(users.id, manufacturers_users.user_id))
                    .where(and(...whereClause))
                    .execute();

                const manufacturersIds = manufacturerUsers.map((manufacturerUser) => manufacturerUser.manufacturerId!).filter((value, index, self) => self.indexOf(value) === index);

                if (manufacturersIds.length > 0) {
                    const sentItems = await drizzleDb.insert(forms_sent_items).values(manufacturersIds.map((manufacturerId) => ({
                        model_id: manufacturerId,
                        model: 'manufacturers',
                        form_id: form.id,
                        status: 'sent',
                        created_at: new Date().toISOString(),
                    }))).returning({
                        model_id: forms_sent_items.model_id,
                        id: forms_sent_items.id,
                    }).execute();
                    const usersByManufacturers = manufacturerUsers.reduce((acc, manufacturerUser) => {
                        if (!acc[manufacturerUser.manufacturerId!]) {
                            acc[manufacturerUser.manufacturerId!] = [];
                        }
                        acc[manufacturerUser.manufacturerId!].push(manufacturerUser);
                        return acc;
                    }, {} as any);

                    for (const sentItem of sentItems) {
                        const users = usersByManufacturers[sentItem.model_id];
                        if (users) {
                            for (const user of users) {
                                if (user.tgId) {
                                    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            chat_id: user.tgId,
                                            parse_mode: 'HTML',
                                            text: `<b>Пожалуйста заполните форму "${form.name}"</b>.\nСсылка на форму: <a href='${process.env.FRONTEND_URL}/profile/forms/apply/${sentItem.id}'>${process.env.FRONTEND_URL}/profile/forms/apply/${sentItem.id}</a>`
                                        }),
                                        headers: { "Content-Type": "application/json" },
                                    });

                                }
                            }
                        }
                    }
                }
            }


        } else {
            await drizzleDb.update(forms).set({
                status: 'sent'
            }).where(eq(forms.id, id)).execute();
        }

    } catch (e) {
        console.log("davr", e);
    }
}