import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema } from './roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema';
import { users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema } from './users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema';

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

export default rolesUncheckedUpdateInputSchema;
