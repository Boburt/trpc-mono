import { getTableColumns, sql } from "drizzle-orm";
import { users, users_roles } from "@backend/../drizzle/schema";
import { drizzleDb } from "./db";

const { password, salt, tg_id, ...userDataFields } = getTableColumns(users);

let userSelectFields: {
    [key in keyof typeof userDataFields]: boolean;
} = Object.keys(userDataFields).reduce((acc, key) => {
    acc[key] = true;
    return acc;
}, {} as Record<string, boolean>) as
    {
        [key in keyof typeof userDataFields]: boolean;
    };
Object.keys(userDataFields).forEach((key) => {
    userSelectFields[key as keyof typeof userDataFields] = true;
});
export const userById = drizzleDb.query.users
    .findFirst({
        where: (users, { eq }) => eq(users.id, sql.placeholder("id")),
        columns: userSelectFields,
    })
    .prepare("userByPhone");

export const userByLogin = drizzleDb.query.users
    .findFirst({
        where: (users, { eq }) => eq(users.login, sql.placeholder("login")),
        columns: userSelectFields,
    })
    .prepare("userByLogin");

export const userFirstRole = drizzleDb.query.users_roles
    .findFirst({
        where: (users_roles, { eq }) =>
            eq(users_roles.user_id, sql.placeholder("user_id")),
    })
    .prepare("userFirstRole");

export const userPasswordByLogin = drizzleDb.query.users.findFirst({
    where: (users, { eq }) => eq(users.login, sql.placeholder("login")),
    columns: {
        password: true,
        salt: true,
    },
}).prepare("userPasswordByLogin");