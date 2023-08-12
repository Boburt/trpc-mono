import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { rolesCreateNestedOneWithoutUsers_rolesInputSchema } from './rolesCreateNestedOneWithoutUsers_rolesInputSchema';
import { usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema';

export const users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  users_usersTousers_roles_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  roles: z.lazy(() => rolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export default users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema;