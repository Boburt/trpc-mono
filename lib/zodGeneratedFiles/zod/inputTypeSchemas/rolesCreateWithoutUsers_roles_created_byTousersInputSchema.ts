import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema';
import { roles_permissionsCreateNestedManyWithoutRolesInputSchema } from './roles_permissionsCreateNestedManyWithoutRolesInputSchema';
import { users_rolesCreateNestedManyWithoutRolesInputSchema } from './users_rolesCreateNestedManyWithoutRolesInputSchema';

export const rolesCreateWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesCreateWithoutUsers_roles_created_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export default rolesCreateWithoutUsers_roles_created_byTousersInputSchema;
