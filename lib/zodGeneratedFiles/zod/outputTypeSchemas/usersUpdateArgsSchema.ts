import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersIncludeSchema } from '../inputTypeSchemas/usersIncludeSchema'
import { usersUpdateInputSchema } from '../inputTypeSchemas/usersUpdateInputSchema'
import { usersUncheckedUpdateInputSchema } from '../inputTypeSchemas/usersUncheckedUpdateInputSchema'
import { usersWhereUniqueInputSchema } from '../inputTypeSchemas/usersWhereUniqueInputSchema'
import { permissionsFindManyArgsSchema } from "../outputTypeSchemas/permissionsFindManyArgsSchema"
import { rolesFindManyArgsSchema } from "../outputTypeSchemas/rolesFindManyArgsSchema"
import { roles_permissionsFindManyArgsSchema } from "../outputTypeSchemas/roles_permissionsFindManyArgsSchema"
import { users_permissionsFindManyArgsSchema } from "../outputTypeSchemas/users_permissionsFindManyArgsSchema"
import { users_rolesFindManyArgsSchema } from "../outputTypeSchemas/users_rolesFindManyArgsSchema"
import { UsersCountOutputTypeArgsSchema } from "../outputTypeSchemas/UsersCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const usersUpdateArgsSchema: z.ZodType<Prisma.usersUpdateArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  data: z.union([ usersUpdateInputSchema,usersUncheckedUpdateInputSchema ]),
  where: usersWhereUniqueInputSchema,
}).strict()

export default usersUpdateArgsSchema;
