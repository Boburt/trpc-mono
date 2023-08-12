import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema';
import { usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema';
import { roles_permissionsCreateNestedManyWithoutRolesInputSchema } from './roles_permissionsCreateNestedManyWithoutRolesInputSchema';

export const rolesCreateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesCreateWithoutUsers_rolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_roles_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_created_byTousersInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export default rolesCreateWithoutUsers_rolesInputSchema;
