import { pgTable, uniqueIndex, foreignKey, pgEnum, uuid, varchar, boolean, timestamp, index, doublePrecision, integer, text, jsonb, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const user_status = pgEnum("user_status", ['inactive', 'blocked', 'active'])
export const organization_system_type = pgEnum("organization_system_type", ['jowi', 'r_keeper', 'iiko'])
export const work_schedule_entry_status = pgEnum("work_schedule_entry_status", ['closed', 'open'])
export const organization_payment_types = pgEnum("organization_payment_types", ['client', 'card', 'cash'])
export const manufacturers_properties_types = pgEnum("manufacturers_properties_types", ['list', 'date', 'boolean', 'number', 'string'])


export const roles = pgTable("roles", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	code: varchar("code", { length: 50 }),
	active: boolean("active").default(true).notNull(),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	created_by: uuid("created_by").references(() => users.id, { onUpdate: "cascade" } ),
	updated_by: uuid("updated_by").references(() => users.id, { onUpdate: "cascade" } ),
},
(table) => {
	return {
		UQ_648e3f5447f725579d7d4ffdfb7: uniqueIndex("UQ_648e3f5447f725579d7d4ffdfb7").on(table.name),
		UQ_0e2c0e1b4b0b0b0b0b0b0b0b0b0: uniqueIndex("UQ_0e2c0e1b4b0b0b0b0b0b0b0b0b0").on(table.code),
	}
});

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	phone: varchar("phone", { length: 20 }),
	email: varchar("email", { length: 100 }),
	login: varchar("login", { length: 100 }).notNull(),
	first_name: varchar("first_name", { length: 100 }),
	last_name: varchar("last_name", { length: 100 }),
	password: varchar("password").notNull(),
	salt: varchar("salt"),
	is_super_user: boolean("is_super_user").default(false).notNull(),
	status: user_status("status").notNull(),
	card_name: varchar("card_name", { length: 100 }),
	card_number: varchar("card_number", { length: 100 }),
	birth_date: timestamp("birth_date", { precision: 5, withTimezone: true, mode: 'string' }),
	car_model: varchar("car_model", { length: 100 }),
	car_number: varchar("car_number", { length: 100 }),
	is_online: boolean("is_online").default(false).notNull(),
	latitude: doublePrecision("latitude"),
	longitude: doublePrecision("longitude"),
	fcm_token: varchar("fcm_token", { length: 250 }),
	wallet_balance: doublePrecision("wallet_balance").notNull(),
	max_active_order_count: integer("max_active_order_count"),
	doc_files: text("doc_files").array(),
	order_start_date: timestamp("order_start_date", { precision: 5, withTimezone: true, mode: 'string' }),
	app_version: varchar("app_version", { length: 100 }),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	api_token: varchar("api_token", { length: 250 }),
	tg_id: varchar("tg_id", { length: 250 }),
},
(table) => {
	return {
		UQ_a000cca60bcf04454e727699490: uniqueIndex("UQ_a000cca60bcf04454e727699490").on(table.phone),
		UQ_0e2c0e1b4b5b0b0b0b0b0b0b0b0: uniqueIndex("UQ_0e2c0e1b4b5b0b0b0b0b0b0b0b0").on(table.email),
		UQ_0e2c0e1b3b0b0b0b0b0b0b0b0b0: uniqueIndex("UQ_0e2c0e1b3b0b0b0b0b0b0b0b0b0").on(table.login),
		fki_users_login: index("fki_users_login").on(table.login),
	}
});

export const sessions = pgTable("sessions", {
	id: uuid("id").primaryKey().notNull(),
	user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	user_agent: text("user_agent").notNull(),
	device_name: text("device_name").notNull(),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const api_tokens = pgTable("api_tokens", {
	id: uuid("id"),
	active: boolean("active"),
	token: text("token"),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }),
	created_by: uuid("created_by"),
	updated_by: uuid("updated_by"),
});

export const scheduled_reports = pgTable("scheduled_reports", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	code: text("code").notNull(),
	cron: text("cron").notNull(),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const scheduled_reports_subscription = pgTable("scheduled_reports_subscription", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	report_id: uuid("report_id").notNull().references(() => scheduled_reports.id, { onUpdate: "cascade" } ),
	user_id: uuid("user_id").notNull().references(() => users.id, { onUpdate: "cascade" } ),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const langs = pgTable("langs", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	code: text("code").notNull(),
	name: text("name").notNull(),
	is_default: boolean("is_default").default(false).notNull(),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		code_key: uniqueIndex("langs_code_key").on(table.code),
	}
});

export const categories = pgTable("categories", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	active: boolean("active").default(true).notNull(),
	name: text("name").notNull(),
	description: text("description"),
	code: text("code").notNull(),
	parent_id: uuid("parent_id"),
	i18n_name: jsonb("i18n_name").notNull(),
	i18n_description: jsonb("i18n_description"),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		code_key: uniqueIndex("categories_code_key").on(table.code),
	}
});

export const image_sizes = pgTable("image_sizes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	code: text("code").notNull(),
	width: integer("width").notNull(),
	height: integer("height").notNull(),
},
(table) => {
	return {
		code_key: uniqueIndex("image_sizes_code_key").on(table.code),
	}
});

export const assets = pgTable("assets", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	path: text("path"),
	size: integer("size").notNull(),
	mime_type: text("mime_type").notNull(),
	parent_id: uuid("parent_id"),
	resize_code: text("resize_code"),
	model: text("model"),
	model_id: text("model_id"),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	created_by: uuid("created_by").references(() => users.id, { onUpdate: "cascade" } ),
	updated_by: uuid("updated_by").references(() => users.id, { onUpdate: "cascade" } ),
	code: text("code"),
});

export const manufacturers_categories = pgTable("manufacturers_categories", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	manufacturer_id: uuid("manufacturer_id").notNull().references(() => manufacturers.id, { onUpdate: "cascade" } ),
	category_id: uuid("category_id").notNull().references(() => categories.id, { onUpdate: "cascade" } ),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const cities = pgTable("cities", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const manufacturers_properties_categories = pgTable("manufacturers_properties_categories", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	code: text("code").notNull(),
	i18n_name: jsonb("i18n_name"),
});

export const manufacturers_properties = pgTable("manufacturers_properties", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	code: text("code").notNull(),
	i18n_name: jsonb("i18n_name"),
	category_id: uuid("category_id").notNull().references(() => manufacturers_properties_categories.id, { onUpdate: "cascade" } ),
	type: manufacturers_properties_types("type").notNull(),
	additional_data: jsonb("additional_data"),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	show_in_filter: boolean("show_in_filter").default(false).notNull(),
	show_in_list: boolean("show_in_list").default(false).notNull(),
});

export const manufacturers_properties_values = pgTable("manufacturers_properties_values", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	property_id: uuid("property_id").notNull().references(() => manufacturers_properties.id, { onUpdate: "cascade" } ),
	manufacturer_id: uuid("manufacturer_id").notNull().references(() => manufacturers.id, { onUpdate: "cascade" } ),
	value: text("value").notNull(),
});

export const manufacturers_reviews = pgTable("manufacturers_reviews", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	manufacturer_id: uuid("manufacturer_id").notNull().references(() => manufacturers.id, { onUpdate: "cascade" } ),
	user_id: uuid("user_id").notNull().references(() => users.id, { onUpdate: "cascade" } ),
	rating: doublePrecision("rating"),
	comment: text("comment"),
	active: boolean("active").default(false).notNull(),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const seo_links = pgTable("seo_links", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: text("title").notNull(),
	link: text("link").notNull(),
	description: text("description"),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const permissions = pgTable("permissions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	slug: varchar("slug", { length: 160 }).notNull(),
	description: varchar("description", { length: 60 }).notNull(),
	active: boolean("active").default(true).notNull(),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	created_by: uuid("created_by").references(() => users.id, { onUpdate: "cascade" } ),
	updated_by: uuid("updated_by").references(() => users.id, { onUpdate: "cascade" } ),
},
(table) => {
	return {
		UQ_d090ad82a0e97ce764c06c7b312: uniqueIndex("UQ_d090ad82a0e97ce764c06c7b312").on(table.slug),
	}
});

export const manufacturers = pgTable("manufacturers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	short_name: text("short_name").notNull(),
	name: text("name").notNull(),
	description: text("description"),
	active: boolean("active").default(true).notNull(),
	created_at: timestamp("created_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 5, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	city_id: uuid("city_id").references(() => cities.id, { onUpdate: "cascade" } ),
	rating: doublePrecision("rating").notNull(),
});

export const roles_permissions = pgTable("roles_permissions", {
	role_id: uuid("role_id").notNull().references(() => roles.id, { onUpdate: "cascade" } ),
	permission_id: uuid("permission_id").notNull().references(() => permissions.id, { onUpdate: "cascade" } ),
	created_by: uuid("created_by").references(() => users.id, { onUpdate: "cascade" } ),
	updated_by: uuid("updated_by").references(() => users.id, { onUpdate: "cascade" } ),
},
(table) => {
	return {
		PK_0cd11f0b35c4d348c6ebb9b36b7: primaryKey(table.role_id, table.permission_id)
	}
});

export const users_permissions = pgTable("users_permissions", {
	user_id: uuid("user_id").notNull().references(() => users.id, { onUpdate: "cascade" } ),
	permission_id: uuid("permission_id").notNull().references(() => permissions.id, { onUpdate: "cascade" } ),
	created_by: uuid("created_by").references(() => users.id, { onUpdate: "cascade" } ),
	updated_by: uuid("updated_by").references(() => users.id, { onUpdate: "cascade" } ),
},
(table) => {
	return {
		PK_7f3736984cd8546a1e418005561: primaryKey(table.user_id, table.permission_id)
	}
});

export const users_roles = pgTable("users_roles", {
	user_id: uuid("user_id").notNull().references(() => users.id, { onUpdate: "cascade" } ),
	role_id: uuid("role_id").notNull().references(() => roles.id, { onUpdate: "cascade" } ),
	created_by: uuid("created_by").references(() => users.id, { onUpdate: "cascade" } ),
	updated_by: uuid("updated_by").references(() => users.id, { onUpdate: "cascade" } ),
},
(table) => {
	return {
		PK_c525e9373d63035b9919e578a9c: primaryKey(table.user_id, table.role_id)
	}
});