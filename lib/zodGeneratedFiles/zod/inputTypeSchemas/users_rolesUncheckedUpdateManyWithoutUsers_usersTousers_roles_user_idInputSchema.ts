import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export default users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema;
