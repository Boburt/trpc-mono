import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema';
import { permissionsCreateNestedOneWithoutRoles_permissionsInputSchema } from './permissionsCreateNestedOneWithoutRoles_permissionsInputSchema';
import { rolesCreateNestedOneWithoutRoles_permissionsInputSchema } from './rolesCreateNestedOneWithoutRoles_permissionsInputSchema';
import { usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsCreateInputSchema: z.ZodType<Prisma.roles_permissionsCreateInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export default roles_permissionsCreateInputSchema;
