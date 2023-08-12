import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema';

export const users_rolesCreateWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesCreateWithoutRolesInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export default users_rolesCreateWithoutRolesInputSchema;
