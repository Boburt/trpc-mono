import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { user_statusSchema } from './user_statusSchema';
import { usersCreatedoc_filesInputSchema } from './usersCreatedoc_filesInputSchema';
import { permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsUncheckedCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema';
import { permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUncheckedCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema';
import { rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema } from './rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema';
import { rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUncheckedCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema';
import { roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsUncheckedCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema';
import { users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema';
import { users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema } from './users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_updated_byInputSchema';
import { users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUncheckedCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema';

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

export default usersUncheckedCreateInputSchema;