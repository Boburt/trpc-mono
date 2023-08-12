import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { Enumuser_statusFilterSchema } from './Enumuser_statusFilterSchema';
import { user_statusSchema } from './user_statusSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { PermissionsListRelationFilterSchema } from './PermissionsListRelationFilterSchema';
import { RolesListRelationFilterSchema } from './RolesListRelationFilterSchema';
import { Roles_permissionsListRelationFilterSchema } from './Roles_permissionsListRelationFilterSchema';
import { Users_permissionsListRelationFilterSchema } from './Users_permissionsListRelationFilterSchema';
import { Users_rolesListRelationFilterSchema } from './Users_rolesListRelationFilterSchema';

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

export default usersWhereInputSchema;
