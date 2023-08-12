import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';

export const roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_by: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export default roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema;
