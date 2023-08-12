import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { user_statusSchema } from './user_statusSchema';
import { Enumuser_statusFieldUpdateOperationsInputSchema } from './Enumuser_statusFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { NullableFloatFieldUpdateOperationsInputSchema } from './NullableFloatFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { NullableIntFieldUpdateOperationsInputSchema } from './NullableIntFieldUpdateOperationsInputSchema';
import { usersUpdatedoc_filesInputSchema } from './usersUpdatedoc_filesInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema } from './permissionsUpdateManyWithoutUsers_permissions_created_byTousersNestedInputSchema';
import { permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema } from './permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema';
import { rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema } from './rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema';
import { rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema } from './rolesUpdateManyWithoutUsers_roles_updated_byTousersNestedInputSchema';
import { roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema } from './roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema';
import { users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema } from './users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_created_byNestedInputSchema';
import { users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema } from './users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema';
import { users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema } from './users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema';
import { users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema } from './users_rolesUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema';
import { users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema } from './users_rolesUpdateManyWithoutUsers_usersTousers_roles_updated_byNestedInputSchema';
import { users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema } from './users_rolesUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema';

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

export default usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema;
