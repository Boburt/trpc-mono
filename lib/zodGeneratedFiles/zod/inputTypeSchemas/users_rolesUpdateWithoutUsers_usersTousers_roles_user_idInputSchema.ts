import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema } from './usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema';
import { rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema } from './rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema';
import { usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema } from './usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema';

export const users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema).optional(),
  roles: z.lazy(() => rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_roles_usersTousers_roles_updated_byNestedInputSchema).optional()
}).strict();

export default users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema;
