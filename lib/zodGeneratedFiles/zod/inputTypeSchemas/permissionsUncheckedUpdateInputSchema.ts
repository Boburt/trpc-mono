import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema } from './roles_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema';
import { users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema } from './users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema';

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

export default permissionsUncheckedUpdateInputSchema;
