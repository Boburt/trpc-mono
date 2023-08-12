import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema } from './usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema';
import { roles_permissionsUpdateManyWithoutRolesNestedInputSchema } from './roles_permissionsUpdateManyWithoutRolesNestedInputSchema';
import { users_rolesUpdateManyWithoutRolesNestedInputSchema } from './users_rolesUpdateManyWithoutRolesNestedInputSchema';

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

export default rolesUpdateWithoutUsers_roles_created_byTousersInputSchema;
