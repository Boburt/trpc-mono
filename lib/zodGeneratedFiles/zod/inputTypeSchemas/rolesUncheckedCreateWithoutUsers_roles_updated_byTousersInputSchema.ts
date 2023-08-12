import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema } from './roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema';
import { users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema } from './users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema';

export const rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export default rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema;
