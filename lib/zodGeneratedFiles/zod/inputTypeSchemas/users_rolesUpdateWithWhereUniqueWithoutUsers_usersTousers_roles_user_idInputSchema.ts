import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema';

export const users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export default users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema;
