import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema } from './permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema';
import { rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema } from './rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema';
import { usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema } from './usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema';

export const roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema).optional()
}).strict();

export default roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema;
