import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PermissionsScalarFieldEnumSchema = z.enum(['id','slug','description','active','created_at','updated_at','created_by','updated_by']);

export const RolesScalarFieldEnumSchema = z.enum(['id','name','code','active','created_at','updated_at','created_by','updated_by']);

export const Roles_permissionsScalarFieldEnumSchema = z.enum(['role_id','permission_id','created_by','updated_by']);

export const UsersScalarFieldEnumSchema = z.enum(['id','phone','first_name','last_name','password','is_super_user','status','card_name','card_number','birth_date','car_model','car_number','is_online','latitude','longitude','fcm_token','wallet_balance','max_active_order_count','doc_files','order_start_date','app_version','created_at','updated_at','api_token','tg_id']);

export const Users_permissionsScalarFieldEnumSchema = z.enum(['user_id','permission_id','created_by','updated_by']);

export const Users_rolesScalarFieldEnumSchema = z.enum(['user_id','role_id','created_by','updated_by']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const user_statusSchema = z.enum(['active','blocked','inactive']);

export type user_statusType = `${z.infer<typeof user_statusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PERMISSIONS SCHEMA
/////////////////////////////////////////

export const permissionsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type permissions = z.infer<typeof permissionsSchema>

/////////////////////////////////////////
// ROLES SCHEMA
/////////////////////////////////////////

export const rolesSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string().nullish(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type roles = z.infer<typeof rolesSchema>

/////////////////////////////////////////
// ROLES PERMISSIONS SCHEMA
/////////////////////////////////////////

export const roles_permissionsSchema = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type roles_permissions = z.infer<typeof roles_permissionsSchema>

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const usersSchema = z.object({
  status: user_statusSchema,
  id: z.string(),
  phone: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  password: z.string().nullish(),
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

export type users = z.infer<typeof usersSchema>

/////////////////////////////////////////
// USERS PERMISSIONS SCHEMA
/////////////////////////////////////////

export const users_permissionsSchema = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type users_permissions = z.infer<typeof users_permissionsSchema>

/////////////////////////////////////////
// USERS ROLES SCHEMA
/////////////////////////////////////////

export const users_rolesSchema = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type users_roles = z.infer<typeof users_rolesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PERMISSIONS
//------------------------------------------------------

export const permissionsIncludeSchema: z.ZodType<Prisma.permissionsInclude> = z.object({
  users_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const permissionsArgsSchema: z.ZodType<Prisma.permissionsDefaultArgs> = z.object({
  select: z.lazy(() => permissionsSelectSchema).optional(),
  include: z.lazy(() => permissionsIncludeSchema).optional(),
}).strict();

export const permissionsCountOutputTypeArgsSchema: z.ZodType<Prisma.permissionsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => permissionsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const permissionsCountOutputTypeSelectSchema: z.ZodType<Prisma.permissionsCountOutputTypeSelect> = z.object({
  roles_permissions: z.boolean().optional(),
  users_permissions: z.boolean().optional(),
}).strict();

export const permissionsSelectSchema: z.ZodType<Prisma.permissionsSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  active: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLES
//------------------------------------------------------

export const rolesIncludeSchema: z.ZodType<Prisma.rolesInclude> = z.object({
  users_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_roles: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const rolesArgsSchema: z.ZodType<Prisma.rolesDefaultArgs> = z.object({
  select: z.lazy(() => rolesSelectSchema).optional(),
  include: z.lazy(() => rolesIncludeSchema).optional(),
}).strict();

export const rolesCountOutputTypeArgsSchema: z.ZodType<Prisma.rolesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => rolesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const rolesCountOutputTypeSelectSchema: z.ZodType<Prisma.rolesCountOutputTypeSelect> = z.object({
  roles_permissions: z.boolean().optional(),
  users_roles: z.boolean().optional(),
}).strict();

export const rolesSelectSchema: z.ZodType<Prisma.rolesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  code: z.boolean().optional(),
  active: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_roles: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLES PERMISSIONS
//------------------------------------------------------

export const roles_permissionsIncludeSchema: z.ZodType<Prisma.roles_permissionsInclude> = z.object({
  users_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  users_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export const roles_permissionsArgsSchema: z.ZodType<Prisma.roles_permissionsDefaultArgs> = z.object({
  select: z.lazy(() => roles_permissionsSelectSchema).optional(),
  include: z.lazy(() => roles_permissionsIncludeSchema).optional(),
}).strict();

export const roles_permissionsSelectSchema: z.ZodType<Prisma.roles_permissionsSelect> = z.object({
  role_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  users_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

// USERS
//------------------------------------------------------

export const usersIncludeSchema: z.ZodType<Prisma.usersInclude> = z.object({
  permissions_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => permissionsFindManyArgsSchema)]).optional(),
  permissions_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => permissionsFindManyArgsSchema)]).optional(),
  roles_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => rolesFindManyArgsSchema)]).optional(),
  roles_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => rolesFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const usersArgsSchema: z.ZodType<Prisma.usersDefaultArgs> = z.object({
  select: z.lazy(() => usersSelectSchema).optional(),
  include: z.lazy(() => usersIncludeSchema).optional(),
}).strict();

export const usersCountOutputTypeArgsSchema: z.ZodType<Prisma.usersCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => usersCountOutputTypeSelectSchema).nullish(),
}).strict();

export const usersCountOutputTypeSelectSchema: z.ZodType<Prisma.usersCountOutputTypeSelect> = z.object({
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
}).strict();

export const usersSelectSchema: z.ZodType<Prisma.usersSelect> = z.object({
  id: z.boolean().optional(),
  phone: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  password: z.boolean().optional(),
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
  permissions_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => permissionsFindManyArgsSchema)]).optional(),
  permissions_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => permissionsFindManyArgsSchema)]).optional(),
  roles_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => rolesFindManyArgsSchema)]).optional(),
  roles_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => rolesFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USERS PERMISSIONS
//------------------------------------------------------

export const users_permissionsIncludeSchema: z.ZodType<Prisma.users_permissionsInclude> = z.object({
  users_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  users_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export const users_permissionsArgsSchema: z.ZodType<Prisma.users_permissionsDefaultArgs> = z.object({
  select: z.lazy(() => users_permissionsSelectSchema).optional(),
  include: z.lazy(() => users_permissionsIncludeSchema).optional(),
}).strict();

export const users_permissionsSelectSchema: z.ZodType<Prisma.users_permissionsSelect> = z.object({
  user_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  users_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

// USERS ROLES
//------------------------------------------------------

export const users_rolesIncludeSchema: z.ZodType<Prisma.users_rolesInclude> = z.object({
  users_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  users_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export const users_rolesArgsSchema: z.ZodType<Prisma.users_rolesDefaultArgs> = z.object({
  select: z.lazy(() => users_rolesSelectSchema).optional(),
  include: z.lazy(() => users_rolesIncludeSchema).optional(),
}).strict();

export const users_rolesSelectSchema: z.ZodType<Prisma.users_rolesSelect> = z.object({
  user_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  users_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const permissionsWhereInputSchema: z.ZodType<Prisma.permissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsListRelationFilterSchema).optional()
}).strict();

export const permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.permissionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const permissionsWhereUniqueInputSchema: z.ZodType<Prisma.permissionsWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsListRelationFilterSchema).optional()
}).strict());

export const permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.permissionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const rolesWhereInputSchema: z.ZodType<Prisma.rolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_roles_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_roles: z.lazy(() => Users_rolesListRelationFilterSchema).optional()
}).strict();

export const rolesOrderByWithRelationInputSchema: z.ZodType<Prisma.rolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const rolesWhereUniqueInputSchema: z.ZodType<Prisma.rolesWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_roles_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_roles: z.lazy(() => Users_rolesListRelationFilterSchema).optional()
}).strict());

export const rolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.rolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => rolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => rolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => rolesMinOrderByAggregateInputSchema).optional()
}).strict();

export const rolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.rolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const roles_permissionsWhereInputSchema: z.ZodType<Prisma.roles_permissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => roles_permissionsWhereInputSchema),z.lazy(() => roles_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => roles_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => roles_permissionsWhereInputSchema),z.lazy(() => roles_permissionsWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => permissionsWhereInputSchema) ]).optional(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  users_roles_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.roles_permissionsOrderByWithRelationInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_roles_permissions_created_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  permissions: z.lazy(() => permissionsOrderByWithRelationInputSchema).optional(),
  roles: z.lazy(() => rolesOrderByWithRelationInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional()
}).strict();

export const roles_permissionsWhereUniqueInputSchema: z.ZodType<Prisma.roles_permissionsWhereUniqueInput> = z.object({
  role_id_permission_id: z.lazy(() => roles_permissionsRole_idPermission_idCompoundUniqueInputSchema)
})
.and(z.object({
  role_id_permission_id: z.lazy(() => roles_permissionsRole_idPermission_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => roles_permissionsWhereInputSchema),z.lazy(() => roles_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => roles_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => roles_permissionsWhereInputSchema),z.lazy(() => roles_permissionsWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => permissionsWhereInputSchema) ]).optional(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  users_roles_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
}).strict());

export const roles_permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.roles_permissionsOrderByWithAggregationInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => roles_permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => roles_permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => roles_permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const roles_permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.roles_permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const usersWhereInputSchema: z.ZodType<Prisma.usersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
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
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesListRelationFilterSchema).optional()
}).strict();

export const usersOrderByWithRelationInputSchema: z.ZodType<Prisma.usersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  permissions_permissions_created_byTousers: z.lazy(() => permissionsOrderByRelationAggregateInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsOrderByRelationAggregateInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesOrderByRelationAggregateInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesOrderByRelationAggregateInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const usersWhereUniqueInputSchema: z.ZodType<Prisma.usersWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    phone: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    phone: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  phone: z.string().optional(),
  AND: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
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
  users_roles_usersTousers_roles_user_id: z.lazy(() => Users_rolesListRelationFilterSchema).optional()
}).strict());

export const usersOrderByWithAggregationInputSchema: z.ZodType<Prisma.usersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  _count: z.lazy(() => usersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => usersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => usersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => usersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => usersSumOrderByAggregateInputSchema).optional()
}).strict();

export const usersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.usersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema),z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema),z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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

export const users_permissionsWhereInputSchema: z.ZodType<Prisma.users_permissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => users_permissionsWhereInputSchema),z.lazy(() => users_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_permissionsWhereInputSchema),z.lazy(() => users_permissionsWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_permissions_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => permissionsWhereInputSchema) ]).optional(),
  users_usersTousers_permissions_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_permissions_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
}).strict();

export const users_permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.users_permissionsOrderByWithRelationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_usersTousers_permissions_created_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  permissions: z.lazy(() => permissionsOrderByWithRelationInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersOrderByWithRelationInputSchema).optional()
}).strict();

export const users_permissionsWhereUniqueInputSchema: z.ZodType<Prisma.users_permissionsWhereUniqueInput> = z.object({
  user_id_permission_id: z.lazy(() => users_permissionsUser_idPermission_idCompoundUniqueInputSchema)
})
.and(z.object({
  user_id_permission_id: z.lazy(() => users_permissionsUser_idPermission_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => users_permissionsWhereInputSchema),z.lazy(() => users_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_permissionsWhereInputSchema),z.lazy(() => users_permissionsWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_permissions_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => permissionsWhereInputSchema) ]).optional(),
  users_usersTousers_permissions_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_permissions_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
}).strict());

export const users_permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.users_permissionsOrderByWithAggregationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => users_permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => users_permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => users_permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const users_permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.users_permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const users_rolesWhereInputSchema: z.ZodType<Prisma.users_rolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => users_rolesWhereInputSchema),z.lazy(() => users_rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_rolesWhereInputSchema),z.lazy(() => users_rolesWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_roles_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  users_usersTousers_roles_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_roles_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
}).strict();

export const users_rolesOrderByWithRelationInputSchema: z.ZodType<Prisma.users_rolesOrderByWithRelationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_usersTousers_roles_created_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  roles: z.lazy(() => rolesOrderByWithRelationInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersOrderByWithRelationInputSchema).optional()
}).strict();

export const users_rolesWhereUniqueInputSchema: z.ZodType<Prisma.users_rolesWhereUniqueInput> = z.object({
  user_id_role_id: z.lazy(() => users_rolesUser_idRole_idCompoundUniqueInputSchema)
})
.and(z.object({
  user_id_role_id: z.lazy(() => users_rolesUser_idRole_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => users_rolesWhereInputSchema),z.lazy(() => users_rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_rolesWhereInputSchema),z.lazy(() => users_rolesWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_roles_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  users_usersTousers_roles_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_roles_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
}).strict());

export const users_rolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.users_rolesOrderByWithAggregationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => users_rolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => users_rolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => users_rolesMinOrderByAggregateInputSchema).optional()
}).strict();

export const users_rolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.users_rolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const permissionsCreateInputSchema: z.ZodType<Prisma.permissionsCreateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsUncheckedCreateInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsUpdateInputSchema: z.ZodType<Prisma.permissionsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsCreateManyInputSchema: z.ZodType<Prisma.permissionsCreateManyInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const permissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.permissionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const permissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const rolesCreateInputSchema: z.ZodType<Prisma.rolesCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateInputSchema: z.ZodType<Prisma.rolesUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUpdateInputSchema: z.ZodType<Prisma.rolesUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesCreateManyInputSchema: z.ZodType<Prisma.rolesCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const rolesUpdateManyMutationInputSchema: z.ZodType<Prisma.rolesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const rolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsCreateInputSchema: z.ZodType<Prisma.roles_permissionsCreateInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedCreateInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsUpdateInputSchema: z.ZodType<Prisma.roles_permissionsUpdateInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsCreateManyInputSchema: z.ZodType<Prisma.roles_permissionsCreateManyInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyMutationInput> = z.object({
}).strict();

export const roles_permissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const usersCreateInputSchema: z.ZodType<Prisma.usersCreateInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateInputSchema: z.ZodType<Prisma.usersUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUpdateInputSchema: z.ZodType<Prisma.usersUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateInputSchema: z.ZodType<Prisma.usersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersCreateManyInputSchema: z.ZodType<Prisma.usersCreateManyInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable()
}).strict();

export const usersUpdateManyMutationInputSchema: z.ZodType<Prisma.usersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const usersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.usersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsCreateInputSchema: z.ZodType<Prisma.users_permissionsCreateInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const users_permissionsUncheckedCreateInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_permissionsUpdateInputSchema: z.ZodType<Prisma.users_permissionsUpdateInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const users_permissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsCreateManyInputSchema: z.ZodType<Prisma.users_permissionsCreateManyInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_permissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyMutationInput> = z.object({
}).strict();

export const users_permissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesCreateInputSchema: z.ZodType<Prisma.users_rolesCreateInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  roles: z.lazy(() => rolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const users_rolesUncheckedCreateInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesUpdateInputSchema: z.ZodType<Prisma.users_rolesUpdateInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const users_rolesUncheckedUpdateInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesCreateManyInputSchema: z.ZodType<Prisma.users_rolesCreateManyInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesUpdateManyMutationInputSchema: z.ZodType<Prisma.users_rolesUpdateManyMutationInput> = z.object({
}).strict();

export const users_rolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  is: z.lazy(() => usersWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => usersWhereInputSchema).optional().nullable()
}).strict();

export const Roles_permissionsListRelationFilterSchema: z.ZodType<Prisma.Roles_permissionsListRelationFilter> = z.object({
  every: z.lazy(() => roles_permissionsWhereInputSchema).optional(),
  some: z.lazy(() => roles_permissionsWhereInputSchema).optional(),
  none: z.lazy(() => roles_permissionsWhereInputSchema).optional()
}).strict();

export const Users_permissionsListRelationFilterSchema: z.ZodType<Prisma.Users_permissionsListRelationFilter> = z.object({
  every: z.lazy(() => users_permissionsWhereInputSchema).optional(),
  some: z.lazy(() => users_permissionsWhereInputSchema).optional(),
  none: z.lazy(() => users_permissionsWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const roles_permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.roles_permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const users_permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.users_permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.permissionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.permissionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const permissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.permissionsMinOrderByAggregateInput> = z.object({
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
  every: z.lazy(() => users_rolesWhereInputSchema).optional(),
  some: z.lazy(() => users_rolesWhereInputSchema).optional(),
  none: z.lazy(() => users_rolesWhereInputSchema).optional()
}).strict();

export const users_rolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.users_rolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.rolesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.rolesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.rolesMinOrderByAggregateInput> = z.object({
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
  is: z.lazy(() => permissionsWhereInputSchema).optional(),
  isNot: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export const RolesRelationFilterSchema: z.ZodType<Prisma.RolesRelationFilter> = z.object({
  is: z.lazy(() => rolesWhereInputSchema).optional(),
  isNot: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export const roles_permissionsRole_idPermission_idCompoundUniqueInputSchema: z.ZodType<Prisma.roles_permissionsRole_idPermission_idCompoundUniqueInput> = z.object({
  role_id: z.string(),
  permission_id: z.string()
}).strict();

export const roles_permissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.roles_permissionsCountOrderByAggregateInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const roles_permissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.roles_permissionsMaxOrderByAggregateInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const roles_permissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.roles_permissionsMinOrderByAggregateInput> = z.object({
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
  every: z.lazy(() => permissionsWhereInputSchema).optional(),
  some: z.lazy(() => permissionsWhereInputSchema).optional(),
  none: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export const RolesListRelationFilterSchema: z.ZodType<Prisma.RolesListRelationFilter> = z.object({
  every: z.lazy(() => rolesWhereInputSchema).optional(),
  some: z.lazy(() => rolesWhereInputSchema).optional(),
  none: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export const permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const rolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.rolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const usersCountOrderByAggregateInputSchema: z.ZodType<Prisma.usersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
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

export const usersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.usersAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const usersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.usersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
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

export const usersMinOrderByAggregateInputSchema: z.ZodType<Prisma.usersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
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

export const usersSumOrderByAggregateInputSchema: z.ZodType<Prisma.usersSumOrderByAggregateInput> = z.object({
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
  is: z.lazy(() => usersWhereInputSchema).optional(),
  isNot: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const users_permissionsUser_idPermission_idCompoundUniqueInputSchema: z.ZodType<Prisma.users_permissionsUser_idPermission_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  permission_id: z.string()
}).strict();

export const users_permissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.users_permissionsCountOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const users_permissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.users_permissionsMaxOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const users_permissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.users_permissionsMinOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const users_rolesUser_idRole_idCompoundUniqueInputSchema: z.ZodType<Prisma.users_rolesUser_idRole_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  role_id: z.string()
}).strict();

export const users_rolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.users_rolesCountOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const users_rolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.users_rolesMaxOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const users_rolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.users_rolesMinOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const roles_permissionsCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
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

export const usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
}).strict();

export const usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]).optional(),
}).strict();

export const roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutRoles_roles_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutRoles_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const roles_permissionsCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const usersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutRoles_roles_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutRoles_roles_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]).optional(),
}).strict();

export const usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
}).strict();

export const roles_permissionsUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const permissionsCreateNestedOneWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateNestedOneWithoutRoles_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional()
}).strict();

export const rolesCreateNestedOneWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesCreateNestedOneWithoutRoles_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]).optional(),
}).strict();

export const permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema: z.ZodType<Prisma.permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  upsert: z.lazy(() => permissionsUpsertWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]).optional(),
}).strict();

export const rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema: z.ZodType<Prisma.rolesUpdateOneRequiredWithoutRoles_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  upsert: z.lazy(() => rolesUpsertWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => rolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]).optional(),
}).strict();

export const usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
}).strict();

export const usersCreatedoc_filesInputSchema: z.ZodType<Prisma.usersCreatedoc_filesInput> = z.object({
  set: z.string().array()
}).strict();

export const permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesCreateNestedManyWithoutUsers_roles_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
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

export const usersUpdatedoc_filesInputSchema: z.ZodType<Prisma.usersUpdatedoc_filesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => permissionsScalarWhereInputSchema),z.lazy(() => permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => permissionsScalarWhereInputSchema),z.lazy(() => permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema: z.ZodType<Prisma.rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolesScalarWhereInputSchema),z.lazy(() => rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema: z.ZodType<Prisma.rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolesScalarWhereInputSchema),z.lazy(() => rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => permissionsScalarWhereInputSchema),z.lazy(() => permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => permissionsScalarWhereInputSchema),z.lazy(() => permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolesScalarWhereInputSchema),z.lazy(() => rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolesScalarWhereInputSchema),z.lazy(() => rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const permissionsCreateNestedOneWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateNestedOneWithoutUsers_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
}).strict();

export const permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema: z.ZodType<Prisma.permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissionsInputSchema).optional(),
  upsert: z.lazy(() => permissionsUpsertWithoutUsers_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]).optional(),
}).strict();

export const usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]).optional(),
}).strict();

export const usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
}).strict();

export const usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const rolesCreateNestedOneWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesCreateNestedOneWithoutUsers_rolesInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutUsers_rolesInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export const usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
}).strict();

export const rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema: z.ZodType<Prisma.rolesUpdateOneRequiredWithoutUsers_rolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutUsers_rolesInputSchema).optional(),
  upsert: z.lazy(() => rolesUpsertWithoutUsers_rolesInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => rolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema),z.lazy(() => rolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]).optional(),
}).strict();

export const usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]).optional(),
}).strict();

export const usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
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

export const usersCreateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
}).strict();

export const usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsCreateWithoutPermissionsInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateWithoutPermissionsInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const roles_permissionsCreateManyPermissionsInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyPermissionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyPermissionsInputSchema),z.lazy(() => roles_permissionsCreateManyPermissionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_permissionsCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsCreateWithoutPermissionsInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const users_permissionsUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateWithoutPermissionsInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const users_permissionsCreateManyPermissionsInputEnvelopeSchema: z.ZodType<Prisma.users_permissionsCreateManyPermissionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_permissionsCreateManyPermissionsInputSchema),z.lazy(() => users_permissionsCreateManyPermissionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const usersUpsertWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutPermissions_permissions_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
}).strict();

export const usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUpsertWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export const roles_permissionsScalarWhereInputSchema: z.ZodType<Prisma.roles_permissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => roles_permissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateManyMutationInputSchema),z.lazy(() => users_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export const users_permissionsScalarWhereInputSchema: z.ZodType<Prisma.users_permissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_permissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const usersCreateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutRoles_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]),
}).strict();

export const usersCreateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutRoles_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsCreateWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsCreateWithoutRolesInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateWithoutRolesInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const roles_permissionsCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyRolesInputSchema),z.lazy(() => roles_permissionsCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_rolesCreateWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesCreateWithoutRolesInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const users_rolesUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateWithoutRolesInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const users_rolesCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyRolesInputSchema),z.lazy(() => users_rolesCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const usersUpsertWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutRoles_roles_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]),
}).strict();

export const usersUpdateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutRoles_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUpsertWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutRoles_roles_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]),
}).strict();

export const usersUpdateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_rolesUpdateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const users_rolesUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateManyMutationInputSchema),z.lazy(() => users_rolesUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const users_rolesScalarWhereInputSchema: z.ZodType<Prisma.users_rolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_rolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const usersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const permissionsCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsUncheckedCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  users_permissions: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsCreateOrConnectWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateOrConnectWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const rolesCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  users_roles: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesCreateOrConnectWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const usersUpsertWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const permissionsUpsertWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUpsertWithoutRoles_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => permissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
  where: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export const permissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUpdateToOneWithWhereWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => permissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const permissionsUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users_permissions: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const rolesUpsertWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUpsertWithoutRoles_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => rolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
  where: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export const rolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUpdateToOneWithWhereWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => rolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => rolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export const rolesUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateWithoutRoles_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users_roles: z.lazy(() => users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.permissionsCreateManyUsers_permissions_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const rolesCreateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesCreateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.rolesCreateManyUsers_roles_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const rolesCreateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesCreateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.rolesCreateManyUsers_roles_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRoles_permissionsInputSchema)
}).strict();

export const roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export const users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional()
}).strict();

export const users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesCreateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  roles: z.lazy(() => rolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  roles: z.lazy(() => rolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export const users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesCreateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  roles: z.lazy(() => rolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional()
}).strict();

export const users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const permissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateWithWhereUniqueWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const permissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateManyWithWhereWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => permissionsUpdateManyMutationInputSchema),z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export const permissionsScalarWhereInputSchema: z.ZodType<Prisma.permissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => permissionsScalarWhereInputSchema),z.lazy(() => permissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionsScalarWhereInputSchema),z.lazy(() => permissionsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => permissionsUpdateManyMutationInputSchema),z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => rolesUpdateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_roles_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => rolesUpdateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rolesUpdateManyMutationInputSchema),z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export const rolesScalarWhereInputSchema: z.ZodType<Prisma.rolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rolesScalarWhereInputSchema),z.lazy(() => rolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesScalarWhereInputSchema),z.lazy(() => rolesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rolesUpdateManyMutationInputSchema),z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export const users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateManyMutationInputSchema),z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateManyMutationInputSchema),z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateManyMutationInputSchema),z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateManyMutationInputSchema),z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateManyMutationInputSchema),z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateManyMutationInputSchema),z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const permissionsCreateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateWithoutUsers_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsUncheckedCreateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateWithoutUsers_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const permissionsCreateOrConnectWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateOrConnectWithoutUsers_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]),
}).strict();

export const usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const usersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export const usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const permissionsUpsertWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUpsertWithoutUsers_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]),
  where: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export const permissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUpdateToOneWithWhereWithoutUsers_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]),
}).strict();

export const permissionsUpdateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUpdateWithoutUsers_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateWithoutUsers_permissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const usersUpsertWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export const usersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export const usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersCreateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const rolesCreateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesCreateWithoutUsers_rolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesUncheckedCreateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutUsers_rolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const rolesCreateOrConnectWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutUsers_rolesInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]),
}).strict();

export const usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersCreateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional()
}).strict();

export const usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
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
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema).optional()
}).strict();

export const usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const usersUpsertWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export const usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const rolesUpsertWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUpsertWithoutUsers_rolesInput> = z.object({
  update: z.union([ z.lazy(() => rolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]),
  where: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export const rolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUpdateToOneWithWhereWithoutUsers_rolesInput> = z.object({
  where: z.lazy(() => rolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => rolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]),
}).strict();

export const rolesUpdateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUpdateWithoutUsers_rolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateWithoutUsers_rolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const usersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export const usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export const usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export const usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional()
}).strict();

export const usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  max_active_order_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersUpdatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  app_version: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  api_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tg_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema).optional()
}).strict();

export const roles_permissionsCreateManyPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsCreateManyPermissionsInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateManyPermissionsInputSchema: z.ZodType<Prisma.users_permissionsCreateManyPermissionsInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithoutPermissionsInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateWithoutPermissionsInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutPermissionsInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithoutPermissionsInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const users_permissionsUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateWithoutPermissionsInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutPermissionsInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsCreateManyRolesInputSchema: z.ZodType<Prisma.roles_permissionsCreateManyRolesInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateManyRolesInputSchema: z.ZodType<Prisma.users_rolesCreateManyRolesInput> = z.object({
  user_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsUpdateWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithoutRolesInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateWithoutRolesInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutRolesInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUpdateWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpdateWithoutRolesInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const users_rolesUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateWithoutRolesInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutRolesInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const permissionsCreateManyUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateManyUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable()
}).strict();

export const permissionsCreateManyUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateManyUsers_permissions_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable()
}).strict();

export const rolesCreateManyUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesCreateManyUsers_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable()
}).strict();

export const rolesCreateManyUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesCreateManyUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export const users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export const permissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateManyWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const permissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const rolesUpdateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_roles_created_byTousersNestedInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional()
}).strict();

export const roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export const users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional()
}).strict();

export const users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUpdateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export const users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional()
}).strict();

export const users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const permissionsFindFirstArgsSchema: z.ZodType<Omit<Prisma.permissionsFindFirstArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  where: permissionsWhereInputSchema.optional(),
  orderBy: z.union([ permissionsOrderByWithRelationInputSchema.array(),permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionsScalarFieldEnumSchema,PermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const permissionsFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.permissionsFindFirstOrThrowArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  where: permissionsWhereInputSchema.optional(),
  orderBy: z.union([ permissionsOrderByWithRelationInputSchema.array(),permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionsScalarFieldEnumSchema,PermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const permissionsFindManyArgsSchema: z.ZodType<Omit<Prisma.permissionsFindManyArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  where: permissionsWhereInputSchema.optional(),
  orderBy: z.union([ permissionsOrderByWithRelationInputSchema.array(),permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionsScalarFieldEnumSchema,PermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const permissionsAggregateArgsSchema: z.ZodType<Prisma.permissionsAggregateArgs> = z.object({
  where: permissionsWhereInputSchema.optional(),
  orderBy: z.union([ permissionsOrderByWithRelationInputSchema.array(),permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const permissionsGroupByArgsSchema: z.ZodType<Prisma.permissionsGroupByArgs> = z.object({
  where: permissionsWhereInputSchema.optional(),
  orderBy: z.union([ permissionsOrderByWithAggregationInputSchema.array(),permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionsScalarFieldEnumSchema.array(),
  having: permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const permissionsFindUniqueArgsSchema: z.ZodType<Omit<Prisma.permissionsFindUniqueArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  where: permissionsWhereUniqueInputSchema,
}).strict()

export const permissionsFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.permissionsFindUniqueOrThrowArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  where: permissionsWhereUniqueInputSchema,
}).strict()

export const rolesFindFirstArgsSchema: z.ZodType<Omit<Prisma.rolesFindFirstArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const rolesFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.rolesFindFirstOrThrowArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const rolesFindManyArgsSchema: z.ZodType<Omit<Prisma.rolesFindManyArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const rolesAggregateArgsSchema: z.ZodType<Prisma.rolesAggregateArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const rolesGroupByArgsSchema: z.ZodType<Prisma.rolesGroupByArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithAggregationInputSchema.array(),rolesOrderByWithAggregationInputSchema ]).optional(),
  by: RolesScalarFieldEnumSchema.array(),
  having: rolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const rolesFindUniqueArgsSchema: z.ZodType<Omit<Prisma.rolesFindUniqueArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  where: rolesWhereUniqueInputSchema,
}).strict()

export const rolesFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.rolesFindUniqueOrThrowArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  where: rolesWhereUniqueInputSchema,
}).strict()

export const roles_permissionsFindFirstArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsFindFirstArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  where: roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ roles_permissionsOrderByWithRelationInputSchema.array(),roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Roles_permissionsScalarFieldEnumSchema,Roles_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const roles_permissionsFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsFindFirstOrThrowArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  where: roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ roles_permissionsOrderByWithRelationInputSchema.array(),roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Roles_permissionsScalarFieldEnumSchema,Roles_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const roles_permissionsFindManyArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsFindManyArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  where: roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ roles_permissionsOrderByWithRelationInputSchema.array(),roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Roles_permissionsScalarFieldEnumSchema,Roles_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const roles_permissionsAggregateArgsSchema: z.ZodType<Prisma.roles_permissionsAggregateArgs> = z.object({
  where: roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ roles_permissionsOrderByWithRelationInputSchema.array(),roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const roles_permissionsGroupByArgsSchema: z.ZodType<Prisma.roles_permissionsGroupByArgs> = z.object({
  where: roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ roles_permissionsOrderByWithAggregationInputSchema.array(),roles_permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: Roles_permissionsScalarFieldEnumSchema.array(),
  having: roles_permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const roles_permissionsFindUniqueArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsFindUniqueArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  where: roles_permissionsWhereUniqueInputSchema,
}).strict()

export const roles_permissionsFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsFindUniqueOrThrowArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  where: roles_permissionsWhereUniqueInputSchema,
}).strict()

export const usersFindFirstArgsSchema: z.ZodType<Omit<Prisma.usersFindFirstArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const usersFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.usersFindFirstOrThrowArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const usersFindManyArgsSchema: z.ZodType<Omit<Prisma.usersFindManyArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const usersAggregateArgsSchema: z.ZodType<Prisma.usersAggregateArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const usersGroupByArgsSchema: z.ZodType<Prisma.usersGroupByArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithAggregationInputSchema.array(),usersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(),
  having: usersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const usersFindUniqueArgsSchema: z.ZodType<Omit<Prisma.usersFindUniqueArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict()

export const usersFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.usersFindUniqueOrThrowArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict()

export const users_permissionsFindFirstArgsSchema: z.ZodType<Omit<Prisma.users_permissionsFindFirstArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  where: users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ users_permissionsOrderByWithRelationInputSchema.array(),users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_permissionsScalarFieldEnumSchema,Users_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const users_permissionsFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.users_permissionsFindFirstOrThrowArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  where: users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ users_permissionsOrderByWithRelationInputSchema.array(),users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_permissionsScalarFieldEnumSchema,Users_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const users_permissionsFindManyArgsSchema: z.ZodType<Omit<Prisma.users_permissionsFindManyArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  where: users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ users_permissionsOrderByWithRelationInputSchema.array(),users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_permissionsScalarFieldEnumSchema,Users_permissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const users_permissionsAggregateArgsSchema: z.ZodType<Prisma.users_permissionsAggregateArgs> = z.object({
  where: users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ users_permissionsOrderByWithRelationInputSchema.array(),users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const users_permissionsGroupByArgsSchema: z.ZodType<Prisma.users_permissionsGroupByArgs> = z.object({
  where: users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ users_permissionsOrderByWithAggregationInputSchema.array(),users_permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: Users_permissionsScalarFieldEnumSchema.array(),
  having: users_permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const users_permissionsFindUniqueArgsSchema: z.ZodType<Omit<Prisma.users_permissionsFindUniqueArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  where: users_permissionsWhereUniqueInputSchema,
}).strict()

export const users_permissionsFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.users_permissionsFindUniqueOrThrowArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  where: users_permissionsWhereUniqueInputSchema,
}).strict()

export const users_rolesFindFirstArgsSchema: z.ZodType<Omit<Prisma.users_rolesFindFirstArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithRelationInputSchema.array(),users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_rolesScalarFieldEnumSchema,Users_rolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const users_rolesFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.users_rolesFindFirstOrThrowArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithRelationInputSchema.array(),users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_rolesScalarFieldEnumSchema,Users_rolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const users_rolesFindManyArgsSchema: z.ZodType<Omit<Prisma.users_rolesFindManyArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithRelationInputSchema.array(),users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_rolesScalarFieldEnumSchema,Users_rolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const users_rolesAggregateArgsSchema: z.ZodType<Prisma.users_rolesAggregateArgs> = z.object({
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithRelationInputSchema.array(),users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const users_rolesGroupByArgsSchema: z.ZodType<Prisma.users_rolesGroupByArgs> = z.object({
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithAggregationInputSchema.array(),users_rolesOrderByWithAggregationInputSchema ]).optional(),
  by: Users_rolesScalarFieldEnumSchema.array(),
  having: users_rolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const users_rolesFindUniqueArgsSchema: z.ZodType<Omit<Prisma.users_rolesFindUniqueArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  where: users_rolesWhereUniqueInputSchema,
}).strict()

export const users_rolesFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.users_rolesFindUniqueOrThrowArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  where: users_rolesWhereUniqueInputSchema,
}).strict()

export const permissionsCreateArgsSchema: z.ZodType<Omit<Prisma.permissionsCreateArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  data: z.union([ permissionsCreateInputSchema,permissionsUncheckedCreateInputSchema ]),
}).strict()

export const permissionsUpsertArgsSchema: z.ZodType<Omit<Prisma.permissionsUpsertArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  where: permissionsWhereUniqueInputSchema,
  create: z.union([ permissionsCreateInputSchema,permissionsUncheckedCreateInputSchema ]),
  update: z.union([ permissionsUpdateInputSchema,permissionsUncheckedUpdateInputSchema ]),
}).strict()

export const permissionsCreateManyArgsSchema: z.ZodType<Prisma.permissionsCreateManyArgs> = z.object({
  data: z.union([ permissionsCreateManyInputSchema,permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const permissionsDeleteArgsSchema: z.ZodType<Omit<Prisma.permissionsDeleteArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  where: permissionsWhereUniqueInputSchema,
}).strict()

export const permissionsUpdateArgsSchema: z.ZodType<Omit<Prisma.permissionsUpdateArgs, "include">> = z.object({
  select: permissionsSelectSchema.optional(),
  data: z.union([ permissionsUpdateInputSchema,permissionsUncheckedUpdateInputSchema ]),
  where: permissionsWhereUniqueInputSchema,
}).strict()

export const permissionsUpdateManyArgsSchema: z.ZodType<Prisma.permissionsUpdateManyArgs> = z.object({
  data: z.union([ permissionsUpdateManyMutationInputSchema,permissionsUncheckedUpdateManyInputSchema ]),
  where: permissionsWhereInputSchema.optional(),
}).strict()

export const permissionsDeleteManyArgsSchema: z.ZodType<Prisma.permissionsDeleteManyArgs> = z.object({
  where: permissionsWhereInputSchema.optional(),
}).strict()

export const rolesCreateArgsSchema: z.ZodType<Omit<Prisma.rolesCreateArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  data: z.union([ rolesCreateInputSchema,rolesUncheckedCreateInputSchema ]),
}).strict()

export const rolesUpsertArgsSchema: z.ZodType<Omit<Prisma.rolesUpsertArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  where: rolesWhereUniqueInputSchema,
  create: z.union([ rolesCreateInputSchema,rolesUncheckedCreateInputSchema ]),
  update: z.union([ rolesUpdateInputSchema,rolesUncheckedUpdateInputSchema ]),
}).strict()

export const rolesCreateManyArgsSchema: z.ZodType<Prisma.rolesCreateManyArgs> = z.object({
  data: z.union([ rolesCreateManyInputSchema,rolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const rolesDeleteArgsSchema: z.ZodType<Omit<Prisma.rolesDeleteArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  where: rolesWhereUniqueInputSchema,
}).strict()

export const rolesUpdateArgsSchema: z.ZodType<Omit<Prisma.rolesUpdateArgs, "include">> = z.object({
  select: rolesSelectSchema.optional(),
  data: z.union([ rolesUpdateInputSchema,rolesUncheckedUpdateInputSchema ]),
  where: rolesWhereUniqueInputSchema,
}).strict()

export const rolesUpdateManyArgsSchema: z.ZodType<Prisma.rolesUpdateManyArgs> = z.object({
  data: z.union([ rolesUpdateManyMutationInputSchema,rolesUncheckedUpdateManyInputSchema ]),
  where: rolesWhereInputSchema.optional(),
}).strict()

export const rolesDeleteManyArgsSchema: z.ZodType<Prisma.rolesDeleteManyArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
}).strict()

export const roles_permissionsCreateArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsCreateArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  data: z.union([ roles_permissionsCreateInputSchema,roles_permissionsUncheckedCreateInputSchema ]),
}).strict()

export const roles_permissionsUpsertArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsUpsertArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  where: roles_permissionsWhereUniqueInputSchema,
  create: z.union([ roles_permissionsCreateInputSchema,roles_permissionsUncheckedCreateInputSchema ]),
  update: z.union([ roles_permissionsUpdateInputSchema,roles_permissionsUncheckedUpdateInputSchema ]),
}).strict()

export const roles_permissionsCreateManyArgsSchema: z.ZodType<Prisma.roles_permissionsCreateManyArgs> = z.object({
  data: z.union([ roles_permissionsCreateManyInputSchema,roles_permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const roles_permissionsDeleteArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsDeleteArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  where: roles_permissionsWhereUniqueInputSchema,
}).strict()

export const roles_permissionsUpdateArgsSchema: z.ZodType<Omit<Prisma.roles_permissionsUpdateArgs, "include">> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  data: z.union([ roles_permissionsUpdateInputSchema,roles_permissionsUncheckedUpdateInputSchema ]),
  where: roles_permissionsWhereUniqueInputSchema,
}).strict()

export const roles_permissionsUpdateManyArgsSchema: z.ZodType<Prisma.roles_permissionsUpdateManyArgs> = z.object({
  data: z.union([ roles_permissionsUpdateManyMutationInputSchema,roles_permissionsUncheckedUpdateManyInputSchema ]),
  where: roles_permissionsWhereInputSchema.optional(),
}).strict()

export const roles_permissionsDeleteManyArgsSchema: z.ZodType<Prisma.roles_permissionsDeleteManyArgs> = z.object({
  where: roles_permissionsWhereInputSchema.optional(),
}).strict()

export const usersCreateArgsSchema: z.ZodType<Omit<Prisma.usersCreateArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  data: z.union([ usersCreateInputSchema,usersUncheckedCreateInputSchema ]),
}).strict()

export const usersUpsertArgsSchema: z.ZodType<Omit<Prisma.usersUpsertArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema,
  create: z.union([ usersCreateInputSchema,usersUncheckedCreateInputSchema ]),
  update: z.union([ usersUpdateInputSchema,usersUncheckedUpdateInputSchema ]),
}).strict()

export const usersCreateManyArgsSchema: z.ZodType<Prisma.usersCreateManyArgs> = z.object({
  data: z.union([ usersCreateManyInputSchema,usersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const usersDeleteArgsSchema: z.ZodType<Omit<Prisma.usersDeleteArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict()

export const usersUpdateArgsSchema: z.ZodType<Omit<Prisma.usersUpdateArgs, "include">> = z.object({
  select: usersSelectSchema.optional(),
  data: z.union([ usersUpdateInputSchema,usersUncheckedUpdateInputSchema ]),
  where: usersWhereUniqueInputSchema,
}).strict()

export const usersUpdateManyArgsSchema: z.ZodType<Prisma.usersUpdateManyArgs> = z.object({
  data: z.union([ usersUpdateManyMutationInputSchema,usersUncheckedUpdateManyInputSchema ]),
  where: usersWhereInputSchema.optional(),
}).strict()

export const usersDeleteManyArgsSchema: z.ZodType<Prisma.usersDeleteManyArgs> = z.object({
  where: usersWhereInputSchema.optional(),
}).strict()

export const users_permissionsCreateArgsSchema: z.ZodType<Omit<Prisma.users_permissionsCreateArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  data: z.union([ users_permissionsCreateInputSchema,users_permissionsUncheckedCreateInputSchema ]),
}).strict()

export const users_permissionsUpsertArgsSchema: z.ZodType<Omit<Prisma.users_permissionsUpsertArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  where: users_permissionsWhereUniqueInputSchema,
  create: z.union([ users_permissionsCreateInputSchema,users_permissionsUncheckedCreateInputSchema ]),
  update: z.union([ users_permissionsUpdateInputSchema,users_permissionsUncheckedUpdateInputSchema ]),
}).strict()

export const users_permissionsCreateManyArgsSchema: z.ZodType<Prisma.users_permissionsCreateManyArgs> = z.object({
  data: z.union([ users_permissionsCreateManyInputSchema,users_permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const users_permissionsDeleteArgsSchema: z.ZodType<Omit<Prisma.users_permissionsDeleteArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  where: users_permissionsWhereUniqueInputSchema,
}).strict()

export const users_permissionsUpdateArgsSchema: z.ZodType<Omit<Prisma.users_permissionsUpdateArgs, "include">> = z.object({
  select: users_permissionsSelectSchema.optional(),
  data: z.union([ users_permissionsUpdateInputSchema,users_permissionsUncheckedUpdateInputSchema ]),
  where: users_permissionsWhereUniqueInputSchema,
}).strict()

export const users_permissionsUpdateManyArgsSchema: z.ZodType<Prisma.users_permissionsUpdateManyArgs> = z.object({
  data: z.union([ users_permissionsUpdateManyMutationInputSchema,users_permissionsUncheckedUpdateManyInputSchema ]),
  where: users_permissionsWhereInputSchema.optional(),
}).strict()

export const users_permissionsDeleteManyArgsSchema: z.ZodType<Prisma.users_permissionsDeleteManyArgs> = z.object({
  where: users_permissionsWhereInputSchema.optional(),
}).strict()

export const users_rolesCreateArgsSchema: z.ZodType<Omit<Prisma.users_rolesCreateArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  data: z.union([ users_rolesCreateInputSchema,users_rolesUncheckedCreateInputSchema ]),
}).strict()

export const users_rolesUpsertArgsSchema: z.ZodType<Omit<Prisma.users_rolesUpsertArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  where: users_rolesWhereUniqueInputSchema,
  create: z.union([ users_rolesCreateInputSchema,users_rolesUncheckedCreateInputSchema ]),
  update: z.union([ users_rolesUpdateInputSchema,users_rolesUncheckedUpdateInputSchema ]),
}).strict()

export const users_rolesCreateManyArgsSchema: z.ZodType<Prisma.users_rolesCreateManyArgs> = z.object({
  data: z.union([ users_rolesCreateManyInputSchema,users_rolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const users_rolesDeleteArgsSchema: z.ZodType<Omit<Prisma.users_rolesDeleteArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  where: users_rolesWhereUniqueInputSchema,
}).strict()

export const users_rolesUpdateArgsSchema: z.ZodType<Omit<Prisma.users_rolesUpdateArgs, "include">> = z.object({
  select: users_rolesSelectSchema.optional(),
  data: z.union([ users_rolesUpdateInputSchema,users_rolesUncheckedUpdateInputSchema ]),
  where: users_rolesWhereUniqueInputSchema,
}).strict()

export const users_rolesUpdateManyArgsSchema: z.ZodType<Prisma.users_rolesUpdateManyArgs> = z.object({
  data: z.union([ users_rolesUpdateManyMutationInputSchema,users_rolesUncheckedUpdateManyInputSchema ]),
  where: users_rolesWhereInputSchema.optional(),
}).strict()

export const users_rolesDeleteManyArgsSchema: z.ZodType<Prisma.users_rolesDeleteManyArgs> = z.object({
  where: users_rolesWhereInputSchema.optional(),
}).strict()