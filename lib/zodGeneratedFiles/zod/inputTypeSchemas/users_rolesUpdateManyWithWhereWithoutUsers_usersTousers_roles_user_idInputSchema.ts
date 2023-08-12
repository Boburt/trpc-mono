import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesScalarWhereInputSchema } from './users_rolesScalarWhereInputSchema';
import { users_rolesUpdateManyMutationInputSchema } from './users_rolesUpdateManyMutationInputSchema';
import { users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema';

export const users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateManyMutationInputSchema),z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export default users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema;
