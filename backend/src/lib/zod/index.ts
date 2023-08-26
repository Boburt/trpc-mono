import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PermissionsScalarFieldEnumSchema = z.enum(['id','slug','description','active','created_at','updated_at','created_by','updated_by']);

export const RolesScalarFieldEnumSchema = z.enum(['id','name','code','active','created_at','updated_at','created_by','updated_by']);

export const Roles_permissionsScalarFieldEnumSchema = z.enum(['role_id','permission_id','created_by','updated_by']);

export const UsersScalarFieldEnumSchema = z.enum(['id','phone','email','login','first_name','last_name','password','salt','is_super_user','status','card_name','card_number','birth_date','car_model','car_number','is_online','latitude','longitude','fcm_token','wallet_balance','max_active_order_count','doc_files','order_start_date','app_version','created_at','updated_at','api_token','tg_id']);

export const SessionsScalarFieldEnumSchema = z.enum(['id','user_id','user_agent','device_name','created_at','updated_at']);

export const Users_permissionsScalarFieldEnumSchema = z.enum(['user_id','permission_id','created_by','updated_by']);

export const Users_rolesScalarFieldEnumSchema = z.enum(['user_id','role_id','created_by','updated_by']);

export const Api_tokensScalarFieldEnumSchema = z.enum(['id','active','token','created_at','updated_at','created_by','updated_by']);

export const Scheduled_reportsScalarFieldEnumSchema = z.enum(['id','name','code','cron','created_at','updated_at']);

export const Scheduled_reports_subscriptionScalarFieldEnumSchema = z.enum(['id','report_id','user_id','created_at','updated_at']);

export const LangsScalarFieldEnumSchema = z.enum(['id','code','name','is_default','created_at','updated_at']);

export const CategoriesScalarFieldEnumSchema = z.enum(['id','active','name','description','code','parent_id','i18n_name','i18n_description','created_at','updated_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const user_statusSchema = z.enum(['active','blocked','inactive']);

export type user_statusType = `${z.infer<typeof user_statusSchema>}`

export const organization_system_typeSchema = z.enum(['iiko','r_keeper','jowi']);

export type organization_system_typeType = `${z.infer<typeof organization_system_typeSchema>}`

export const work_schedule_entry_statusSchema = z.enum(['open','closed']);

export type work_schedule_entry_statusType = `${z.infer<typeof work_schedule_entry_statusSchema>}`

export const organization_payment_typesSchema = z.enum(['cash','card','client']);

export type organization_payment_typesType = `${z.infer<typeof organization_payment_typesSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PERMISSIONS SCHEMA
/////////////////////////////////////////

export const PermissionsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type Permissions = z.infer<typeof PermissionsSchema>

// PERMISSIONS RELATION SCHEMA
//------------------------------------------------------

export type PermissionsRelations = {
  users_permissions_created_byTousers?: UsersWithRelations | null;
  users_permissions_updated_byTousers?: UsersWithRelations | null;
  roles_permissions: Roles_permissionsWithRelations[];
  users_permissions: Users_permissionsWithRelations[];
};

export type PermissionsWithRelations = z.infer<typeof PermissionsSchema> & PermissionsRelations

export const PermissionsWithRelationsSchema: z.ZodType<PermissionsWithRelations> = PermissionsSchema.merge(z.object({
  users_permissions_created_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
  users_permissions_updated_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
  roles_permissions: z.lazy(() => Roles_permissionsWithRelationsSchema).array(),
  users_permissions: z.lazy(() => Users_permissionsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ROLES SCHEMA
/////////////////////////////////////////

export const RolesSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string().nullish(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type Roles = z.infer<typeof RolesSchema>

// ROLES RELATION SCHEMA
//------------------------------------------------------

export type RolesRelations = {
  users_roles_created_byTousers?: UsersWithRelations | null;
  users_roles_updated_byTousers?: UsersWithRelations | null;
  roles_permissions: Roles_permissionsWithRelations[];
  users_roles: Users_rolesWithRelations[];
};

export type RolesWithRelations = z.infer<typeof RolesSchema> & RolesRelations

export const RolesWithRelationsSchema: z.ZodType<RolesWithRelations> = RolesSchema.merge(z.object({
  users_roles_created_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
  users_roles_updated_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
  roles_permissions: z.lazy(() => Roles_permissionsWithRelationsSchema).array(),
  users_roles: z.lazy(() => Users_rolesWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ROLES PERMISSIONS SCHEMA
/////////////////////////////////////////

export const Roles_permissionsSchema = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type Roles_permissions = z.infer<typeof Roles_permissionsSchema>

// ROLES PERMISSIONS RELATION SCHEMA
//------------------------------------------------------

export type Roles_permissionsRelations = {
  users_roles_permissions_created_byTousers?: UsersWithRelations | null;
  permissions: PermissionsWithRelations;
  roles: RolesWithRelations;
  users_roles_permissions_updated_byTousers?: UsersWithRelations | null;
};

export type Roles_permissionsWithRelations = z.infer<typeof Roles_permissionsSchema> & Roles_permissionsRelations

export const Roles_permissionsWithRelationsSchema: z.ZodType<Roles_permissionsWithRelations> = Roles_permissionsSchema.merge(z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
  permissions: z.lazy(() => PermissionsWithRelationsSchema),
  roles: z.lazy(() => RolesWithRelationsSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
  status: user_statusSchema,
  id: z.string().uuid(),
  phone: z.string().nullish(),
  email: z.string().nullish(),
  login: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  password: z.string(),
  salt: z.string().nullish(),
  is_super_user: z.boolean(),
  card_name: z.string().nullish(),
  card_number: z.string().nullish(),
  birth_date: z.coerce.date().nullish(),
  car_model: z.string().nullish(),
  car_number: z.string().nullish(),
  is_online: z.boolean(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  fcm_token: z.string().nullish(),
  wallet_balance: z.number(),
  max_active_order_count: z.number().int().nullish(),
  doc_files: z.string().array(),
  order_start_date: z.coerce.date().nullish(),
  app_version: z.string().nullish(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  api_token: z.string().nullish(),
  tg_id: z.string().nullish(),
})

export type Users = z.infer<typeof UsersSchema>

// USERS RELATION SCHEMA
//------------------------------------------------------

export type UsersRelations = {
  permissions_permissions_created_byTousers: PermissionsWithRelations[];
  permissions_permissions_updated_byTousers: PermissionsWithRelations[];
  roles_roles_created_byTousers: RolesWithRelations[];
  roles_roles_updated_byTousers: RolesWithRelations[];
  roles_permissions_roles_permissions_created_byTousers: Roles_permissionsWithRelations[];
  roles_permissions_roles_permissions_updated_byTousers: Roles_permissionsWithRelations[];
  users_permissions_usersTousers_permissions_created_by: Users_permissionsWithRelations[];
  users_permissions_usersTousers_permissions_updated_by: Users_permissionsWithRelations[];
  users_permissions_usersTousers_permissions_user_id: Users_permissionsWithRelations[];
  users_roles_usersTousers_roles_created_by: Users_rolesWithRelations[];
  users_roles_usersTousers_roles_updated_by: Users_rolesWithRelations[];
  users_roles_usersTousers_roles_user_id: Users_rolesWithRelations[];
  api_tokens_created_byTousers: Api_tokensWithRelations[];
  api_tokens_updated_byTousers: Api_tokensWithRelations[];
  scheduled_reports_subscription_users: Scheduled_reports_subscriptionWithRelations[];
  sessions: SessionsWithRelations[];
};

export type UsersWithRelations = z.infer<typeof UsersSchema> & UsersRelations

export const UsersWithRelationsSchema: z.ZodType<UsersWithRelations> = UsersSchema.merge(z.object({
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsWithRelationsSchema).array(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsWithRelationsSchema).array(),
  roles_roles_created_byTousers: z.lazy(() => RolesWithRelationsSchema).array(),
  roles_roles_updated_byTousers: z.lazy(() => RolesWithRelationsSchema).array(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsWithRelationsSchema).array(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsWithRelationsSchema).array(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsWithRelationsSchema).array(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsWithRelationsSchema).array(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsWithRelationsSchema).array(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesWithRelationsSchema).array(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesWithRelationsSchema).array(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesWithRelationsSchema).array(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensWithRelationsSchema).array(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensWithRelationsSchema).array(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SESSIONS SCHEMA
/////////////////////////////////////////

export const SessionsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  user_agent: z.string(),
  device_name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Sessions = z.infer<typeof SessionsSchema>

// SESSIONS RELATION SCHEMA
//------------------------------------------------------

export type SessionsRelations = {
  users_sessions: UsersWithRelations;
};

export type SessionsWithRelations = z.infer<typeof SessionsSchema> & SessionsRelations

export const SessionsWithRelationsSchema: z.ZodType<SessionsWithRelations> = SessionsSchema.merge(z.object({
  users_sessions: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// USERS PERMISSIONS SCHEMA
/////////////////////////////////////////

export const Users_permissionsSchema = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type Users_permissions = z.infer<typeof Users_permissionsSchema>

// USERS PERMISSIONS RELATION SCHEMA
//------------------------------------------------------

export type Users_permissionsRelations = {
  users_usersTousers_permissions_created_by?: UsersWithRelations | null;
  permissions: PermissionsWithRelations;
  users_usersTousers_permissions_updated_by?: UsersWithRelations | null;
  users_usersTousers_permissions_user_id: UsersWithRelations;
};

export type Users_permissionsWithRelations = z.infer<typeof Users_permissionsSchema> & Users_permissionsRelations

export const Users_permissionsWithRelationsSchema: z.ZodType<Users_permissionsWithRelations> = Users_permissionsSchema.merge(z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersWithRelationsSchema).nullish(),
  permissions: z.lazy(() => PermissionsWithRelationsSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersWithRelationsSchema).nullish(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// USERS ROLES SCHEMA
/////////////////////////////////////////

export const Users_rolesSchema = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type Users_roles = z.infer<typeof Users_rolesSchema>

// USERS ROLES RELATION SCHEMA
//------------------------------------------------------

export type Users_rolesRelations = {
  users_usersTousers_roles_created_by?: UsersWithRelations | null;
  roles: RolesWithRelations;
  users_usersTousers_roles_updated_by?: UsersWithRelations | null;
  users_usersTousers_roles_user_id: UsersWithRelations;
};

export type Users_rolesWithRelations = z.infer<typeof Users_rolesSchema> & Users_rolesRelations

export const Users_rolesWithRelationsSchema: z.ZodType<Users_rolesWithRelations> = Users_rolesSchema.merge(z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersWithRelationsSchema).nullish(),
  roles: z.lazy(() => RolesWithRelationsSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersWithRelationsSchema).nullish(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// API TOKENS SCHEMA
/////////////////////////////////////////

export const Api_tokensSchema = z.object({
  id: z.string(),
  active: z.boolean(),
  token: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type Api_tokens = z.infer<typeof Api_tokensSchema>

// API TOKENS RELATION SCHEMA
//------------------------------------------------------

export type Api_tokensRelations = {
  api_tokens_created_byTousers?: UsersWithRelations | null;
  api_tokens_updated_byTousers?: UsersWithRelations | null;
};

export type Api_tokensWithRelations = z.infer<typeof Api_tokensSchema> & Api_tokensRelations

export const Api_tokensWithRelationsSchema: z.ZodType<Api_tokensWithRelations> = Api_tokensSchema.merge(z.object({
  api_tokens_created_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
  api_tokens_updated_byTousers: z.lazy(() => UsersWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// SCHEDULED REPORTS SCHEMA
/////////////////////////////////////////

export const Scheduled_reportsSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  cron: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Scheduled_reports = z.infer<typeof Scheduled_reportsSchema>

// SCHEDULED REPORTS RELATION SCHEMA
//------------------------------------------------------

export type Scheduled_reportsRelations = {
  scheduled_reports_scheduled_reports_subscriptions: Scheduled_reports_subscriptionWithRelations[];
};

export type Scheduled_reportsWithRelations = z.infer<typeof Scheduled_reportsSchema> & Scheduled_reportsRelations

export const Scheduled_reportsWithRelationsSchema: z.ZodType<Scheduled_reportsWithRelations> = Scheduled_reportsSchema.merge(z.object({
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SCHEDULED REPORTS SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const Scheduled_reports_subscriptionSchema = z.object({
  id: z.string(),
  report_id: z.string(),
  user_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Scheduled_reports_subscription = z.infer<typeof Scheduled_reports_subscriptionSchema>

// SCHEDULED REPORTS SUBSCRIPTION RELATION SCHEMA
//------------------------------------------------------

export type Scheduled_reports_subscriptionRelations = {
  scheduled_reports_subscription_reports: Scheduled_reportsWithRelations;
  scheduled_reports_subscription_users: UsersWithRelations;
};

export type Scheduled_reports_subscriptionWithRelations = z.infer<typeof Scheduled_reports_subscriptionSchema> & Scheduled_reports_subscriptionRelations

export const Scheduled_reports_subscriptionWithRelationsSchema: z.ZodType<Scheduled_reports_subscriptionWithRelations> = Scheduled_reports_subscriptionSchema.merge(z.object({
  scheduled_reports_subscription_reports: z.lazy(() => Scheduled_reportsWithRelationsSchema),
  scheduled_reports_subscription_users: z.lazy(() => UsersWithRelationsSchema),
}))

/////////////////////////////////////////
// LANGS SCHEMA
/////////////////////////////////////////

export const LangsSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  is_default: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Langs = z.infer<typeof LangsSchema>

/////////////////////////////////////////
// CATEGORIES SCHEMA
/////////////////////////////////////////

export const CategoriesSchema = z.object({
  id: z.string(),
  active: z.boolean(),
  name: z.string(),
  description: z.string().nullish(),
  code: z.string(),
  parent_id: z.string().nullish(),
  i18n_name: InputJsonValue,
  i18n_description: NullableJsonValue.optional(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Categories = z.infer<typeof CategoriesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PERMISSIONS
//------------------------------------------------------

export const PermissionsIncludeSchema: z.ZodType<Prisma.PermissionsInclude> = z.object({
  users_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PermissionsArgsSchema: z.ZodType<Prisma.PermissionsDefaultArgs> = z.object({
  select: z.lazy(() => PermissionsSelectSchema).optional(),
  include: z.lazy(() => PermissionsIncludeSchema).optional(),
}).strict();

export const PermissionsCountOutputTypeArgsSchema: z.ZodType<Prisma.PermissionsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PermissionsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PermissionsCountOutputTypeSelectSchema: z.ZodType<Prisma.PermissionsCountOutputTypeSelect> = z.object({
  roles_permissions: z.boolean().optional(),
  users_permissions: z.boolean().optional(),
}).strict();

export const PermissionsSelectSchema: z.ZodType<Prisma.PermissionsSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  active: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLES
//------------------------------------------------------

export const RolesIncludeSchema: z.ZodType<Prisma.RolesInclude> = z.object({
  users_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  users_roles: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RolesArgsSchema: z.ZodType<Prisma.RolesDefaultArgs> = z.object({
  select: z.lazy(() => RolesSelectSchema).optional(),
  include: z.lazy(() => RolesIncludeSchema).optional(),
}).strict();

export const RolesCountOutputTypeArgsSchema: z.ZodType<Prisma.RolesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RolesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RolesCountOutputTypeSelectSchema: z.ZodType<Prisma.RolesCountOutputTypeSelect> = z.object({
  roles_permissions: z.boolean().optional(),
  users_roles: z.boolean().optional(),
}).strict();

export const RolesSelectSchema: z.ZodType<Prisma.RolesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  code: z.boolean().optional(),
  active: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  users_roles: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLES PERMISSIONS
//------------------------------------------------------

export const Roles_permissionsIncludeSchema: z.ZodType<Prisma.Roles_permissionsInclude> = z.object({
  users_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => PermissionsArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
  users_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

export const Roles_permissionsArgsSchema: z.ZodType<Prisma.Roles_permissionsDefaultArgs> = z.object({
  select: z.lazy(() => Roles_permissionsSelectSchema).optional(),
  include: z.lazy(() => Roles_permissionsIncludeSchema).optional(),
}).strict();

export const Roles_permissionsSelectSchema: z.ZodType<Prisma.Roles_permissionsSelect> = z.object({
  role_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => PermissionsArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
  users_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

// USERS
//------------------------------------------------------

export const UsersIncludeSchema: z.ZodType<Prisma.UsersInclude> = z.object({
  permissions_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => PermissionsFindManyArgsSchema)]).optional(),
  permissions_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => PermissionsFindManyArgsSchema)]).optional(),
  roles_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => RolesFindManyArgsSchema)]).optional(),
  roles_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => RolesFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  api_tokens_created_byTousers: z.union([z.boolean(),z.lazy(() => Api_tokensFindManyArgsSchema)]).optional(),
  api_tokens_updated_byTousers: z.union([z.boolean(),z.lazy(() => Api_tokensFindManyArgsSchema)]).optional(),
  scheduled_reports_subscription_users: z.union([z.boolean(),z.lazy(() => Scheduled_reports_subscriptionFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UsersArgsSchema: z.ZodType<Prisma.UsersDefaultArgs> = z.object({
  select: z.lazy(() => UsersSelectSchema).optional(),
  include: z.lazy(() => UsersIncludeSchema).optional(),
}).strict();

export const UsersCountOutputTypeArgsSchema: z.ZodType<Prisma.UsersCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UsersCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UsersCountOutputTypeSelectSchema: z.ZodType<Prisma.UsersCountOutputTypeSelect> = z.object({
  permissions_permissions_created_byTousers: z.boolean().optional(),
  permissions_permissions_updated_byTousers: z.boolean().optional(),
  roles_roles_created_byTousers: z.boolean().optional(),
  roles_roles_updated_byTousers: z.boolean().optional(),
  roles_permissions_roles_permissions_created_byTousers: z.boolean().optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.boolean().optional(),
  users_permissions_usersTousers_permissions_created_by: z.boolean().optional(),
  users_permissions_usersTousers_permissions_updated_by: z.boolean().optional(),
  users_permissions_usersTousers_permissions_user_id: z.boolean().optional(),
  users_roles_usersTousers_roles_created_by: z.boolean().optional(),
  users_roles_usersTousers_roles_updated_by: z.boolean().optional(),
  users_roles_usersTousers_roles_user_id: z.boolean().optional(),
  api_tokens_created_byTousers: z.boolean().optional(),
  api_tokens_updated_byTousers: z.boolean().optional(),
  scheduled_reports_subscription_users: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UsersSelectSchema: z.ZodType<Prisma.UsersSelect> = z.object({
  id: z.boolean().optional(),
  phone: z.boolean().optional(),
  email: z.boolean().optional(),
  login: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  password: z.boolean().optional(),
  salt: z.boolean().optional(),
  is_super_user: z.boolean().optional(),
  status: z.boolean().optional(),
  card_name: z.boolean().optional(),
  card_number: z.boolean().optional(),
  birth_date: z.boolean().optional(),
  car_model: z.boolean().optional(),
  car_number: z.boolean().optional(),
  is_online: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  fcm_token: z.boolean().optional(),
  wallet_balance: z.boolean().optional(),
  max_active_order_count: z.boolean().optional(),
  doc_files: z.boolean().optional(),
  order_start_date: z.boolean().optional(),
  app_version: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  api_token: z.boolean().optional(),
  tg_id: z.boolean().optional(),
  permissions_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => PermissionsFindManyArgsSchema)]).optional(),
  permissions_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => PermissionsFindManyArgsSchema)]).optional(),
  roles_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => RolesFindManyArgsSchema)]).optional(),
  roles_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => RolesFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => Roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => Users_permissionsFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => Users_rolesFindManyArgsSchema)]).optional(),
  api_tokens_created_byTousers: z.union([z.boolean(),z.lazy(() => Api_tokensFindManyArgsSchema)]).optional(),
  api_tokens_updated_byTousers: z.union([z.boolean(),z.lazy(() => Api_tokensFindManyArgsSchema)]).optional(),
  scheduled_reports_subscription_users: z.union([z.boolean(),z.lazy(() => Scheduled_reports_subscriptionFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSIONS
//------------------------------------------------------

export const SessionsIncludeSchema: z.ZodType<Prisma.SessionsInclude> = z.object({
  users_sessions: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

export const SessionsArgsSchema: z.ZodType<Prisma.SessionsDefaultArgs> = z.object({
  select: z.lazy(() => SessionsSelectSchema).optional(),
  include: z.lazy(() => SessionsIncludeSchema).optional(),
}).strict();

export const SessionsSelectSchema: z.ZodType<Prisma.SessionsSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  user_agent: z.boolean().optional(),
  device_name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  users_sessions: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

// USERS PERMISSIONS
//------------------------------------------------------

export const Users_permissionsIncludeSchema: z.ZodType<Prisma.Users_permissionsInclude> = z.object({
  users_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => PermissionsArgsSchema)]).optional(),
  users_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

export const Users_permissionsArgsSchema: z.ZodType<Prisma.Users_permissionsDefaultArgs> = z.object({
  select: z.lazy(() => Users_permissionsSelectSchema).optional(),
  include: z.lazy(() => Users_permissionsIncludeSchema).optional(),
}).strict();

export const Users_permissionsSelectSchema: z.ZodType<Prisma.Users_permissionsSelect> = z.object({
  user_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => PermissionsArgsSchema)]).optional(),
  users_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

// USERS ROLES
//------------------------------------------------------

export const Users_rolesIncludeSchema: z.ZodType<Prisma.Users_rolesInclude> = z.object({
  users_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
  users_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

export const Users_rolesArgsSchema: z.ZodType<Prisma.Users_rolesDefaultArgs> = z.object({
  select: z.lazy(() => Users_rolesSelectSchema).optional(),
  include: z.lazy(() => Users_rolesIncludeSchema).optional(),
}).strict();

export const Users_rolesSelectSchema: z.ZodType<Prisma.Users_rolesSelect> = z.object({
  user_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => RolesArgsSchema)]).optional(),
  users_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  users_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

// API TOKENS
//------------------------------------------------------

export const Api_tokensIncludeSchema: z.ZodType<Prisma.Api_tokensInclude> = z.object({
  api_tokens_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  api_tokens_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

export const Api_tokensArgsSchema: z.ZodType<Prisma.Api_tokensDefaultArgs> = z.object({
  select: z.lazy(() => Api_tokensSelectSchema).optional(),
  include: z.lazy(() => Api_tokensIncludeSchema).optional(),
}).strict();

export const Api_tokensSelectSchema: z.ZodType<Prisma.Api_tokensSelect> = z.object({
  id: z.boolean().optional(),
  active: z.boolean().optional(),
  token: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  api_tokens_created_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  api_tokens_updated_byTousers: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

// SCHEDULED REPORTS
//------------------------------------------------------

export const Scheduled_reportsIncludeSchema: z.ZodType<Prisma.Scheduled_reportsInclude> = z.object({
  scheduled_reports_scheduled_reports_subscriptions: z.union([z.boolean(),z.lazy(() => Scheduled_reports_subscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Scheduled_reportsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Scheduled_reportsArgsSchema: z.ZodType<Prisma.Scheduled_reportsDefaultArgs> = z.object({
  select: z.lazy(() => Scheduled_reportsSelectSchema).optional(),
  include: z.lazy(() => Scheduled_reportsIncludeSchema).optional(),
}).strict();

export const Scheduled_reportsCountOutputTypeArgsSchema: z.ZodType<Prisma.Scheduled_reportsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => Scheduled_reportsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Scheduled_reportsCountOutputTypeSelectSchema: z.ZodType<Prisma.Scheduled_reportsCountOutputTypeSelect> = z.object({
  scheduled_reports_scheduled_reports_subscriptions: z.boolean().optional(),
}).strict();

export const Scheduled_reportsSelectSchema: z.ZodType<Prisma.Scheduled_reportsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  code: z.boolean().optional(),
  cron: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.union([z.boolean(),z.lazy(() => Scheduled_reports_subscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Scheduled_reportsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SCHEDULED REPORTS SUBSCRIPTION
//------------------------------------------------------

export const Scheduled_reports_subscriptionIncludeSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionInclude> = z.object({
  scheduled_reports_subscription_reports: z.union([z.boolean(),z.lazy(() => Scheduled_reportsArgsSchema)]).optional(),
  scheduled_reports_subscription_users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

export const Scheduled_reports_subscriptionArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionDefaultArgs> = z.object({
  select: z.lazy(() => Scheduled_reports_subscriptionSelectSchema).optional(),
  include: z.lazy(() => Scheduled_reports_subscriptionIncludeSchema).optional(),
}).strict();

export const Scheduled_reports_subscriptionSelectSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionSelect> = z.object({
  id: z.boolean().optional(),
  report_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  scheduled_reports_subscription_reports: z.union([z.boolean(),z.lazy(() => Scheduled_reportsArgsSchema)]).optional(),
  scheduled_reports_subscription_users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

// LANGS
//------------------------------------------------------

export const LangsSelectSchema: z.ZodType<Prisma.LangsSelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  is_default: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// CATEGORIES
//------------------------------------------------------

export const CategoriesSelectSchema: z.ZodType<Prisma.CategoriesSelect> = z.object({
  id: z.boolean().optional(),
  active: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  code: z.boolean().optional(),
  parent_id: z.boolean().optional(),
  i18n_name: z.boolean().optional(),
  i18n_description: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PermissionsWhereInputSchema: z.ZodType<Prisma.PermissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionsWhereInputSchema),z.lazy(() => PermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionsWhereInputSchema),z.lazy(() => PermissionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsListRelationFilterSchema).optional()
}).strict();

export const PermissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PermissionsWhereUniqueInputSchema: z.ZodType<Prisma.PermissionsWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    slug: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => PermissionsWhereInputSchema),z.lazy(() => PermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionsWhereInputSchema),z.lazy(() => PermissionsWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsListRelationFilterSchema).optional()
}).strict());

export const PermissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PermissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RolesWhereInputSchema: z.ZodType<Prisma.RolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_roles_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_roles: z.lazy(() => Users_rolesListRelationFilterSchema).optional()
}).strict();

export const RolesOrderByWithRelationInputSchema: z.ZodType<Prisma.RolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RolesWhereUniqueInputSchema: z.ZodType<Prisma.RolesWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string(),
    code: z.string()
  }),
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  z.object({
    id: z.string(),
    code: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
    code: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesWhereInputSchema),z.lazy(() => RolesWhereInputSchema).array() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_roles_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_roles: z.lazy(() => Users_rolesListRelationFilterSchema).optional()
}).strict());

export const RolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolesMinOrderByAggregateInputSchema).optional()
}).strict();

export const RolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Roles_permissionsWhereInputSchema: z.ZodType<Prisma.Roles_permissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Roles_permissionsWhereInputSchema),z.lazy(() => Roles_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Roles_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Roles_permissionsWhereInputSchema),z.lazy(() => Roles_permissionsWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => PermissionsWhereInputSchema) ]).optional(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
  users_roles_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.Roles_permissionsOrderByWithRelationInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_roles_permissions_created_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  permissions: z.lazy(() => PermissionsOrderByWithRelationInputSchema).optional(),
  roles: z.lazy(() => RolesOrderByWithRelationInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional()
}).strict();

export const Roles_permissionsWhereUniqueInputSchema: z.ZodType<Prisma.Roles_permissionsWhereUniqueInput> = z.object({
  role_id_permission_id: z.lazy(() => Roles_permissionsRole_idPermission_idCompoundUniqueInputSchema)
})
.and(z.object({
  role_id_permission_id: z.lazy(() => Roles_permissionsRole_idPermission_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => Roles_permissionsWhereInputSchema),z.lazy(() => Roles_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Roles_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Roles_permissionsWhereInputSchema),z.lazy(() => Roles_permissionsWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => PermissionsWhereInputSchema) ]).optional(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
  users_roles_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
}).strict());

export const Roles_permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Roles_permissionsOrderByWithAggregationInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => Roles_permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Roles_permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Roles_permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Roles_permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Roles_permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Roles_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Roles_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Roles_permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Roles_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Roles_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UsersWhereInputSchema: z.ZodType<Prisma.UsersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  login: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  salt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_super_user: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  status: z.union([ z.lazy(() => Enumuser_statusFilterSchema),z.lazy(() => user_statusSchema) ]).optional(),
  card_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  card_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birth_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  car_model: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  car_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_online: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  fcm_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wallet_balance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  max_active_order_count: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  doc_files: z.lazy(() => StringNullableListFilterSchema).optional(),
  order_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  app_version: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  api_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tg_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsListRelationFilterSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsListRelationFilterSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesListRelationFilterSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesListRelationFilterSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsListRelationFilterSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsListRelationFilterSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsListRelationFilterSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesListRelationFilterSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesListRelationFilterSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesListRelationFilterSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensListRelationFilterSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensListRelationFilterSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionsListRelationFilterSchema).optional()
}).strict();

export const UsersOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  login: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  card_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birth_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_model: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fcm_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doc_files: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  app_version: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tg_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsOrderByRelationAggregateInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsOrderByRelationAggregateInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesOrderByRelationAggregateInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesOrderByRelationAggregateInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesOrderByRelationAggregateInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensOrderByRelationAggregateInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensOrderByRelationAggregateInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UsersWhereUniqueInputSchema: z.ZodType<Prisma.UsersWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    phone: z.string(),
    email: z.string(),
    login: z.string()
  }),
  z.object({
    id: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    phone: z.string(),
    login: z.string(),
  }),
  z.object({
    id: z.string(),
    phone: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
    login: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    login: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    phone: z.string(),
    email: z.string(),
    login: z.string(),
  }),
  z.object({
    phone: z.string(),
    email: z.string(),
  }),
  z.object({
    phone: z.string(),
    login: z.string(),
  }),
  z.object({
    phone: z.string(),
  }),
  z.object({
    email: z.string(),
    login: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    login: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  login: z.string().optional(),
  AND: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  salt: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_super_user: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  status: z.union([ z.lazy(() => Enumuser_statusFilterSchema),z.lazy(() => user_statusSchema) ]).optional(),
  card_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  card_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birth_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  car_model: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  car_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_online: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  fcm_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  wallet_balance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  max_active_order_count: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  doc_files: z.lazy(() => StringNullableListFilterSchema).optional(),
  order_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  app_version: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  api_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tg_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsListRelationFilterSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsListRelationFilterSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesListRelationFilterSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesListRelationFilterSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsListRelationFilterSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsListRelationFilterSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsListRelationFilterSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesListRelationFilterSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesListRelationFilterSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesListRelationFilterSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensListRelationFilterSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensListRelationFilterSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionsListRelationFilterSchema).optional()
}).strict());

export const UsersOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  login: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  card_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birth_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_model: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fcm_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doc_files: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  app_version: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tg_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UsersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UsersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UsersSumOrderByAggregateInputSchema).optional()
}).strict();

export const UsersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  login: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  salt: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_super_user: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  status: z.union([ z.lazy(() => Enumuser_statusWithAggregatesFilterSchema),z.lazy(() => user_statusSchema) ]).optional(),
  card_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  card_number: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  birth_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  car_model: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  car_number: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_online: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  fcm_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  wallet_balance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  max_active_order_count: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  doc_files: z.lazy(() => StringNullableListFilterSchema).optional(),
  order_start_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  app_version: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  api_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tg_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionsWhereInputSchema: z.ZodType<Prisma.SessionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionsWhereInputSchema),z.lazy(() => SessionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionsWhereInputSchema),z.lazy(() => SessionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_agent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users_sessions: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict();

export const SessionsOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_agent: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  users_sessions: z.lazy(() => UsersOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionsWhereUniqueInputSchema: z.ZodType<Prisma.SessionsWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionsWhereInputSchema),z.lazy(() => SessionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionsWhereInputSchema),z.lazy(() => SessionsWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_agent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users_sessions: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict());

export const SessionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_agent: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionsScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionsScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_agent: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const Users_permissionsWhereInputSchema: z.ZodType<Prisma.Users_permissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Users_permissionsWhereInputSchema),z.lazy(() => Users_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_permissionsWhereInputSchema),z.lazy(() => Users_permissionsWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_permissions_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => PermissionsWhereInputSchema) ]).optional(),
  users_usersTousers_permissions_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_permissions_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict();

export const Users_permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.Users_permissionsOrderByWithRelationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_usersTousers_permissions_created_by: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  permissions: z.lazy(() => PermissionsOrderByWithRelationInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersOrderByWithRelationInputSchema).optional()
}).strict();

export const Users_permissionsWhereUniqueInputSchema: z.ZodType<Prisma.Users_permissionsWhereUniqueInput> = z.object({
  user_id_permission_id: z.lazy(() => Users_permissionsUser_idPermission_idCompoundUniqueInputSchema)
})
.and(z.object({
  user_id_permission_id: z.lazy(() => Users_permissionsUser_idPermission_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => Users_permissionsWhereInputSchema),z.lazy(() => Users_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_permissionsWhereInputSchema),z.lazy(() => Users_permissionsWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_permissions_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => PermissionsWhereInputSchema) ]).optional(),
  users_usersTousers_permissions_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_permissions_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict());

export const Users_permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Users_permissionsOrderByWithAggregationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => Users_permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Users_permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Users_permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Users_permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Users_permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Users_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Users_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Users_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Users_rolesWhereInputSchema: z.ZodType<Prisma.Users_rolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Users_rolesWhereInputSchema),z.lazy(() => Users_rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_rolesWhereInputSchema),z.lazy(() => Users_rolesWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_roles_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
  users_usersTousers_roles_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_roles_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict();

export const Users_rolesOrderByWithRelationInputSchema: z.ZodType<Prisma.Users_rolesOrderByWithRelationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_usersTousers_roles_created_by: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  roles: z.lazy(() => RolesOrderByWithRelationInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersOrderByWithRelationInputSchema).optional()
}).strict();

export const Users_rolesWhereUniqueInputSchema: z.ZodType<Prisma.Users_rolesWhereUniqueInput> = z.object({
  user_id_role_id: z.lazy(() => Users_rolesUser_idRole_idCompoundUniqueInputSchema)
})
.and(z.object({
  user_id_role_id: z.lazy(() => Users_rolesUser_idRole_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => Users_rolesWhereInputSchema),z.lazy(() => Users_rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_rolesWhereInputSchema),z.lazy(() => Users_rolesWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_roles_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => RolesWhereInputSchema) ]).optional(),
  users_usersTousers_roles_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_roles_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict());

export const Users_rolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.Users_rolesOrderByWithAggregationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => Users_rolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Users_rolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Users_rolesMinOrderByAggregateInputSchema).optional()
}).strict();

export const Users_rolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Users_rolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Users_rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => Users_rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_rolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => Users_rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Api_tokensWhereInputSchema: z.ZodType<Prisma.Api_tokensWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Api_tokensWhereInputSchema),z.lazy(() => Api_tokensWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Api_tokensWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Api_tokensWhereInputSchema),z.lazy(() => Api_tokensWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  api_tokens_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  api_tokens_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
}).strict();

export const Api_tokensOrderByWithRelationInputSchema: z.ZodType<Prisma.Api_tokensOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  api_tokens_created_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => UsersOrderByWithRelationInputSchema).optional()
}).strict();

export const Api_tokensWhereUniqueInputSchema: z.ZodType<Prisma.Api_tokensWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => Api_tokensWhereInputSchema),z.lazy(() => Api_tokensWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Api_tokensWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Api_tokensWhereInputSchema),z.lazy(() => Api_tokensWhereInputSchema).array() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  api_tokens_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
  api_tokens_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional().nullable(),
}).strict());

export const Api_tokensOrderByWithAggregationInputSchema: z.ZodType<Prisma.Api_tokensOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => Api_tokensCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Api_tokensMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Api_tokensMinOrderByAggregateInputSchema).optional()
}).strict();

export const Api_tokensScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Api_tokensScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Api_tokensScalarWhereWithAggregatesInputSchema),z.lazy(() => Api_tokensScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Api_tokensScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Api_tokensScalarWhereWithAggregatesInputSchema),z.lazy(() => Api_tokensScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Scheduled_reportsWhereInputSchema: z.ZodType<Prisma.Scheduled_reportsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Scheduled_reportsWhereInputSchema),z.lazy(() => Scheduled_reportsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Scheduled_reportsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Scheduled_reportsWhereInputSchema),z.lazy(() => Scheduled_reportsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cron: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionListRelationFilterSchema).optional()
}).strict();

export const Scheduled_reportsOrderByWithRelationInputSchema: z.ZodType<Prisma.Scheduled_reportsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  cron: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Scheduled_reportsWhereUniqueInputSchema: z.ZodType<Prisma.Scheduled_reportsWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => Scheduled_reportsWhereInputSchema),z.lazy(() => Scheduled_reportsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Scheduled_reportsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Scheduled_reportsWhereInputSchema),z.lazy(() => Scheduled_reportsWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cron: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionListRelationFilterSchema).optional()
}).strict());

export const Scheduled_reportsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Scheduled_reportsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  cron: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Scheduled_reportsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Scheduled_reportsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Scheduled_reportsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Scheduled_reportsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Scheduled_reportsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Scheduled_reportsScalarWhereWithAggregatesInputSchema),z.lazy(() => Scheduled_reportsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Scheduled_reportsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Scheduled_reportsScalarWhereWithAggregatesInputSchema),z.lazy(() => Scheduled_reportsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  cron: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionWhereInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  report_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scheduled_reports_subscription_reports: z.union([ z.lazy(() => Scheduled_reportsRelationFilterSchema),z.lazy(() => Scheduled_reportsWhereInputSchema) ]).optional(),
  scheduled_reports_subscription_users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  scheduled_reports_subscription_reports: z.lazy(() => Scheduled_reportsOrderByWithRelationInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => UsersOrderByWithRelationInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionWhereUniqueInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).array() ]).optional(),
  report_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scheduled_reports_subscription_reports: z.union([ z.lazy(() => Scheduled_reportsRelationFilterSchema),z.lazy(() => Scheduled_reportsWhereInputSchema) ]).optional(),
  scheduled_reports_subscription_users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict());

export const Scheduled_reports_subscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Scheduled_reports_subscriptionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Scheduled_reports_subscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Scheduled_reports_subscriptionMinOrderByAggregateInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Scheduled_reports_subscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  report_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LangsWhereInputSchema: z.ZodType<Prisma.LangsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LangsWhereInputSchema),z.lazy(() => LangsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LangsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LangsWhereInputSchema),z.lazy(() => LangsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_default: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LangsOrderByWithRelationInputSchema: z.ZodType<Prisma.LangsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  is_default: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LangsWhereUniqueInputSchema: z.ZodType<Prisma.LangsWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    code: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => LangsWhereInputSchema),z.lazy(() => LangsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LangsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LangsWhereInputSchema),z.lazy(() => LangsWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_default: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const LangsOrderByWithAggregationInputSchema: z.ZodType<Prisma.LangsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  is_default: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LangsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LangsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LangsMinOrderByAggregateInputSchema).optional()
}).strict();

export const LangsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LangsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LangsScalarWhereWithAggregatesInputSchema),z.lazy(() => LangsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LangsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LangsScalarWhereWithAggregatesInputSchema),z.lazy(() => LangsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_default: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CategoriesWhereInputSchema: z.ZodType<Prisma.CategoriesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parent_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  i18n_name: z.lazy(() => JsonFilterSchema).optional(),
  i18n_description: z.lazy(() => JsonNullableFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CategoriesOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoriesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  i18n_name: z.lazy(() => SortOrderSchema).optional(),
  i18n_description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriesWhereUniqueInputSchema: z.ZodType<Prisma.CategoriesWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parent_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  i18n_name: z.lazy(() => JsonFilterSchema).optional(),
  i18n_description: z.lazy(() => JsonNullableFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const CategoriesOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoriesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  i18n_name: z.lazy(() => SortOrderSchema).optional(),
  i18n_description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoriesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoriesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoriesMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoriesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoriesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  parent_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  i18n_name: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  i18n_description: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionsCreateInputSchema: z.ZodType<Prisma.PermissionsCreateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsUpdateInputSchema: z.ZodType<Prisma.PermissionsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsCreateManyInputSchema: z.ZodType<Prisma.PermissionsCreateManyInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const PermissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RolesCreateInputSchema: z.ZodType<Prisma.RolesCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateInputSchema: z.ZodType<Prisma.RolesUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUpdateInputSchema: z.ZodType<Prisma.RolesUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesCreateManyInputSchema: z.ZodType<Prisma.RolesCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const RolesUpdateManyMutationInputSchema: z.ZodType<Prisma.RolesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsCreateInputSchema: z.ZodType<Prisma.Roles_permissionsCreateInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => RolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedCreateInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsUpdateInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsCreateManyInputSchema: z.ZodType<Prisma.Roles_permissionsCreateManyInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyMutationInput> = z.object({
}).strict();

export const Roles_permissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersCreateInputSchema: z.ZodType<Prisma.UsersCreateInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateInputSchema: z.ZodType<Prisma.UsersUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUpdateInputSchema: z.ZodType<Prisma.UsersUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersCreateManyInputSchema: z.ZodType<Prisma.UsersCreateManyInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable()
}).strict();

export const UsersUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionsCreateInputSchema: z.ZodType<Prisma.SessionsCreateInput> = z.object({
  id: z.string().optional(),
  user_agent: z.string(),
  device_name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_sessions: z.lazy(() => UsersCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionsUncheckedCreateInputSchema: z.ZodType<Prisma.SessionsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  user_agent: z.string(),
  device_name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SessionsUpdateInputSchema: z.ZodType<Prisma.SessionsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_agent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_sessions: z.lazy(() => UsersUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionsUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_agent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionsCreateManyInputSchema: z.ZodType<Prisma.SessionsCreateManyInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  user_agent: z.string(),
  device_name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SessionsUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_agent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_agent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Users_permissionsCreateInputSchema: z.ZodType<Prisma.Users_permissionsCreateInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const Users_permissionsUncheckedCreateInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsUpdateInputSchema: z.ZodType<Prisma.Users_permissionsUpdateInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const Users_permissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsCreateManyInputSchema: z.ZodType<Prisma.Users_permissionsCreateManyInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyMutationInput> = z.object({
}).strict();

export const Users_permissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesCreateInputSchema: z.ZodType<Prisma.Users_rolesCreateInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  roles: z.lazy(() => RolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const Users_rolesUncheckedCreateInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesUpdateInputSchema: z.ZodType<Prisma.Users_rolesUpdateInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const Users_rolesUncheckedUpdateInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesCreateManyInputSchema: z.ZodType<Prisma.Users_rolesCreateManyInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesUpdateManyMutationInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyMutationInput> = z.object({
}).strict();

export const Users_rolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Api_tokensCreateInputSchema: z.ZodType<Prisma.Api_tokensCreateInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_tokens_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutApi_tokens_updated_byTousersInputSchema).optional()
}).strict();

export const Api_tokensUncheckedCreateInputSchema: z.ZodType<Prisma.Api_tokensUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Api_tokensUpdateInputSchema: z.ZodType<Prisma.Api_tokensUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_tokens_created_byTousers: z.lazy(() => UsersUpdateOneWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutApi_tokens_updated_byTousersNestedInputSchema).optional()
}).strict();

export const Api_tokensUncheckedUpdateInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Api_tokensCreateManyInputSchema: z.ZodType<Prisma.Api_tokensCreateManyInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Api_tokensUpdateManyMutationInputSchema: z.ZodType<Prisma.Api_tokensUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Api_tokensUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Scheduled_reportsCreateInputSchema: z.ZodType<Prisma.Scheduled_reportsCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  cron: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_reportsInputSchema).optional()
}).strict();

export const Scheduled_reportsUncheckedCreateInputSchema: z.ZodType<Prisma.Scheduled_reportsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  cron: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_reportsInputSchema).optional()
}).strict();

export const Scheduled_reportsUpdateInputSchema: z.ZodType<Prisma.Scheduled_reportsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cron: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_reportsNestedInputSchema).optional()
}).strict();

export const Scheduled_reportsUncheckedUpdateInputSchema: z.ZodType<Prisma.Scheduled_reportsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cron: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scheduled_reports_scheduled_reports_subscriptions: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_reportsNestedInputSchema).optional()
}).strict();

export const Scheduled_reportsCreateManyInputSchema: z.ZodType<Prisma.Scheduled_reportsCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  cron: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reportsUpdateManyMutationInputSchema: z.ZodType<Prisma.Scheduled_reportsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cron: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reportsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Scheduled_reportsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cron: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionCreateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  scheduled_reports_subscription_reports: z.lazy(() => Scheduled_reportsCreateNestedOneWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),
  scheduled_reports_subscription_users: z.lazy(() => UsersCreateNestedOneWithoutScheduled_reports_subscription_usersInputSchema)
}).strict();

export const Scheduled_reports_subscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  report_id: z.string(),
  user_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reports_subscriptionUpdateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scheduled_reports_subscription_reports: z.lazy(() => Scheduled_reportsUpdateOneRequiredWithoutScheduled_reports_scheduled_reports_subscriptionsNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => UsersUpdateOneRequiredWithoutScheduled_reports_subscription_usersNestedInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionCreateManyInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateManyInput> = z.object({
  id: z.string().optional(),
  report_id: z.string(),
  user_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reports_subscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LangsCreateInputSchema: z.ZodType<Prisma.LangsCreateInput> = z.object({
  id: z.string().optional(),
  code: z.string(),
  name: z.string(),
  is_default: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const LangsUncheckedCreateInputSchema: z.ZodType<Prisma.LangsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  code: z.string(),
  name: z.string(),
  is_default: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const LangsUpdateInputSchema: z.ZodType<Prisma.LangsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_default: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LangsUncheckedUpdateInputSchema: z.ZodType<Prisma.LangsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_default: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LangsCreateManyInputSchema: z.ZodType<Prisma.LangsCreateManyInput> = z.object({
  id: z.string().optional(),
  code: z.string(),
  name: z.string(),
  is_default: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const LangsUpdateManyMutationInputSchema: z.ZodType<Prisma.LangsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_default: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LangsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LangsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_default: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesCreateInputSchema: z.ZodType<Prisma.CategoriesCreateInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  code: z.string(),
  parent_id: z.string().optional().nullable(),
  i18n_name: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  i18n_description: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CategoriesUncheckedCreateInputSchema: z.ZodType<Prisma.CategoriesUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  code: z.string(),
  parent_id: z.string().optional().nullable(),
  i18n_name: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  i18n_description: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CategoriesUpdateInputSchema: z.ZodType<Prisma.CategoriesUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  i18n_name: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  i18n_description: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoriesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  i18n_name: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  i18n_description: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesCreateManyInputSchema: z.ZodType<Prisma.CategoriesCreateManyInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  code: z.string(),
  parent_id: z.string().optional().nullable(),
  i18n_name: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  i18n_description: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CategoriesUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoriesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  i18n_name: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  i18n_description: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoriesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  i18n_name: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  i18n_description: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UsersNullableRelationFilterSchema: z.ZodType<Prisma.UsersNullableRelationFilter> = z.object({
  is: z.lazy(() => UsersWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UsersWhereInputSchema).optional().nullable()
}).strict();

export const Roles_permissionsListRelationFilterSchema: z.ZodType<Prisma.Roles_permissionsListRelationFilter> = z.object({
  every: z.lazy(() => Roles_permissionsWhereInputSchema).optional(),
  some: z.lazy(() => Roles_permissionsWhereInputSchema).optional(),
  none: z.lazy(() => Roles_permissionsWhereInputSchema).optional()
}).strict();

export const Users_permissionsListRelationFilterSchema: z.ZodType<Prisma.Users_permissionsListRelationFilter> = z.object({
  every: z.lazy(() => Users_permissionsWhereInputSchema).optional(),
  some: z.lazy(() => Users_permissionsWhereInputSchema).optional(),
  none: z.lazy(() => Users_permissionsWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const Roles_permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Roles_permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Users_permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Users_permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesListRelationFilterSchema: z.ZodType<Prisma.Users_rolesListRelationFilter> = z.object({
  every: z.lazy(() => Users_rolesWhereInputSchema).optional(),
  some: z.lazy(() => Users_rolesWhereInputSchema).optional(),
  none: z.lazy(() => Users_rolesWhereInputSchema).optional()
}).strict();

export const Users_rolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Users_rolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const PermissionsRelationFilterSchema: z.ZodType<Prisma.PermissionsRelationFilter> = z.object({
  is: z.lazy(() => PermissionsWhereInputSchema).optional(),
  isNot: z.lazy(() => PermissionsWhereInputSchema).optional()
}).strict();

export const RolesRelationFilterSchema: z.ZodType<Prisma.RolesRelationFilter> = z.object({
  is: z.lazy(() => RolesWhereInputSchema).optional(),
  isNot: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const Roles_permissionsRole_idPermission_idCompoundUniqueInputSchema: z.ZodType<Prisma.Roles_permissionsRole_idPermission_idCompoundUniqueInput> = z.object({
  role_id: z.string(),
  permission_id: z.string()
}).strict();

export const Roles_permissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Roles_permissionsCountOrderByAggregateInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Roles_permissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Roles_permissionsMaxOrderByAggregateInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Roles_permissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Roles_permissionsMinOrderByAggregateInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumuser_statusFilterSchema: z.ZodType<Prisma.Enumuser_statusFilter> = z.object({
  equals: z.lazy(() => user_statusSchema).optional(),
  in: z.lazy(() => user_statusSchema).array().optional(),
  notIn: z.lazy(() => user_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => NestedEnumuser_statusFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const PermissionsListRelationFilterSchema: z.ZodType<Prisma.PermissionsListRelationFilter> = z.object({
  every: z.lazy(() => PermissionsWhereInputSchema).optional(),
  some: z.lazy(() => PermissionsWhereInputSchema).optional(),
  none: z.lazy(() => PermissionsWhereInputSchema).optional()
}).strict();

export const RolesListRelationFilterSchema: z.ZodType<Prisma.RolesListRelationFilter> = z.object({
  every: z.lazy(() => RolesWhereInputSchema).optional(),
  some: z.lazy(() => RolesWhereInputSchema).optional(),
  none: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const Api_tokensListRelationFilterSchema: z.ZodType<Prisma.Api_tokensListRelationFilter> = z.object({
  every: z.lazy(() => Api_tokensWhereInputSchema).optional(),
  some: z.lazy(() => Api_tokensWhereInputSchema).optional(),
  none: z.lazy(() => Api_tokensWhereInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionListRelationFilterSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionListRelationFilter> = z.object({
  every: z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).optional(),
  some: z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).optional(),
  none: z.lazy(() => Scheduled_reports_subscriptionWhereInputSchema).optional()
}).strict();

export const SessionsListRelationFilterSchema: z.ZodType<Prisma.SessionsListRelationFilter> = z.object({
  every: z.lazy(() => SessionsWhereInputSchema).optional(),
  some: z.lazy(() => SessionsWhereInputSchema).optional(),
  none: z.lazy(() => SessionsWhereInputSchema).optional()
}).strict();

export const PermissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PermissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Api_tokensOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Api_tokensOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  login: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.lazy(() => SortOrderSchema).optional(),
  card_number: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  car_model: z.lazy(() => SortOrderSchema).optional(),
  car_number: z.lazy(() => SortOrderSchema).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  fcm_token: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional(),
  doc_files: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.lazy(() => SortOrderSchema).optional(),
  app_version: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.lazy(() => SortOrderSchema).optional(),
  tg_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UsersAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  login: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.lazy(() => SortOrderSchema).optional(),
  card_number: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  car_model: z.lazy(() => SortOrderSchema).optional(),
  car_number: z.lazy(() => SortOrderSchema).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  fcm_token: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.lazy(() => SortOrderSchema).optional(),
  app_version: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.lazy(() => SortOrderSchema).optional(),
  tg_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  login: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.lazy(() => SortOrderSchema).optional(),
  card_number: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  car_model: z.lazy(() => SortOrderSchema).optional(),
  car_number: z.lazy(() => SortOrderSchema).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  fcm_token: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.lazy(() => SortOrderSchema).optional(),
  app_version: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.lazy(() => SortOrderSchema).optional(),
  tg_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersSumOrderByAggregateInputSchema: z.ZodType<Prisma.UsersSumOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumuser_statusWithAggregatesFilterSchema: z.ZodType<Prisma.Enumuser_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => user_statusSchema).optional(),
  in: z.lazy(() => user_statusSchema).array().optional(),
  notIn: z.lazy(() => user_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => NestedEnumuser_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumuser_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumuser_statusFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const UsersRelationFilterSchema: z.ZodType<Prisma.UsersRelationFilter> = z.object({
  is: z.lazy(() => UsersWhereInputSchema).optional(),
  isNot: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const SessionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_agent: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_agent: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user_agent: z.lazy(() => SortOrderSchema).optional(),
  device_name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Users_permissionsUser_idPermission_idCompoundUniqueInputSchema: z.ZodType<Prisma.Users_permissionsUser_idPermission_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  permission_id: z.string()
}).strict();

export const Users_permissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Users_permissionsCountOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Users_permissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Users_permissionsMaxOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Users_permissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Users_permissionsMinOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Users_rolesUser_idRole_idCompoundUniqueInputSchema: z.ZodType<Prisma.Users_rolesUser_idRole_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  role_id: z.string()
}).strict();

export const Users_rolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.Users_rolesCountOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Users_rolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Users_rolesMaxOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Users_rolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.Users_rolesMinOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Api_tokensCountOrderByAggregateInputSchema: z.ZodType<Prisma.Api_tokensCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Api_tokensMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Api_tokensMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Api_tokensMinOrderByAggregateInputSchema: z.ZodType<Prisma.Api_tokensMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Scheduled_reportsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Scheduled_reportsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  cron: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Scheduled_reportsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Scheduled_reportsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  cron: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Scheduled_reportsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Scheduled_reportsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  cron: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Scheduled_reportsRelationFilterSchema: z.ZodType<Prisma.Scheduled_reportsRelationFilter> = z.object({
  is: z.lazy(() => Scheduled_reportsWhereInputSchema).optional(),
  isNot: z.lazy(() => Scheduled_reportsWhereInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LangsCountOrderByAggregateInputSchema: z.ZodType<Prisma.LangsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  is_default: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LangsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LangsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  is_default: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LangsMinOrderByAggregateInputSchema: z.ZodType<Prisma.LangsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  is_default: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const CategoriesCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
  i18n_name: z.lazy(() => SortOrderSchema).optional(),
  i18n_description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriesMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutPermissions_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const Roles_permissionsCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UsersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]).optional(),
}).strict();

export const Roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutRoles_roles_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutRoles_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const Roles_permissionsCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutRoles_roles_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutRoles_roles_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutRoles_roles_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
}).strict();

export const Roles_permissionsUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const PermissionsCreateNestedOneWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsCreateNestedOneWithoutRoles_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionsCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionsWhereUniqueInputSchema).optional()
}).strict();

export const RolesCreateNestedOneWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesCreateNestedOneWithoutRoles_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]).optional(),
}).strict();

export const PermissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema: z.ZodType<Prisma.PermissionsUpdateOneRequiredWithoutRoles_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionsCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  upsert: z.lazy(() => PermissionsUpsertWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]).optional(),
}).strict();

export const RolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema: z.ZodType<Prisma.RolesUpdateOneRequiredWithoutRoles_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  upsert: z.lazy(() => RolesUpsertWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
}).strict();

export const UsersCreatedoc_filesInputSchema: z.ZodType<Prisma.UsersCreatedoc_filesInput> = z.object({
  set: z.string().array()
}).strict();

export const PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesCreateNestedManyWithoutUsers_roles_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionsCreateNestedManyWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsCreateNestedManyWithoutUsers_sessionsInput> = z.object({
  create: z.union([ z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema).array(),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionsCreateManyUsers_sessionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInput> = z.object({
  create: z.union([ z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema).array(),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionsCreateManyUsers_sessionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Enumuser_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumuser_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => user_statusSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UsersUpdatedoc_filesInputSchema: z.ZodType<Prisma.UsersUpdatedoc_filesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionsScalarWhereInputSchema),z.lazy(() => PermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionsScalarWhereInputSchema),z.lazy(() => PermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema: z.ZodType<Prisma.RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesScalarWhereInputSchema),z.lazy(() => RolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema: z.ZodType<Prisma.RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesScalarWhereInputSchema),z.lazy(() => RolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema: z.ZodType<Prisma.Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Api_tokensScalarWhereInputSchema),z.lazy(() => Api_tokensScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema: z.ZodType<Prisma.Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Api_tokensScalarWhereInputSchema),z.lazy(() => Api_tokensScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema: z.ZodType<Prisma.SessionsUpdateManyWithoutUsers_sessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema).array(),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionsUpsertWithWhereUniqueWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUpsertWithWhereUniqueWithoutUsers_sessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionsCreateManyUsers_sessionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionsUpdateWithWhereUniqueWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUpdateWithWhereUniqueWithoutUsers_sessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionsUpdateManyWithWhereWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUpdateManyWithWhereWithoutUsers_sessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionsScalarWhereInputSchema),z.lazy(() => SessionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionsScalarWhereInputSchema),z.lazy(() => PermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionsWhereUniqueInputSchema),z.lazy(() => PermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionsScalarWhereInputSchema),z.lazy(() => PermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesScalarWhereInputSchema),z.lazy(() => RolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesWhereUniqueInputSchema),z.lazy(() => RolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesScalarWhereInputSchema),z.lazy(() => RolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Roles_permissionsWhereUniqueInputSchema),z.lazy(() => Roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_permissionsWhereUniqueInputSchema),z.lazy(() => Users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Users_rolesWhereUniqueInputSchema),z.lazy(() => Users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Api_tokensScalarWhereInputSchema),z.lazy(() => Api_tokensScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema).array(),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Api_tokensCreateManyApi_tokens_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Api_tokensWhereUniqueInputSchema),z.lazy(() => Api_tokensWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUpdateManyWithWhereWithoutApi_tokens_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Api_tokensScalarWhereInputSchema),z.lazy(() => Api_tokensScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_usersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema: z.ZodType<Prisma.SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema).array(),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsCreateOrConnectWithoutUsers_sessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionsUpsertWithWhereUniqueWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUpsertWithWhereUniqueWithoutUsers_sessionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionsCreateManyUsers_sessionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionsWhereUniqueInputSchema),z.lazy(() => SessionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionsUpdateWithWhereUniqueWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUpdateWithWhereUniqueWithoutUsers_sessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionsUpdateManyWithWhereWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUpdateManyWithWhereWithoutUsers_sessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionsScalarWhereInputSchema),z.lazy(() => SessionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutSessionsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutSessionsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UsersUpdateWithoutSessionsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const PermissionsCreateNestedOneWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsCreateNestedOneWithoutUsers_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionsWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
}).strict();

export const PermissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema: z.ZodType<Prisma.PermissionsUpdateOneRequiredWithoutUsers_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionsCreateOrConnectWithoutUsers_permissionsInputSchema).optional(),
  upsert: z.lazy(() => PermissionsUpsertWithoutUsers_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
}).strict();

export const UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const RolesCreateNestedOneWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesCreateNestedOneWithoutUsers_rolesInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUsers_rolesInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
}).strict();

export const RolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema: z.ZodType<Prisma.RolesUpdateOneRequiredWithoutUsers_rolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RolesCreateOrConnectWithoutUsers_rolesInputSchema).optional(),
  upsert: z.lazy(() => RolesUpsertWithoutUsers_rolesInputSchema).optional(),
  connect: z.lazy(() => RolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema),z.lazy(() => RolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
}).strict();

export const UsersCreateNestedOneWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutApi_tokens_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutApi_tokens_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const UsersUpdateOneWithoutApi_tokens_created_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutApi_tokens_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutApi_tokens_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutApi_tokens_created_byTousersInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneWithoutApi_tokens_updated_byTousersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneWithoutApi_tokens_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUpdateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutApi_tokens_updated_byTousersInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_reportsInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_reportsInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_reportsNestedInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_reportsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_reportsNestedInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_reportsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema).array(),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_reportsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Scheduled_reportsCreateNestedOneWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsCreateNestedOneWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reportsCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUncheckedCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Scheduled_reportsCreateOrConnectWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema).optional(),
  connect: z.lazy(() => Scheduled_reportsWhereUniqueInputSchema).optional()
}).strict();

export const UsersCreateNestedOneWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutScheduled_reports_subscription_usersInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const Scheduled_reportsUpdateOneRequiredWithoutScheduled_reports_scheduled_reports_subscriptionsNestedInputSchema: z.ZodType<Prisma.Scheduled_reportsUpdateOneRequiredWithoutScheduled_reports_scheduled_reports_subscriptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Scheduled_reportsCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUncheckedCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Scheduled_reportsCreateOrConnectWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema).optional(),
  upsert: z.lazy(() => Scheduled_reportsUpsertWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema).optional(),
  connect: z.lazy(() => Scheduled_reportsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Scheduled_reportsUpdateToOneWithWhereWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUncheckedUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema) ]).optional(),
}).strict();

export const UsersUpdateOneRequiredWithoutScheduled_reports_subscription_usersNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutScheduled_reports_subscription_usersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUpdateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutScheduled_reports_subscription_usersInputSchema) ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedEnumuser_statusFilterSchema: z.ZodType<Prisma.NestedEnumuser_statusFilter> = z.object({
  equals: z.lazy(() => user_statusSchema).optional(),
  in: z.lazy(() => user_statusSchema).array().optional(),
  notIn: z.lazy(() => user_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => NestedEnumuser_statusFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumuser_statusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumuser_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => user_statusSchema).optional(),
  in: z.lazy(() => user_statusSchema).array().optional(),
  notIn: z.lazy(() => user_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => NestedEnumuser_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumuser_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumuser_statusFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const UsersCreateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutPermissions_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
}).strict();

export const UsersCreateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsCreateWithoutPermissionsInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  roles: z.lazy(() => RolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateWithoutPermissionsInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const Roles_permissionsCreateManyPermissionsInputEnvelopeSchema: z.ZodType<Prisma.Roles_permissionsCreateManyPermissionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Roles_permissionsCreateManyPermissionsInputSchema),z.lazy(() => Roles_permissionsCreateManyPermissionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_permissionsCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsCreateWithoutPermissionsInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const Users_permissionsUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateWithoutPermissionsInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const Users_permissionsCreateManyPermissionsInputEnvelopeSchema: z.ZodType<Prisma.Users_permissionsCreateManyPermissionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_permissionsCreateManyPermissionsInputSchema),z.lazy(() => Users_permissionsCreateManyPermissionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersUpsertWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutPermissions_permissions_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const Roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export const Roles_permissionsScalarWhereInputSchema: z.ZodType<Prisma.Roles_permissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Roles_permissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Roles_permissionsScalarWhereInputSchema),z.lazy(() => Roles_permissionsScalarWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const Users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const Users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => Users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateManyMutationInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export const Users_permissionsScalarWhereInputSchema: z.ZodType<Prisma.Users_permissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_permissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_permissionsScalarWhereInputSchema),z.lazy(() => Users_permissionsScalarWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UsersCreateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutRoles_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]),
}).strict();

export const UsersCreateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutRoles_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsCreateWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsCreateWithoutRolesInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateWithoutRolesInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const Roles_permissionsCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.Roles_permissionsCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Roles_permissionsCreateManyRolesInputSchema),z.lazy(() => Roles_permissionsCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_rolesCreateWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesCreateWithoutRolesInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const Users_rolesUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateWithoutRolesInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const Users_rolesCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.Users_rolesCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_rolesCreateManyRolesInputSchema),z.lazy(() => Users_rolesCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersUpsertWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutRoles_roles_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutRoles_roles_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const Roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutRolesInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => Roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const Users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const Users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateWithoutRolesInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const Users_rolesUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => Users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateManyMutationInputSchema),z.lazy(() => Users_rolesUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const Users_rolesScalarWhereInputSchema: z.ZodType<Prisma.Users_rolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Users_rolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Users_rolesScalarWhereInputSchema),z.lazy(() => Users_rolesScalarWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UsersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const PermissionsCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsUncheckedCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsUncheckedCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsCreateOrConnectWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsCreateOrConnectWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const RolesCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  users_roles: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesCreateOrConnectWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const UsersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const UsersUpsertWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const PermissionsUpsertWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsUpsertWithoutRoles_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => PermissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
  where: z.lazy(() => PermissionsWhereInputSchema).optional()
}).strict();

export const PermissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsUpdateToOneWithWhereWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => PermissionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const PermissionsUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsUncheckedUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const RolesUpsertWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesUpsertWithoutRoles_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => RolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
  where: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const RolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesUpdateToOneWithWhereWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => RolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const RolesUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users_roles: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const PermissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.PermissionsCreateManyUsers_permissions_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PermissionsCreateManyUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsCreateManyUsers_permissions_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const PermissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.PermissionsCreateManyUsers_permissions_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PermissionsCreateManyUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsCreateManyUsers_permissions_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolesCreateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesCreateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const RolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.RolesCreateManyUsers_roles_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolesCreateManyUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesCreateManyUsers_roles_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolesCreateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesCreateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const RolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.RolesCreateManyUsers_roles_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolesCreateManyUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesCreateManyUsers_roles_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => RolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => RolesCreateNestedOneWithoutRoles_permissionsInputSchema)
}).strict();

export const Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema: z.ZodType<Prisma.Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema: z.ZodType<Prisma.Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => PermissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional()
}).strict();

export const Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema: z.ZodType<Prisma.Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  roles: z.lazy(() => RolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const Users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema: z.ZodType<Prisma.Users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  roles: z.lazy(() => RolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_user_id: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema: z.ZodType<Prisma.Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  roles: z.lazy(() => RolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional()
}).strict();

export const Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const Users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema: z.ZodType<Prisma.Users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_tokens_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutApi_tokens_updated_byTousersInputSchema).optional()
}).strict();

export const Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateOrConnectWithoutApi_tokens_created_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema) ]),
}).strict();

export const Api_tokensCreateManyApi_tokens_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.Api_tokensCreateManyApi_tokens_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Api_tokensCreateManyApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensCreateManyApi_tokens_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_tokens_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutApi_tokens_created_byTousersInputSchema).optional()
}).strict();

export const Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable()
}).strict();

export const Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateOrConnectWithoutApi_tokens_updated_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema) ]),
}).strict();

export const Api_tokensCreateManyApi_tokens_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.Api_tokensCreateManyApi_tokens_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Api_tokensCreateManyApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensCreateManyApi_tokens_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  scheduled_reports_subscription_reports: z.lazy(() => Scheduled_reportsCreateNestedOneWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema)
}).strict();

export const Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.string().optional(),
  report_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_usersInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputEnvelopeSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionsCreateWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsCreateWithoutUsers_sessionsInput> = z.object({
  id: z.string().optional(),
  user_agent: z.string(),
  device_name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SessionsUncheckedCreateWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUncheckedCreateWithoutUsers_sessionsInput> = z.object({
  id: z.string().optional(),
  user_agent: z.string(),
  device_name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SessionsCreateOrConnectWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsCreateOrConnectWithoutUsers_sessionsInput> = z.object({
  where: z.lazy(() => SessionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema) ]),
}).strict();

export const SessionsCreateManyUsers_sessionsInputEnvelopeSchema: z.ZodType<Prisma.SessionsCreateManyUsers_sessionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionsCreateManyUsers_sessionsInputSchema),z.lazy(() => SessionsCreateManyUsers_sessionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const PermissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermissionsUpdateManyMutationInputSchema),z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const PermissionsScalarWhereInputSchema: z.ZodType<Prisma.PermissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionsScalarWhereInputSchema),z.lazy(() => PermissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionsScalarWhereInputSchema),z.lazy(() => PermissionsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const PermissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => PermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermissionsUpdateManyMutationInputSchema),z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const RolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolesUpdateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUsers_roles_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const RolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolesUpdateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const RolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => RolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolesUpdateManyMutationInputSchema),z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const RolesScalarWhereInputSchema: z.ZodType<Prisma.RolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolesScalarWhereInputSchema),z.lazy(() => RolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesScalarWhereInputSchema),z.lazy(() => RolesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolesUpdateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const RolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolesUpdateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const RolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => RolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolesUpdateManyMutationInputSchema),z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => Roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => Roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => Users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateManyMutationInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => Users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateManyMutationInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => Users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => Users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => Users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_permissionsUpdateManyMutationInputSchema),z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => Users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateManyMutationInputSchema),z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => Users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateManyMutationInputSchema),z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => Users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => Users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => Users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Users_rolesUpdateManyMutationInputSchema),z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_created_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Api_tokensUpdateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedUpdateWithoutApi_tokens_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema) ]),
}).strict();

export const Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_created_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Api_tokensUpdateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedUpdateWithoutApi_tokens_created_byTousersInputSchema) ]),
}).strict();

export const Api_tokensUpdateManyWithWhereWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpdateManyWithWhereWithoutApi_tokens_created_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Api_tokensUpdateManyMutationInputSchema),z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersInputSchema) ]),
}).strict();

export const Api_tokensScalarWhereInputSchema: z.ZodType<Prisma.Api_tokensScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Api_tokensScalarWhereInputSchema),z.lazy(() => Api_tokensScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Api_tokensScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Api_tokensScalarWhereInputSchema),z.lazy(() => Api_tokensScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpsertWithWhereUniqueWithoutApi_tokens_updated_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Api_tokensUpdateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedUpdateWithoutApi_tokens_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => Api_tokensCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema) ]),
}).strict();

export const Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpdateWithWhereUniqueWithoutApi_tokens_updated_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Api_tokensUpdateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => Api_tokensUncheckedUpdateWithoutApi_tokens_updated_byTousersInputSchema) ]),
}).strict();

export const Api_tokensUpdateManyWithWhereWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpdateManyWithWhereWithoutApi_tokens_updated_byTousersInput> = z.object({
  where: z.lazy(() => Api_tokensScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Api_tokensUpdateManyMutationInputSchema),z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_usersInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_usersInputSchema) ]),
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_usersInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_usersInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_usersInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateManyMutationInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionScalarWhereInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  report_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionsUpsertWithWhereUniqueWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUpsertWithWhereUniqueWithoutUsers_sessionsInput> = z.object({
  where: z.lazy(() => SessionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionsUpdateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedUpdateWithoutUsers_sessionsInputSchema) ]),
  create: z.union([ z.lazy(() => SessionsCreateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedCreateWithoutUsers_sessionsInputSchema) ]),
}).strict();

export const SessionsUpdateWithWhereUniqueWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUpdateWithWhereUniqueWithoutUsers_sessionsInput> = z.object({
  where: z.lazy(() => SessionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionsUpdateWithoutUsers_sessionsInputSchema),z.lazy(() => SessionsUncheckedUpdateWithoutUsers_sessionsInputSchema) ]),
}).strict();

export const SessionsUpdateManyWithWhereWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUpdateManyWithWhereWithoutUsers_sessionsInput> = z.object({
  where: z.lazy(() => SessionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionsUpdateManyMutationInputSchema),z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsInputSchema) ]),
}).strict();

export const SessionsScalarWhereInputSchema: z.ZodType<Prisma.SessionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionsScalarWhereInputSchema),z.lazy(() => SessionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionsScalarWhereInputSchema),z.lazy(() => SessionsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_agent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  device_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UsersCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UsersCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutSessionsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UsersUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UsersUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutSessionsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutSessionsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutSessionsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UsersUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UsersUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional()
}).strict();

export const UsersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const PermissionsCreateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsCreateWithoutUsers_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsUncheckedCreateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsUncheckedCreateWithoutUsers_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionsCreateOrConnectWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsCreateOrConnectWithoutUsers_permissionsInput> = z.object({
  where: z.lazy(() => PermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]),
}).strict();

export const UsersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const UsersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const UsersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const UsersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const PermissionsUpsertWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsUpsertWithoutUsers_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => PermissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]),
  where: z.lazy(() => PermissionsWhereInputSchema).optional()
}).strict();

export const PermissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsUpdateToOneWithWhereWithoutUsers_permissionsInput> = z.object({
  where: z.lazy(() => PermissionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => PermissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]),
}).strict();

export const PermissionsUpdateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsUpdateWithoutUsers_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsUncheckedUpdateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateWithoutUsers_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersUpsertWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const UsersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const UsersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersCreateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const RolesCreateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesCreateWithoutUsers_rolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesUncheckedCreateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesUncheckedCreateWithoutUsers_rolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RolesCreateOrConnectWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesCreateOrConnectWithoutUsers_rolesInput> = z.object({
  where: z.lazy(() => RolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_rolesInputSchema) ]),
}).strict();

export const UsersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersCreateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const UsersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersCreateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const UsersUpsertWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersUpsertWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const UsersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersUpdateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const RolesUpsertWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesUpsertWithoutUsers_rolesInput> = z.object({
  update: z.union([ z.lazy(() => RolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]),
  create: z.union([ z.lazy(() => RolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => RolesUncheckedCreateWithoutUsers_rolesInputSchema) ]),
  where: z.lazy(() => RolesWhereInputSchema).optional()
}).strict();

export const RolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesUpdateToOneWithWhereWithoutUsers_rolesInput> = z.object({
  where: z.lazy(() => RolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => RolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]),
}).strict();

export const RolesUpdateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesUpdateWithoutUsers_rolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutUsers_rolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const UsersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersUpsertWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const UsersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersUpdateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersCreateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutApi_tokens_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema) ]),
}).strict();

export const UsersCreateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateNestedManyWithoutScheduled_reports_subscription_usersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutApi_tokens_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema) ]),
}).strict();

export const UsersUpsertWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutApi_tokens_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutApi_tokens_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_created_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutApi_tokens_created_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutApi_tokens_created_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutApi_tokens_created_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUpsertWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutApi_tokens_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutApi_tokens_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutApi_tokens_updated_byTousersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutApi_tokens_updated_byTousersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutApi_tokens_updated_byTousersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutApi_tokens_updated_byTousersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  scheduled_reports_subscription_users: z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  scheduled_reports_subscription_users: z.lazy(() => UsersCreateNestedOneWithoutScheduled_reports_subscription_usersInputSchema)
}).strict();

export const Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateOrConnectWithoutScheduled_reports_subscription_reportsInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputEnvelopeSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpsertWithWhereUniqueWithoutScheduled_reports_subscription_reportsInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_reportsInputSchema) ]),
  create: z.union([ z.lazy(() => Scheduled_reports_subscriptionCreateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedCreateWithoutScheduled_reports_subscription_reportsInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateWithWhereUniqueWithoutScheduled_reports_subscription_reportsInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_reportsInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_reportsInputSchema) ]),
}).strict();

export const Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateManyWithWhereWithoutScheduled_reports_subscription_reportsInput> = z.object({
  where: z.lazy(() => Scheduled_reports_subscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Scheduled_reports_subscriptionUpdateManyMutationInputSchema),z.lazy(() => Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_reportsInputSchema) ]),
}).strict();

export const Scheduled_reportsCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  cron: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reportsUncheckedCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsUncheckedCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  cron: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reportsCreateOrConnectWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsCreateOrConnectWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  where: z.lazy(() => Scheduled_reportsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Scheduled_reportsCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUncheckedCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema) ]),
}).strict();

export const UsersCreateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersCreateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  sessions: z.lazy(() => SessionsCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.string().optional(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  login: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string(),
  salt: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_created_byTousersInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedCreateNestedManyWithoutApi_tokens_updated_byTousersInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedCreateNestedManyWithoutUsers_sessionsInputSchema).optional()
}).strict();

export const UsersCreateOrConnectWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutScheduled_reports_subscription_usersInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema) ]),
}).strict();

export const Scheduled_reportsUpsertWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsUpsertWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  update: z.union([ z.lazy(() => Scheduled_reportsUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUncheckedUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema) ]),
  create: z.union([ z.lazy(() => Scheduled_reportsCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUncheckedCreateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema) ]),
  where: z.lazy(() => Scheduled_reportsWhereInputSchema).optional()
}).strict();

export const Scheduled_reportsUpdateToOneWithWhereWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsUpdateToOneWithWhereWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  where: z.lazy(() => Scheduled_reportsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Scheduled_reportsUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema),z.lazy(() => Scheduled_reportsUncheckedUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema) ]),
}).strict();

export const Scheduled_reportsUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cron: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reportsUncheckedUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInputSchema: z.ZodType<Prisma.Scheduled_reportsUncheckedUpdateWithoutScheduled_reports_scheduled_reports_subscriptionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cron: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersUpsertWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersUpsertWithoutScheduled_reports_subscription_usersInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutScheduled_reports_subscription_usersInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUncheckedCreateWithoutScheduled_reports_subscription_usersInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutScheduled_reports_subscription_usersInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutScheduled_reports_subscription_usersInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutScheduled_reports_subscription_usersInputSchema) ]),
}).strict();

export const UsersUpdateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersUpdateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  login: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_super_user: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => Enumuser_statusFieldUpdateOperationsInputSchema) ]).optional(),
  card_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  card_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_model: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  car_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_online: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fcm_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  wallet_balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_active_order_count: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => UsersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional(),
  api_tokens_created_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersNestedInputSchema).optional(),
  api_tokens_updated_byTousers: z.lazy(() => Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionsUncheckedUpdateManyWithoutUsers_sessionsNestedInputSchema).optional()
}).strict();

export const Roles_permissionsCreateManyPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsCreateManyPermissionsInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateManyPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsCreateManyPermissionsInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithoutPermissionsInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateWithoutPermissionsInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutPermissionsInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithoutPermissionsInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const Users_permissionsUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateWithoutPermissionsInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutPermissionsInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsCreateManyRolesInputSchema: z.ZodType<Prisma.Roles_permissionsCreateManyRolesInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateManyRolesInputSchema: z.ZodType<Prisma.Users_rolesCreateManyRolesInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsUpdateWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithoutRolesInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateWithoutRolesInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutRolesInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUpdateWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithoutRolesInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const Users_rolesUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateWithoutRolesInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutRolesInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PermissionsCreateManyUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateManyUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable()
}).strict();

export const PermissionsCreateManyUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsCreateManyUsers_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable()
}).strict();

export const RolesCreateManyUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesCreateManyUsers_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable()
}).strict();

export const RolesCreateManyUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesCreateManyUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateManyUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsCreateManyUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesCreateManyUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesCreateManyUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const Users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesCreateManyUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Api_tokensCreateManyApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateManyApi_tokens_created_byTousersInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable()
}).strict();

export const Api_tokensCreateManyApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensCreateManyApi_tokens_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable()
}).strict();

export const Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_usersInput> = z.object({
  id: z.string().optional(),
  report_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SessionsCreateManyUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsCreateManyUsers_sessionsInput> = z.object({
  id: z.string().optional(),
  user_agent: z.string(),
  device_name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PermissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpdateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PermissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUpdateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.PermissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RolesUpdateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUpdateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RolesUpdateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUpdateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => Roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => Users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.RolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => UsersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional()
}).strict();

export const Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.Roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional()
}).strict();

export const Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.Users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => UsersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  roles: z.lazy(() => RolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => UsersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional()
}).strict();

export const Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.Users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Api_tokensUpdateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpdateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_tokens_updated_byTousers: z.lazy(() => UsersUpdateOneWithoutApi_tokens_updated_byTousersNestedInputSchema).optional()
}).strict();

export const Api_tokensUncheckedUpdateWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateManyWithoutApi_tokens_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Api_tokensUpdateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUpdateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_tokens_created_byTousers: z.lazy(() => UsersUpdateOneWithoutApi_tokens_created_byTousersNestedInputSchema).optional()
}).strict();

export const Api_tokensUncheckedUpdateWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersInputSchema: z.ZodType<Prisma.Api_tokensUncheckedUpdateManyWithoutApi_tokens_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scheduled_reports_subscription_reports: z.lazy(() => Scheduled_reportsUpdateOneRequiredWithoutScheduled_reports_scheduled_reports_subscriptionsNestedInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_usersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionsUpdateWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUpdateWithoutUsers_sessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_agent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionsUncheckedUpdateWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUncheckedUpdateWithoutUsers_sessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_agent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionsUncheckedUpdateManyWithoutUsers_sessionsInputSchema: z.ZodType<Prisma.SessionsUncheckedUpdateManyWithoutUsers_sessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_agent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  device_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateManyScheduled_reports_subscription_reportsInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateWithoutScheduled_reports_subscription_reportsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scheduled_reports_subscription_users: z.lazy(() => UsersUpdateOneRequiredWithoutScheduled_reports_subscription_usersNestedInputSchema).optional()
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateWithoutScheduled_reports_subscription_reportsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_reportsInputSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUncheckedUpdateManyWithoutScheduled_reports_subscription_reportsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PermissionsFindFirstArgsSchema: z.ZodType<Prisma.PermissionsFindFirstArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  where: PermissionsWhereInputSchema.optional(),
  orderBy: z.union([ PermissionsOrderByWithRelationInputSchema.array(),PermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionsScalarFieldEnumSchema,PermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PermissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionsFindFirstOrThrowArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  where: PermissionsWhereInputSchema.optional(),
  orderBy: z.union([ PermissionsOrderByWithRelationInputSchema.array(),PermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionsScalarFieldEnumSchema,PermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PermissionsFindManyArgsSchema: z.ZodType<Prisma.PermissionsFindManyArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  where: PermissionsWhereInputSchema.optional(),
  orderBy: z.union([ PermissionsOrderByWithRelationInputSchema.array(),PermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionsScalarFieldEnumSchema,PermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PermissionsAggregateArgsSchema: z.ZodType<Prisma.PermissionsAggregateArgs> = z.object({
  where: PermissionsWhereInputSchema.optional(),
  orderBy: z.union([ PermissionsOrderByWithRelationInputSchema.array(),PermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PermissionsGroupByArgsSchema: z.ZodType<Prisma.PermissionsGroupByArgs> = z.object({
  where: PermissionsWhereInputSchema.optional(),
  orderBy: z.union([ PermissionsOrderByWithAggregationInputSchema.array(),PermissionsOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionsScalarFieldEnumSchema.array(),
  having: PermissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PermissionsFindUniqueArgsSchema: z.ZodType<Prisma.PermissionsFindUniqueArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  where: PermissionsWhereUniqueInputSchema,
}).strict()

export const PermissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionsFindUniqueOrThrowArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  where: PermissionsWhereUniqueInputSchema,
}).strict()

export const RolesFindFirstArgsSchema: z.ZodType<Prisma.RolesFindFirstArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolesFindFirstOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RolesFindManyArgsSchema: z.ZodType<Prisma.RolesFindManyArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RolesAggregateArgsSchema: z.ZodType<Prisma.RolesAggregateArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithRelationInputSchema.array(),RolesOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RolesGroupByArgsSchema: z.ZodType<Prisma.RolesGroupByArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
  orderBy: z.union([ RolesOrderByWithAggregationInputSchema.array(),RolesOrderByWithAggregationInputSchema ]).optional(),
  by: RolesScalarFieldEnumSchema.array(),
  having: RolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RolesFindUniqueArgsSchema: z.ZodType<Prisma.RolesFindUniqueArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict()

export const RolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolesFindUniqueOrThrowArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict()

export const Roles_permissionsFindFirstArgsSchema: z.ZodType<Prisma.Roles_permissionsFindFirstArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  where: Roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Roles_permissionsOrderByWithRelationInputSchema.array(),Roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Roles_permissionsScalarFieldEnumSchema,Roles_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Roles_permissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Roles_permissionsFindFirstOrThrowArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  where: Roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Roles_permissionsOrderByWithRelationInputSchema.array(),Roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Roles_permissionsScalarFieldEnumSchema,Roles_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Roles_permissionsFindManyArgsSchema: z.ZodType<Prisma.Roles_permissionsFindManyArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  where: Roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Roles_permissionsOrderByWithRelationInputSchema.array(),Roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Roles_permissionsScalarFieldEnumSchema,Roles_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Roles_permissionsAggregateArgsSchema: z.ZodType<Prisma.Roles_permissionsAggregateArgs> = z.object({
  where: Roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Roles_permissionsOrderByWithRelationInputSchema.array(),Roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Roles_permissionsGroupByArgsSchema: z.ZodType<Prisma.Roles_permissionsGroupByArgs> = z.object({
  where: Roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Roles_permissionsOrderByWithAggregationInputSchema.array(),Roles_permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: Roles_permissionsScalarFieldEnumSchema.array(),
  having: Roles_permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Roles_permissionsFindUniqueArgsSchema: z.ZodType<Prisma.Roles_permissionsFindUniqueArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  where: Roles_permissionsWhereUniqueInputSchema,
}).strict()

export const Roles_permissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Roles_permissionsFindUniqueOrThrowArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  where: Roles_permissionsWhereUniqueInputSchema,
}).strict()

export const UsersFindFirstArgsSchema: z.ZodType<Prisma.UsersFindFirstArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersFindFirstOrThrowArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersFindManyArgsSchema: z.ZodType<Prisma.UsersFindManyArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersAggregateArgsSchema: z.ZodType<Prisma.UsersAggregateArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersGroupByArgsSchema: z.ZodType<Prisma.UsersGroupByArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithAggregationInputSchema.array(),UsersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(),
  having: UsersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersFindUniqueArgsSchema: z.ZodType<Prisma.UsersFindUniqueArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict()

export const UsersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersFindUniqueOrThrowArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict()

export const SessionsFindFirstArgsSchema: z.ZodType<Prisma.SessionsFindFirstArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  where: SessionsWhereInputSchema.optional(),
  orderBy: z.union([ SessionsOrderByWithRelationInputSchema.array(),SessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionsScalarFieldEnumSchema,SessionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionsFindFirstOrThrowArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  where: SessionsWhereInputSchema.optional(),
  orderBy: z.union([ SessionsOrderByWithRelationInputSchema.array(),SessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionsScalarFieldEnumSchema,SessionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionsFindManyArgsSchema: z.ZodType<Prisma.SessionsFindManyArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  where: SessionsWhereInputSchema.optional(),
  orderBy: z.union([ SessionsOrderByWithRelationInputSchema.array(),SessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionsScalarFieldEnumSchema,SessionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionsAggregateArgsSchema: z.ZodType<Prisma.SessionsAggregateArgs> = z.object({
  where: SessionsWhereInputSchema.optional(),
  orderBy: z.union([ SessionsOrderByWithRelationInputSchema.array(),SessionsOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionsGroupByArgsSchema: z.ZodType<Prisma.SessionsGroupByArgs> = z.object({
  where: SessionsWhereInputSchema.optional(),
  orderBy: z.union([ SessionsOrderByWithAggregationInputSchema.array(),SessionsOrderByWithAggregationInputSchema ]).optional(),
  by: SessionsScalarFieldEnumSchema.array(),
  having: SessionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionsFindUniqueArgsSchema: z.ZodType<Prisma.SessionsFindUniqueArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  where: SessionsWhereUniqueInputSchema,
}).strict()

export const SessionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionsFindUniqueOrThrowArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  where: SessionsWhereUniqueInputSchema,
}).strict()

export const Users_permissionsFindFirstArgsSchema: z.ZodType<Prisma.Users_permissionsFindFirstArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  where: Users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Users_permissionsOrderByWithRelationInputSchema.array(),Users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_permissionsScalarFieldEnumSchema,Users_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Users_permissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Users_permissionsFindFirstOrThrowArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  where: Users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Users_permissionsOrderByWithRelationInputSchema.array(),Users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_permissionsScalarFieldEnumSchema,Users_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Users_permissionsFindManyArgsSchema: z.ZodType<Prisma.Users_permissionsFindManyArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  where: Users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Users_permissionsOrderByWithRelationInputSchema.array(),Users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_permissionsScalarFieldEnumSchema,Users_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Users_permissionsAggregateArgsSchema: z.ZodType<Prisma.Users_permissionsAggregateArgs> = z.object({
  where: Users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Users_permissionsOrderByWithRelationInputSchema.array(),Users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Users_permissionsGroupByArgsSchema: z.ZodType<Prisma.Users_permissionsGroupByArgs> = z.object({
  where: Users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ Users_permissionsOrderByWithAggregationInputSchema.array(),Users_permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: Users_permissionsScalarFieldEnumSchema.array(),
  having: Users_permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Users_permissionsFindUniqueArgsSchema: z.ZodType<Prisma.Users_permissionsFindUniqueArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  where: Users_permissionsWhereUniqueInputSchema,
}).strict()

export const Users_permissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Users_permissionsFindUniqueOrThrowArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  where: Users_permissionsWhereUniqueInputSchema,
}).strict()

export const Users_rolesFindFirstArgsSchema: z.ZodType<Prisma.Users_rolesFindFirstArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  where: Users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ Users_rolesOrderByWithRelationInputSchema.array(),Users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_rolesScalarFieldEnumSchema,Users_rolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Users_rolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Users_rolesFindFirstOrThrowArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  where: Users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ Users_rolesOrderByWithRelationInputSchema.array(),Users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_rolesScalarFieldEnumSchema,Users_rolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Users_rolesFindManyArgsSchema: z.ZodType<Prisma.Users_rolesFindManyArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  where: Users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ Users_rolesOrderByWithRelationInputSchema.array(),Users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_rolesScalarFieldEnumSchema,Users_rolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Users_rolesAggregateArgsSchema: z.ZodType<Prisma.Users_rolesAggregateArgs> = z.object({
  where: Users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ Users_rolesOrderByWithRelationInputSchema.array(),Users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: Users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Users_rolesGroupByArgsSchema: z.ZodType<Prisma.Users_rolesGroupByArgs> = z.object({
  where: Users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ Users_rolesOrderByWithAggregationInputSchema.array(),Users_rolesOrderByWithAggregationInputSchema ]).optional(),
  by: Users_rolesScalarFieldEnumSchema.array(),
  having: Users_rolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Users_rolesFindUniqueArgsSchema: z.ZodType<Prisma.Users_rolesFindUniqueArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  where: Users_rolesWhereUniqueInputSchema,
}).strict()

export const Users_rolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Users_rolesFindUniqueOrThrowArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  where: Users_rolesWhereUniqueInputSchema,
}).strict()

export const Api_tokensFindFirstArgsSchema: z.ZodType<Prisma.Api_tokensFindFirstArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  where: Api_tokensWhereInputSchema.optional(),
  orderBy: z.union([ Api_tokensOrderByWithRelationInputSchema.array(),Api_tokensOrderByWithRelationInputSchema ]).optional(),
  cursor: Api_tokensWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Api_tokensScalarFieldEnumSchema,Api_tokensScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Api_tokensFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Api_tokensFindFirstOrThrowArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  where: Api_tokensWhereInputSchema.optional(),
  orderBy: z.union([ Api_tokensOrderByWithRelationInputSchema.array(),Api_tokensOrderByWithRelationInputSchema ]).optional(),
  cursor: Api_tokensWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Api_tokensScalarFieldEnumSchema,Api_tokensScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Api_tokensFindManyArgsSchema: z.ZodType<Prisma.Api_tokensFindManyArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  where: Api_tokensWhereInputSchema.optional(),
  orderBy: z.union([ Api_tokensOrderByWithRelationInputSchema.array(),Api_tokensOrderByWithRelationInputSchema ]).optional(),
  cursor: Api_tokensWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Api_tokensScalarFieldEnumSchema,Api_tokensScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Api_tokensAggregateArgsSchema: z.ZodType<Prisma.Api_tokensAggregateArgs> = z.object({
  where: Api_tokensWhereInputSchema.optional(),
  orderBy: z.union([ Api_tokensOrderByWithRelationInputSchema.array(),Api_tokensOrderByWithRelationInputSchema ]).optional(),
  cursor: Api_tokensWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Api_tokensGroupByArgsSchema: z.ZodType<Prisma.Api_tokensGroupByArgs> = z.object({
  where: Api_tokensWhereInputSchema.optional(),
  orderBy: z.union([ Api_tokensOrderByWithAggregationInputSchema.array(),Api_tokensOrderByWithAggregationInputSchema ]).optional(),
  by: Api_tokensScalarFieldEnumSchema.array(),
  having: Api_tokensScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Api_tokensFindUniqueArgsSchema: z.ZodType<Prisma.Api_tokensFindUniqueArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  where: Api_tokensWhereUniqueInputSchema,
}).strict()

export const Api_tokensFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Api_tokensFindUniqueOrThrowArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  where: Api_tokensWhereUniqueInputSchema,
}).strict()

export const Scheduled_reportsFindFirstArgsSchema: z.ZodType<Prisma.Scheduled_reportsFindFirstArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  where: Scheduled_reportsWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reportsOrderByWithRelationInputSchema.array(),Scheduled_reportsOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scheduled_reportsScalarFieldEnumSchema,Scheduled_reportsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Scheduled_reportsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Scheduled_reportsFindFirstOrThrowArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  where: Scheduled_reportsWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reportsOrderByWithRelationInputSchema.array(),Scheduled_reportsOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scheduled_reportsScalarFieldEnumSchema,Scheduled_reportsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Scheduled_reportsFindManyArgsSchema: z.ZodType<Prisma.Scheduled_reportsFindManyArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  where: Scheduled_reportsWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reportsOrderByWithRelationInputSchema.array(),Scheduled_reportsOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scheduled_reportsScalarFieldEnumSchema,Scheduled_reportsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Scheduled_reportsAggregateArgsSchema: z.ZodType<Prisma.Scheduled_reportsAggregateArgs> = z.object({
  where: Scheduled_reportsWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reportsOrderByWithRelationInputSchema.array(),Scheduled_reportsOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reportsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Scheduled_reportsGroupByArgsSchema: z.ZodType<Prisma.Scheduled_reportsGroupByArgs> = z.object({
  where: Scheduled_reportsWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reportsOrderByWithAggregationInputSchema.array(),Scheduled_reportsOrderByWithAggregationInputSchema ]).optional(),
  by: Scheduled_reportsScalarFieldEnumSchema.array(),
  having: Scheduled_reportsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Scheduled_reportsFindUniqueArgsSchema: z.ZodType<Prisma.Scheduled_reportsFindUniqueArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  where: Scheduled_reportsWhereUniqueInputSchema,
}).strict()

export const Scheduled_reportsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Scheduled_reportsFindUniqueOrThrowArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  where: Scheduled_reportsWhereUniqueInputSchema,
}).strict()

export const Scheduled_reports_subscriptionFindFirstArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionFindFirstArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  where: Scheduled_reports_subscriptionWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reports_subscriptionOrderByWithRelationInputSchema.array(),Scheduled_reports_subscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reports_subscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scheduled_reports_subscriptionScalarFieldEnumSchema,Scheduled_reports_subscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Scheduled_reports_subscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionFindFirstOrThrowArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  where: Scheduled_reports_subscriptionWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reports_subscriptionOrderByWithRelationInputSchema.array(),Scheduled_reports_subscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reports_subscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scheduled_reports_subscriptionScalarFieldEnumSchema,Scheduled_reports_subscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Scheduled_reports_subscriptionFindManyArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionFindManyArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  where: Scheduled_reports_subscriptionWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reports_subscriptionOrderByWithRelationInputSchema.array(),Scheduled_reports_subscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reports_subscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Scheduled_reports_subscriptionScalarFieldEnumSchema,Scheduled_reports_subscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Scheduled_reports_subscriptionAggregateArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionAggregateArgs> = z.object({
  where: Scheduled_reports_subscriptionWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reports_subscriptionOrderByWithRelationInputSchema.array(),Scheduled_reports_subscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: Scheduled_reports_subscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Scheduled_reports_subscriptionGroupByArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionGroupByArgs> = z.object({
  where: Scheduled_reports_subscriptionWhereInputSchema.optional(),
  orderBy: z.union([ Scheduled_reports_subscriptionOrderByWithAggregationInputSchema.array(),Scheduled_reports_subscriptionOrderByWithAggregationInputSchema ]).optional(),
  by: Scheduled_reports_subscriptionScalarFieldEnumSchema.array(),
  having: Scheduled_reports_subscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Scheduled_reports_subscriptionFindUniqueArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionFindUniqueArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  where: Scheduled_reports_subscriptionWhereUniqueInputSchema,
}).strict()

export const Scheduled_reports_subscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionFindUniqueOrThrowArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  where: Scheduled_reports_subscriptionWhereUniqueInputSchema,
}).strict()

export const LangsFindFirstArgsSchema: z.ZodType<Prisma.LangsFindFirstArgs> = z.object({
  select: LangsSelectSchema.optional(),
  where: LangsWhereInputSchema.optional(),
  orderBy: z.union([ LangsOrderByWithRelationInputSchema.array(),LangsOrderByWithRelationInputSchema ]).optional(),
  cursor: LangsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LangsScalarFieldEnumSchema,LangsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const LangsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LangsFindFirstOrThrowArgs> = z.object({
  select: LangsSelectSchema.optional(),
  where: LangsWhereInputSchema.optional(),
  orderBy: z.union([ LangsOrderByWithRelationInputSchema.array(),LangsOrderByWithRelationInputSchema ]).optional(),
  cursor: LangsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LangsScalarFieldEnumSchema,LangsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const LangsFindManyArgsSchema: z.ZodType<Prisma.LangsFindManyArgs> = z.object({
  select: LangsSelectSchema.optional(),
  where: LangsWhereInputSchema.optional(),
  orderBy: z.union([ LangsOrderByWithRelationInputSchema.array(),LangsOrderByWithRelationInputSchema ]).optional(),
  cursor: LangsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LangsScalarFieldEnumSchema,LangsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const LangsAggregateArgsSchema: z.ZodType<Prisma.LangsAggregateArgs> = z.object({
  where: LangsWhereInputSchema.optional(),
  orderBy: z.union([ LangsOrderByWithRelationInputSchema.array(),LangsOrderByWithRelationInputSchema ]).optional(),
  cursor: LangsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LangsGroupByArgsSchema: z.ZodType<Prisma.LangsGroupByArgs> = z.object({
  where: LangsWhereInputSchema.optional(),
  orderBy: z.union([ LangsOrderByWithAggregationInputSchema.array(),LangsOrderByWithAggregationInputSchema ]).optional(),
  by: LangsScalarFieldEnumSchema.array(),
  having: LangsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LangsFindUniqueArgsSchema: z.ZodType<Prisma.LangsFindUniqueArgs> = z.object({
  select: LangsSelectSchema.optional(),
  where: LangsWhereUniqueInputSchema,
}).strict()

export const LangsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LangsFindUniqueOrThrowArgs> = z.object({
  select: LangsSelectSchema.optional(),
  where: LangsWhereUniqueInputSchema,
}).strict()

export const CategoriesFindFirstArgsSchema: z.ZodType<Prisma.CategoriesFindFirstArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CategoriesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoriesFindFirstOrThrowArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CategoriesFindManyArgsSchema: z.ZodType<Prisma.CategoriesFindManyArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CategoriesAggregateArgsSchema: z.ZodType<Prisma.CategoriesAggregateArgs> = z.object({
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CategoriesGroupByArgsSchema: z.ZodType<Prisma.CategoriesGroupByArgs> = z.object({
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithAggregationInputSchema.array(),CategoriesOrderByWithAggregationInputSchema ]).optional(),
  by: CategoriesScalarFieldEnumSchema.array(),
  having: CategoriesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CategoriesFindUniqueArgsSchema: z.ZodType<Prisma.CategoriesFindUniqueArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
}).strict()

export const CategoriesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoriesFindUniqueOrThrowArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
}).strict()

export const PermissionsCreateArgsSchema: z.ZodType<Prisma.PermissionsCreateArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  data: z.union([ PermissionsCreateInputSchema,PermissionsUncheckedCreateInputSchema ]),
}).strict()

export const PermissionsUpsertArgsSchema: z.ZodType<Prisma.PermissionsUpsertArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  where: PermissionsWhereUniqueInputSchema,
  create: z.union([ PermissionsCreateInputSchema,PermissionsUncheckedCreateInputSchema ]),
  update: z.union([ PermissionsUpdateInputSchema,PermissionsUncheckedUpdateInputSchema ]),
}).strict()

export const PermissionsCreateManyArgsSchema: z.ZodType<Prisma.PermissionsCreateManyArgs> = z.object({
  data: z.union([ PermissionsCreateManyInputSchema,PermissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PermissionsDeleteArgsSchema: z.ZodType<Prisma.PermissionsDeleteArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  where: PermissionsWhereUniqueInputSchema,
}).strict()

export const PermissionsUpdateArgsSchema: z.ZodType<Prisma.PermissionsUpdateArgs> = z.object({
  select: PermissionsSelectSchema.optional(),
  include: PermissionsIncludeSchema.optional(),
  data: z.union([ PermissionsUpdateInputSchema,PermissionsUncheckedUpdateInputSchema ]),
  where: PermissionsWhereUniqueInputSchema,
}).strict()

export const PermissionsUpdateManyArgsSchema: z.ZodType<Prisma.PermissionsUpdateManyArgs> = z.object({
  data: z.union([ PermissionsUpdateManyMutationInputSchema,PermissionsUncheckedUpdateManyInputSchema ]),
  where: PermissionsWhereInputSchema.optional(),
}).strict()

export const PermissionsDeleteManyArgsSchema: z.ZodType<Prisma.PermissionsDeleteManyArgs> = z.object({
  where: PermissionsWhereInputSchema.optional(),
}).strict()

export const RolesCreateArgsSchema: z.ZodType<Prisma.RolesCreateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
}).strict()

export const RolesUpsertArgsSchema: z.ZodType<Prisma.RolesUpsertArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
  create: z.union([ RolesCreateInputSchema,RolesUncheckedCreateInputSchema ]),
  update: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
}).strict()

export const RolesCreateManyArgsSchema: z.ZodType<Prisma.RolesCreateManyArgs> = z.object({
  data: z.union([ RolesCreateManyInputSchema,RolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RolesDeleteArgsSchema: z.ZodType<Prisma.RolesDeleteArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  where: RolesWhereUniqueInputSchema,
}).strict()

export const RolesUpdateArgsSchema: z.ZodType<Prisma.RolesUpdateArgs> = z.object({
  select: RolesSelectSchema.optional(),
  include: RolesIncludeSchema.optional(),
  data: z.union([ RolesUpdateInputSchema,RolesUncheckedUpdateInputSchema ]),
  where: RolesWhereUniqueInputSchema,
}).strict()

export const RolesUpdateManyArgsSchema: z.ZodType<Prisma.RolesUpdateManyArgs> = z.object({
  data: z.union([ RolesUpdateManyMutationInputSchema,RolesUncheckedUpdateManyInputSchema ]),
  where: RolesWhereInputSchema.optional(),
}).strict()

export const RolesDeleteManyArgsSchema: z.ZodType<Prisma.RolesDeleteManyArgs> = z.object({
  where: RolesWhereInputSchema.optional(),
}).strict()

export const Roles_permissionsCreateArgsSchema: z.ZodType<Prisma.Roles_permissionsCreateArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  data: z.union([ Roles_permissionsCreateInputSchema,Roles_permissionsUncheckedCreateInputSchema ]),
}).strict()

export const Roles_permissionsUpsertArgsSchema: z.ZodType<Prisma.Roles_permissionsUpsertArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  where: Roles_permissionsWhereUniqueInputSchema,
  create: z.union([ Roles_permissionsCreateInputSchema,Roles_permissionsUncheckedCreateInputSchema ]),
  update: z.union([ Roles_permissionsUpdateInputSchema,Roles_permissionsUncheckedUpdateInputSchema ]),
}).strict()

export const Roles_permissionsCreateManyArgsSchema: z.ZodType<Prisma.Roles_permissionsCreateManyArgs> = z.object({
  data: z.union([ Roles_permissionsCreateManyInputSchema,Roles_permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Roles_permissionsDeleteArgsSchema: z.ZodType<Prisma.Roles_permissionsDeleteArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  where: Roles_permissionsWhereUniqueInputSchema,
}).strict()

export const Roles_permissionsUpdateArgsSchema: z.ZodType<Prisma.Roles_permissionsUpdateArgs> = z.object({
  select: Roles_permissionsSelectSchema.optional(),
  include: Roles_permissionsIncludeSchema.optional(),
  data: z.union([ Roles_permissionsUpdateInputSchema,Roles_permissionsUncheckedUpdateInputSchema ]),
  where: Roles_permissionsWhereUniqueInputSchema,
}).strict()

export const Roles_permissionsUpdateManyArgsSchema: z.ZodType<Prisma.Roles_permissionsUpdateManyArgs> = z.object({
  data: z.union([ Roles_permissionsUpdateManyMutationInputSchema,Roles_permissionsUncheckedUpdateManyInputSchema ]),
  where: Roles_permissionsWhereInputSchema.optional(),
}).strict()

export const Roles_permissionsDeleteManyArgsSchema: z.ZodType<Prisma.Roles_permissionsDeleteManyArgs> = z.object({
  where: Roles_permissionsWhereInputSchema.optional(),
}).strict()

export const UsersCreateArgsSchema: z.ZodType<Prisma.UsersCreateArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  data: z.union([ UsersCreateInputSchema,UsersUncheckedCreateInputSchema ]),
}).strict()

export const UsersUpsertArgsSchema: z.ZodType<Prisma.UsersUpsertArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
  create: z.union([ UsersCreateInputSchema,UsersUncheckedCreateInputSchema ]),
  update: z.union([ UsersUpdateInputSchema,UsersUncheckedUpdateInputSchema ]),
}).strict()

export const UsersCreateManyArgsSchema: z.ZodType<Prisma.UsersCreateManyArgs> = z.object({
  data: z.union([ UsersCreateManyInputSchema,UsersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UsersDeleteArgsSchema: z.ZodType<Prisma.UsersDeleteArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict()

export const UsersUpdateArgsSchema: z.ZodType<Prisma.UsersUpdateArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  data: z.union([ UsersUpdateInputSchema,UsersUncheckedUpdateInputSchema ]),
  where: UsersWhereUniqueInputSchema,
}).strict()

export const UsersUpdateManyArgsSchema: z.ZodType<Prisma.UsersUpdateManyArgs> = z.object({
  data: z.union([ UsersUpdateManyMutationInputSchema,UsersUncheckedUpdateManyInputSchema ]),
  where: UsersWhereInputSchema.optional(),
}).strict()

export const UsersDeleteManyArgsSchema: z.ZodType<Prisma.UsersDeleteManyArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
}).strict()

export const SessionsCreateArgsSchema: z.ZodType<Prisma.SessionsCreateArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  data: z.union([ SessionsCreateInputSchema,SessionsUncheckedCreateInputSchema ]),
}).strict()

export const SessionsUpsertArgsSchema: z.ZodType<Prisma.SessionsUpsertArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  where: SessionsWhereUniqueInputSchema,
  create: z.union([ SessionsCreateInputSchema,SessionsUncheckedCreateInputSchema ]),
  update: z.union([ SessionsUpdateInputSchema,SessionsUncheckedUpdateInputSchema ]),
}).strict()

export const SessionsCreateManyArgsSchema: z.ZodType<Prisma.SessionsCreateManyArgs> = z.object({
  data: z.union([ SessionsCreateManyInputSchema,SessionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionsDeleteArgsSchema: z.ZodType<Prisma.SessionsDeleteArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  where: SessionsWhereUniqueInputSchema,
}).strict()

export const SessionsUpdateArgsSchema: z.ZodType<Prisma.SessionsUpdateArgs> = z.object({
  select: SessionsSelectSchema.optional(),
  include: SessionsIncludeSchema.optional(),
  data: z.union([ SessionsUpdateInputSchema,SessionsUncheckedUpdateInputSchema ]),
  where: SessionsWhereUniqueInputSchema,
}).strict()

export const SessionsUpdateManyArgsSchema: z.ZodType<Prisma.SessionsUpdateManyArgs> = z.object({
  data: z.union([ SessionsUpdateManyMutationInputSchema,SessionsUncheckedUpdateManyInputSchema ]),
  where: SessionsWhereInputSchema.optional(),
}).strict()

export const SessionsDeleteManyArgsSchema: z.ZodType<Prisma.SessionsDeleteManyArgs> = z.object({
  where: SessionsWhereInputSchema.optional(),
}).strict()

export const Users_permissionsCreateArgsSchema: z.ZodType<Prisma.Users_permissionsCreateArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  data: z.union([ Users_permissionsCreateInputSchema,Users_permissionsUncheckedCreateInputSchema ]),
}).strict()

export const Users_permissionsUpsertArgsSchema: z.ZodType<Prisma.Users_permissionsUpsertArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  where: Users_permissionsWhereUniqueInputSchema,
  create: z.union([ Users_permissionsCreateInputSchema,Users_permissionsUncheckedCreateInputSchema ]),
  update: z.union([ Users_permissionsUpdateInputSchema,Users_permissionsUncheckedUpdateInputSchema ]),
}).strict()

export const Users_permissionsCreateManyArgsSchema: z.ZodType<Prisma.Users_permissionsCreateManyArgs> = z.object({
  data: z.union([ Users_permissionsCreateManyInputSchema,Users_permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Users_permissionsDeleteArgsSchema: z.ZodType<Prisma.Users_permissionsDeleteArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  where: Users_permissionsWhereUniqueInputSchema,
}).strict()

export const Users_permissionsUpdateArgsSchema: z.ZodType<Prisma.Users_permissionsUpdateArgs> = z.object({
  select: Users_permissionsSelectSchema.optional(),
  include: Users_permissionsIncludeSchema.optional(),
  data: z.union([ Users_permissionsUpdateInputSchema,Users_permissionsUncheckedUpdateInputSchema ]),
  where: Users_permissionsWhereUniqueInputSchema,
}).strict()

export const Users_permissionsUpdateManyArgsSchema: z.ZodType<Prisma.Users_permissionsUpdateManyArgs> = z.object({
  data: z.union([ Users_permissionsUpdateManyMutationInputSchema,Users_permissionsUncheckedUpdateManyInputSchema ]),
  where: Users_permissionsWhereInputSchema.optional(),
}).strict()

export const Users_permissionsDeleteManyArgsSchema: z.ZodType<Prisma.Users_permissionsDeleteManyArgs> = z.object({
  where: Users_permissionsWhereInputSchema.optional(),
}).strict()

export const Users_rolesCreateArgsSchema: z.ZodType<Prisma.Users_rolesCreateArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  data: z.union([ Users_rolesCreateInputSchema,Users_rolesUncheckedCreateInputSchema ]),
}).strict()

export const Users_rolesUpsertArgsSchema: z.ZodType<Prisma.Users_rolesUpsertArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  where: Users_rolesWhereUniqueInputSchema,
  create: z.union([ Users_rolesCreateInputSchema,Users_rolesUncheckedCreateInputSchema ]),
  update: z.union([ Users_rolesUpdateInputSchema,Users_rolesUncheckedUpdateInputSchema ]),
}).strict()

export const Users_rolesCreateManyArgsSchema: z.ZodType<Prisma.Users_rolesCreateManyArgs> = z.object({
  data: z.union([ Users_rolesCreateManyInputSchema,Users_rolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Users_rolesDeleteArgsSchema: z.ZodType<Prisma.Users_rolesDeleteArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  where: Users_rolesWhereUniqueInputSchema,
}).strict()

export const Users_rolesUpdateArgsSchema: z.ZodType<Prisma.Users_rolesUpdateArgs> = z.object({
  select: Users_rolesSelectSchema.optional(),
  include: Users_rolesIncludeSchema.optional(),
  data: z.union([ Users_rolesUpdateInputSchema,Users_rolesUncheckedUpdateInputSchema ]),
  where: Users_rolesWhereUniqueInputSchema,
}).strict()

export const Users_rolesUpdateManyArgsSchema: z.ZodType<Prisma.Users_rolesUpdateManyArgs> = z.object({
  data: z.union([ Users_rolesUpdateManyMutationInputSchema,Users_rolesUncheckedUpdateManyInputSchema ]),
  where: Users_rolesWhereInputSchema.optional(),
}).strict()

export const Users_rolesDeleteManyArgsSchema: z.ZodType<Prisma.Users_rolesDeleteManyArgs> = z.object({
  where: Users_rolesWhereInputSchema.optional(),
}).strict()

export const Api_tokensCreateArgsSchema: z.ZodType<Prisma.Api_tokensCreateArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  data: z.union([ Api_tokensCreateInputSchema,Api_tokensUncheckedCreateInputSchema ]),
}).strict()

export const Api_tokensUpsertArgsSchema: z.ZodType<Prisma.Api_tokensUpsertArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  where: Api_tokensWhereUniqueInputSchema,
  create: z.union([ Api_tokensCreateInputSchema,Api_tokensUncheckedCreateInputSchema ]),
  update: z.union([ Api_tokensUpdateInputSchema,Api_tokensUncheckedUpdateInputSchema ]),
}).strict()

export const Api_tokensCreateManyArgsSchema: z.ZodType<Prisma.Api_tokensCreateManyArgs> = z.object({
  data: z.union([ Api_tokensCreateManyInputSchema,Api_tokensCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Api_tokensDeleteArgsSchema: z.ZodType<Prisma.Api_tokensDeleteArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  where: Api_tokensWhereUniqueInputSchema,
}).strict()

export const Api_tokensUpdateArgsSchema: z.ZodType<Prisma.Api_tokensUpdateArgs> = z.object({
  select: Api_tokensSelectSchema.optional(),
  include: Api_tokensIncludeSchema.optional(),
  data: z.union([ Api_tokensUpdateInputSchema,Api_tokensUncheckedUpdateInputSchema ]),
  where: Api_tokensWhereUniqueInputSchema,
}).strict()

export const Api_tokensUpdateManyArgsSchema: z.ZodType<Prisma.Api_tokensUpdateManyArgs> = z.object({
  data: z.union([ Api_tokensUpdateManyMutationInputSchema,Api_tokensUncheckedUpdateManyInputSchema ]),
  where: Api_tokensWhereInputSchema.optional(),
}).strict()

export const Api_tokensDeleteManyArgsSchema: z.ZodType<Prisma.Api_tokensDeleteManyArgs> = z.object({
  where: Api_tokensWhereInputSchema.optional(),
}).strict()

export const Scheduled_reportsCreateArgsSchema: z.ZodType<Prisma.Scheduled_reportsCreateArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  data: z.union([ Scheduled_reportsCreateInputSchema,Scheduled_reportsUncheckedCreateInputSchema ]),
}).strict()

export const Scheduled_reportsUpsertArgsSchema: z.ZodType<Prisma.Scheduled_reportsUpsertArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  where: Scheduled_reportsWhereUniqueInputSchema,
  create: z.union([ Scheduled_reportsCreateInputSchema,Scheduled_reportsUncheckedCreateInputSchema ]),
  update: z.union([ Scheduled_reportsUpdateInputSchema,Scheduled_reportsUncheckedUpdateInputSchema ]),
}).strict()

export const Scheduled_reportsCreateManyArgsSchema: z.ZodType<Prisma.Scheduled_reportsCreateManyArgs> = z.object({
  data: z.union([ Scheduled_reportsCreateManyInputSchema,Scheduled_reportsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Scheduled_reportsDeleteArgsSchema: z.ZodType<Prisma.Scheduled_reportsDeleteArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  where: Scheduled_reportsWhereUniqueInputSchema,
}).strict()

export const Scheduled_reportsUpdateArgsSchema: z.ZodType<Prisma.Scheduled_reportsUpdateArgs> = z.object({
  select: Scheduled_reportsSelectSchema.optional(),
  include: Scheduled_reportsIncludeSchema.optional(),
  data: z.union([ Scheduled_reportsUpdateInputSchema,Scheduled_reportsUncheckedUpdateInputSchema ]),
  where: Scheduled_reportsWhereUniqueInputSchema,
}).strict()

export const Scheduled_reportsUpdateManyArgsSchema: z.ZodType<Prisma.Scheduled_reportsUpdateManyArgs> = z.object({
  data: z.union([ Scheduled_reportsUpdateManyMutationInputSchema,Scheduled_reportsUncheckedUpdateManyInputSchema ]),
  where: Scheduled_reportsWhereInputSchema.optional(),
}).strict()

export const Scheduled_reportsDeleteManyArgsSchema: z.ZodType<Prisma.Scheduled_reportsDeleteManyArgs> = z.object({
  where: Scheduled_reportsWhereInputSchema.optional(),
}).strict()

export const Scheduled_reports_subscriptionCreateArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  data: z.union([ Scheduled_reports_subscriptionCreateInputSchema,Scheduled_reports_subscriptionUncheckedCreateInputSchema ]),
}).strict()

export const Scheduled_reports_subscriptionUpsertArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpsertArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  where: Scheduled_reports_subscriptionWhereUniqueInputSchema,
  create: z.union([ Scheduled_reports_subscriptionCreateInputSchema,Scheduled_reports_subscriptionUncheckedCreateInputSchema ]),
  update: z.union([ Scheduled_reports_subscriptionUpdateInputSchema,Scheduled_reports_subscriptionUncheckedUpdateInputSchema ]),
}).strict()

export const Scheduled_reports_subscriptionCreateManyArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionCreateManyArgs> = z.object({
  data: z.union([ Scheduled_reports_subscriptionCreateManyInputSchema,Scheduled_reports_subscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Scheduled_reports_subscriptionDeleteArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionDeleteArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  where: Scheduled_reports_subscriptionWhereUniqueInputSchema,
}).strict()

export const Scheduled_reports_subscriptionUpdateArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateArgs> = z.object({
  select: Scheduled_reports_subscriptionSelectSchema.optional(),
  include: Scheduled_reports_subscriptionIncludeSchema.optional(),
  data: z.union([ Scheduled_reports_subscriptionUpdateInputSchema,Scheduled_reports_subscriptionUncheckedUpdateInputSchema ]),
  where: Scheduled_reports_subscriptionWhereUniqueInputSchema,
}).strict()

export const Scheduled_reports_subscriptionUpdateManyArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionUpdateManyArgs> = z.object({
  data: z.union([ Scheduled_reports_subscriptionUpdateManyMutationInputSchema,Scheduled_reports_subscriptionUncheckedUpdateManyInputSchema ]),
  where: Scheduled_reports_subscriptionWhereInputSchema.optional(),
}).strict()

export const Scheduled_reports_subscriptionDeleteManyArgsSchema: z.ZodType<Prisma.Scheduled_reports_subscriptionDeleteManyArgs> = z.object({
  where: Scheduled_reports_subscriptionWhereInputSchema.optional(),
}).strict()

export const LangsCreateArgsSchema: z.ZodType<Prisma.LangsCreateArgs> = z.object({
  select: LangsSelectSchema.optional(),
  data: z.union([ LangsCreateInputSchema,LangsUncheckedCreateInputSchema ]),
}).strict()

export const LangsUpsertArgsSchema: z.ZodType<Prisma.LangsUpsertArgs> = z.object({
  select: LangsSelectSchema.optional(),
  where: LangsWhereUniqueInputSchema,
  create: z.union([ LangsCreateInputSchema,LangsUncheckedCreateInputSchema ]),
  update: z.union([ LangsUpdateInputSchema,LangsUncheckedUpdateInputSchema ]),
}).strict()

export const LangsCreateManyArgsSchema: z.ZodType<Prisma.LangsCreateManyArgs> = z.object({
  data: z.union([ LangsCreateManyInputSchema,LangsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const LangsDeleteArgsSchema: z.ZodType<Prisma.LangsDeleteArgs> = z.object({
  select: LangsSelectSchema.optional(),
  where: LangsWhereUniqueInputSchema,
}).strict()

export const LangsUpdateArgsSchema: z.ZodType<Prisma.LangsUpdateArgs> = z.object({
  select: LangsSelectSchema.optional(),
  data: z.union([ LangsUpdateInputSchema,LangsUncheckedUpdateInputSchema ]),
  where: LangsWhereUniqueInputSchema,
}).strict()

export const LangsUpdateManyArgsSchema: z.ZodType<Prisma.LangsUpdateManyArgs> = z.object({
  data: z.union([ LangsUpdateManyMutationInputSchema,LangsUncheckedUpdateManyInputSchema ]),
  where: LangsWhereInputSchema.optional(),
}).strict()

export const LangsDeleteManyArgsSchema: z.ZodType<Prisma.LangsDeleteManyArgs> = z.object({
  where: LangsWhereInputSchema.optional(),
}).strict()

export const CategoriesCreateArgsSchema: z.ZodType<Prisma.CategoriesCreateArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  data: z.union([ CategoriesCreateInputSchema,CategoriesUncheckedCreateInputSchema ]),
}).strict()

export const CategoriesUpsertArgsSchema: z.ZodType<Prisma.CategoriesUpsertArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
  create: z.union([ CategoriesCreateInputSchema,CategoriesUncheckedCreateInputSchema ]),
  update: z.union([ CategoriesUpdateInputSchema,CategoriesUncheckedUpdateInputSchema ]),
}).strict()

export const CategoriesCreateManyArgsSchema: z.ZodType<Prisma.CategoriesCreateManyArgs> = z.object({
  data: z.union([ CategoriesCreateManyInputSchema,CategoriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CategoriesDeleteArgsSchema: z.ZodType<Prisma.CategoriesDeleteArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
}).strict()

export const CategoriesUpdateArgsSchema: z.ZodType<Prisma.CategoriesUpdateArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  data: z.union([ CategoriesUpdateInputSchema,CategoriesUncheckedUpdateInputSchema ]),
  where: CategoriesWhereUniqueInputSchema,
}).strict()

export const CategoriesUpdateManyArgsSchema: z.ZodType<Prisma.CategoriesUpdateManyArgs> = z.object({
  data: z.union([ CategoriesUpdateManyMutationInputSchema,CategoriesUncheckedUpdateManyInputSchema ]),
  where: CategoriesWhereInputSchema.optional(),
}).strict()

export const CategoriesDeleteManyArgsSchema: z.ZodType<Prisma.CategoriesDeleteManyArgs> = z.object({
  where: CategoriesWhereInputSchema.optional(),
}).strict()