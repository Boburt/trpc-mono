import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema';
import { usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema';
import { users_rolesCreateNestedManyWithoutRolesInputSchema } from './users_rolesCreateNestedManyWithoutRolesInputSchema';

export const rolesCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export default rolesCreateWithoutRoles_permissionsInputSchema;
