import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema';
import { rolesCreateNestedOneWithoutRoles_permissionsInputSchema } from './rolesCreateNestedOneWithoutRoles_permissionsInputSchema';
import { usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsCreateWithoutPermissionsInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export default roles_permissionsCreateWithoutPermissionsInputSchema;
