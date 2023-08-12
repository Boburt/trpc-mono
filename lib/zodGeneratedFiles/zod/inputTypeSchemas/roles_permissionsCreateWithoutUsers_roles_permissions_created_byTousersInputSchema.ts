import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateNestedOneWithoutRoles_permissionsInputSchema } from './permissionsCreateNestedOneWithoutRoles_permissionsInputSchema';
import { rolesCreateNestedOneWithoutRoles_permissionsInputSchema } from './rolesCreateNestedOneWithoutRoles_permissionsInputSchema';
import { usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  roles: z.lazy(() => rolesCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export default roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema;
