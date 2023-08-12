import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema } from './usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema';
import { usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema } from './usersUpdateOneWithoutPermissions_permissions_updated_byTousersNestedInputSchema';
import { users_permissionsUpdateManyWithoutPermissionsNestedInputSchema } from './users_permissionsUpdateManyWithoutPermissionsNestedInputSchema';

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

export default permissionsUpdateWithoutRoles_permissionsInputSchema;
