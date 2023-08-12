import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema } from './usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema';
import { permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema } from './permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema';
import { rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema } from './rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema';

export const roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  users_roles_permissions_created_byTousers: z.lazy(() => usersUpdateOneWithoutRoles_permissions_roles_permissions_created_byTousersNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema).optional()
}).strict();

export default roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema;
