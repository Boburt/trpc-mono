import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema } from './usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema';
import { rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema } from './rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema';
import { usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema } from './usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema';

export const roles_permissionsUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithoutPermissionsInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export default roles_permissionsUpdateWithoutPermissionsInputSchema;
