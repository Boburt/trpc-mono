import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema } from './users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema';

export const rolesUncheckedCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  users_roles: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export default rolesUncheckedCreateWithoutRoles_permissionsInputSchema;
