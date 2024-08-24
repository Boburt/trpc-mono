import { relations } from "drizzle-orm/relations";
import { users, assets, conversations, forms, forms_sent_items, cities, manufacturers, categories, manufacturers_categories, manufacturers_properties_values, manufacturers_properties, manufacturers_reviews, manufacturers_users, permissions, products_categories, products, products_properties, properties, roles, sessions, sp_tickets, sp_tickets_comments, manufacturers_properties_categories, scheduled_reports, scheduled_reports_subscription, memberships, profiles, membership_users, roles_permissions, users_permissions, users_roles } from "./schema";

export const assetsRelations = relations(assets, ({one}) => ({
	user_created_by: one(users, {
		fields: [assets.created_by],
		references: [users.id],
		relationName: "assets_created_by_users_id"
	}),
	user_updated_by: one(users, {
		fields: [assets.updated_by],
		references: [users.id],
		relationName: "assets_updated_by_users_id"
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	assets_created_by: many(assets, {
		relationName: "assets_created_by_users_id"
	}),
	assets_updated_by: many(assets, {
		relationName: "assets_updated_by_users_id"
	}),
	conversations_created_by: many(conversations, {
		relationName: "conversations_created_by_users_id"
	}),
	conversations_updated_by: many(conversations, {
		relationName: "conversations_updated_by_users_id"
	}),
	forms_created_by: many(forms, {
		relationName: "forms_created_by_users_id"
	}),
	forms_updated_by: many(forms, {
		relationName: "forms_updated_by_users_id"
	}),
	forms_sent_items_applied_by: many(forms_sent_items, {
		relationName: "forms_sent_items_applied_by_users_id"
	}),
	forms_sent_items_opened_by: many(forms_sent_items, {
		relationName: "forms_sent_items_opened_by_users_id"
	}),
	manufacturers_reviews: many(manufacturers_reviews),
	manufacturers_users: many(manufacturers_users),
	permissions_created_by: many(permissions, {
		relationName: "permissions_created_by_users_id"
	}),
	permissions_updated_by: many(permissions, {
		relationName: "permissions_updated_by_users_id"
	}),
	roles_created_by: many(roles, {
		relationName: "roles_created_by_users_id"
	}),
	roles_updated_by: many(roles, {
		relationName: "roles_updated_by_users_id"
	}),
	sessions: many(sessions),
	sp_tickets_created_by: many(sp_tickets, {
		relationName: "sp_tickets_created_by_users_id"
	}),
	sp_tickets_updated_by: many(sp_tickets, {
		relationName: "sp_tickets_updated_by_users_id"
	}),
	sp_tickets_comments: many(sp_tickets_comments),
	scheduled_reports_subscriptions: many(scheduled_reports_subscription),
	profiles: many(profiles),
	membership_users: many(membership_users),
	roles_permissions_created_by: many(roles_permissions, {
		relationName: "roles_permissions_created_by_users_id"
	}),
	roles_permissions_updated_by: many(roles_permissions, {
		relationName: "roles_permissions_updated_by_users_id"
	}),
	users_permissions_created_by: many(users_permissions, {
		relationName: "users_permissions_created_by_users_id"
	}),
	users_permissions_updated_by: many(users_permissions, {
		relationName: "users_permissions_updated_by_users_id"
	}),
	users_permissions_user_id: many(users_permissions, {
		relationName: "users_permissions_user_id_users_id"
	}),
	users_roles_created_by: many(users_roles, {
		relationName: "users_roles_created_by_users_id"
	}),
	users_roles_updated_by: many(users_roles, {
		relationName: "users_roles_updated_by_users_id"
	}),
	users_roles_user_id: many(users_roles, {
		relationName: "users_roles_user_id_users_id"
	}),
}));

export const conversationsRelations = relations(conversations, ({one}) => ({
	user_created_by: one(users, {
		fields: [conversations.created_by],
		references: [users.id],
		relationName: "conversations_created_by_users_id"
	}),
	user_updated_by: one(users, {
		fields: [conversations.updated_by],
		references: [users.id],
		relationName: "conversations_updated_by_users_id"
	}),
}));

export const formsRelations = relations(forms, ({one}) => ({
	user_created_by: one(users, {
		fields: [forms.created_by],
		references: [users.id],
		relationName: "forms_created_by_users_id"
	}),
	user_updated_by: one(users, {
		fields: [forms.updated_by],
		references: [users.id],
		relationName: "forms_updated_by_users_id"
	}),
}));

export const forms_sent_itemsRelations = relations(forms_sent_items, ({one}) => ({
	user_applied_by: one(users, {
		fields: [forms_sent_items.applied_by],
		references: [users.id],
		relationName: "forms_sent_items_applied_by_users_id"
	}),
	user_opened_by: one(users, {
		fields: [forms_sent_items.opened_by],
		references: [users.id],
		relationName: "forms_sent_items_opened_by_users_id"
	}),
}));

export const manufacturersRelations = relations(manufacturers, ({one, many}) => ({
	city: one(cities, {
		fields: [manufacturers.city_id],
		references: [cities.id]
	}),
	manufacturers_categories: many(manufacturers_categories),
	manufacturers_properties_values: many(manufacturers_properties_values),
	manufacturers_reviews: many(manufacturers_reviews),
	manufacturers_users: many(manufacturers_users),
	products: many(products),
}));

export const citiesRelations = relations(cities, ({many}) => ({
	manufacturers: many(manufacturers),
}));

export const manufacturers_categoriesRelations = relations(manufacturers_categories, ({one}) => ({
	category: one(categories, {
		fields: [manufacturers_categories.category_id],
		references: [categories.id]
	}),
	manufacturer: one(manufacturers, {
		fields: [manufacturers_categories.manufacturer_id],
		references: [manufacturers.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	manufacturers_categories: many(manufacturers_categories),
	products_categories: many(products_categories),
}));

export const manufacturers_properties_valuesRelations = relations(manufacturers_properties_values, ({one}) => ({
	manufacturer: one(manufacturers, {
		fields: [manufacturers_properties_values.manufacturer_id],
		references: [manufacturers.id]
	}),
	manufacturers_property: one(manufacturers_properties, {
		fields: [manufacturers_properties_values.property_id],
		references: [manufacturers_properties.id]
	}),
}));

export const manufacturers_propertiesRelations = relations(manufacturers_properties, ({one, many}) => ({
	manufacturers_properties_values: many(manufacturers_properties_values),
	manufacturers_properties_category: one(manufacturers_properties_categories, {
		fields: [manufacturers_properties.category_id],
		references: [manufacturers_properties_categories.id]
	}),
}));

export const manufacturers_reviewsRelations = relations(manufacturers_reviews, ({one}) => ({
	manufacturer: one(manufacturers, {
		fields: [manufacturers_reviews.manufacturer_id],
		references: [manufacturers.id]
	}),
	user: one(users, {
		fields: [manufacturers_reviews.user_id],
		references: [users.id]
	}),
}));

export const manufacturers_usersRelations = relations(manufacturers_users, ({one}) => ({
	manufacturer: one(manufacturers, {
		fields: [manufacturers_users.manufacturer_id],
		references: [manufacturers.id]
	}),
	user: one(users, {
		fields: [manufacturers_users.user_id],
		references: [users.id]
	}),
}));

export const permissionsRelations = relations(permissions, ({one, many}) => ({
	user_created_by: one(users, {
		fields: [permissions.created_by],
		references: [users.id],
		relationName: "permissions_created_by_users_id"
	}),
	user_updated_by: one(users, {
		fields: [permissions.updated_by],
		references: [users.id],
		relationName: "permissions_updated_by_users_id"
	}),
	roles_permissions: many(roles_permissions),
	users_permissions: many(users_permissions),
}));

export const products_categoriesRelations = relations(products_categories, ({one}) => ({
	category: one(categories, {
		fields: [products_categories.category_id],
		references: [categories.id]
	}),
	product: one(products, {
		fields: [products_categories.product_id],
		references: [products.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	products_categories: many(products_categories),
	products_properties: many(products_properties),
	manufacturer: one(manufacturers, {
		fields: [products.manufacturer_id],
		references: [manufacturers.id]
	}),
}));

export const products_propertiesRelations = relations(products_properties, ({one}) => ({
	product: one(products, {
		fields: [products_properties.product_id],
		references: [products.id]
	}),
	property: one(properties, {
		fields: [products_properties.property_id],
		references: [properties.id]
	}),
}));

export const propertiesRelations = relations(properties, ({many}) => ({
	products_properties: many(products_properties),
}));

export const rolesRelations = relations(roles, ({one, many}) => ({
	user_created_by: one(users, {
		fields: [roles.created_by],
		references: [users.id],
		relationName: "roles_created_by_users_id"
	}),
	user_updated_by: one(users, {
		fields: [roles.updated_by],
		references: [users.id],
		relationName: "roles_updated_by_users_id"
	}),
	roles_permissions: many(roles_permissions),
	users_roles: many(users_roles),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.user_id],
		references: [users.id]
	}),
}));

export const sp_ticketsRelations = relations(sp_tickets, ({one}) => ({
	user_created_by: one(users, {
		fields: [sp_tickets.created_by],
		references: [users.id],
		relationName: "sp_tickets_created_by_users_id"
	}),
	user_updated_by: one(users, {
		fields: [sp_tickets.updated_by],
		references: [users.id],
		relationName: "sp_tickets_updated_by_users_id"
	}),
}));

export const sp_tickets_commentsRelations = relations(sp_tickets_comments, ({one}) => ({
	user: one(users, {
		fields: [sp_tickets_comments.user_id],
		references: [users.id]
	}),
}));

export const manufacturers_properties_categoriesRelations = relations(manufacturers_properties_categories, ({many}) => ({
	manufacturers_properties: many(manufacturers_properties),
}));

export const scheduled_reports_subscriptionRelations = relations(scheduled_reports_subscription, ({one}) => ({
	scheduled_report: one(scheduled_reports, {
		fields: [scheduled_reports_subscription.report_id],
		references: [scheduled_reports.id]
	}),
	user: one(users, {
		fields: [scheduled_reports_subscription.user_id],
		references: [users.id]
	}),
}));

export const scheduled_reportsRelations = relations(scheduled_reports, ({many}) => ({
	scheduled_reports_subscriptions: many(scheduled_reports_subscription),
}));

export const profilesRelations = relations(profiles, ({one}) => ({
	membership: one(memberships, {
		fields: [profiles.references_id],
		references: [memberships.id]
	}),
	user: one(users, {
		fields: [profiles.user_id],
		references: [users.id]
	}),
}));

export const membershipsRelations = relations(memberships, ({many}) => ({
	profiles: many(profiles),
	membership_users: many(membership_users),
}));

export const membership_usersRelations = relations(membership_users, ({one}) => ({
	membership: one(memberships, {
		fields: [membership_users.membership_id],
		references: [memberships.id]
	}),
	user: one(users, {
		fields: [membership_users.user_id],
		references: [users.id]
	}),
}));

export const roles_permissionsRelations = relations(roles_permissions, ({one}) => ({
	user_created_by: one(users, {
		fields: [roles_permissions.created_by],
		references: [users.id],
		relationName: "roles_permissions_created_by_users_id"
	}),
	permission: one(permissions, {
		fields: [roles_permissions.permission_id],
		references: [permissions.id]
	}),
	role: one(roles, {
		fields: [roles_permissions.role_id],
		references: [roles.id]
	}),
	user_updated_by: one(users, {
		fields: [roles_permissions.updated_by],
		references: [users.id],
		relationName: "roles_permissions_updated_by_users_id"
	}),
}));

export const users_permissionsRelations = relations(users_permissions, ({one}) => ({
	user_created_by: one(users, {
		fields: [users_permissions.created_by],
		references: [users.id],
		relationName: "users_permissions_created_by_users_id"
	}),
	permission: one(permissions, {
		fields: [users_permissions.permission_id],
		references: [permissions.id]
	}),
	user_updated_by: one(users, {
		fields: [users_permissions.updated_by],
		references: [users.id],
		relationName: "users_permissions_updated_by_users_id"
	}),
	user_user_id: one(users, {
		fields: [users_permissions.user_id],
		references: [users.id],
		relationName: "users_permissions_user_id_users_id"
	}),
}));

export const users_rolesRelations = relations(users_roles, ({one}) => ({
	user_created_by: one(users, {
		fields: [users_roles.created_by],
		references: [users.id],
		relationName: "users_roles_created_by_users_id"
	}),
	role: one(roles, {
		fields: [users_roles.role_id],
		references: [roles.id]
	}),
	user_updated_by: one(users, {
		fields: [users_roles.updated_by],
		references: [users.id],
		relationName: "users_roles_updated_by_users_id"
	}),
	user_user_id: one(users, {
		fields: [users_roles.user_id],
		references: [users.id],
		relationName: "users_roles_user_id_users_id"
	}),
}));