import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateNestedOneWithoutUsers_rolesInputSchema } from './rolesCreateNestedOneWithoutUsers_rolesInputSchema';
import { usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema';

export const users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesCreateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  roles: z.lazy(() => rolesCreateNestedOneWithoutUsers_rolesInputSchema),
  users_usersTousers_roles_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema)
}).strict();

export default users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema;
