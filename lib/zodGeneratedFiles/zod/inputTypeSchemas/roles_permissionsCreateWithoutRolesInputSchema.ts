import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema';
import { permissionsCreateNestedOneWithoutRoles_permissionsInputSchema } from './permissionsCreateNestedOneWithoutRoles_permissionsInputSchema';
import { usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsCreateWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsCreateWithoutRolesInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutRoles_permissionsInputSchema),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional()
}).strict();

export default roles_permissionsCreateWithoutRolesInputSchema;
