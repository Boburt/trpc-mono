import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema } from './usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema';
import { usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema } from './usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema';
import { usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema } from './usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema';

export const users_rolesUpdateWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpdateWithoutRolesInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema).optional()
}).strict();

export default users_rolesUpdateWithoutRolesInputSchema;
