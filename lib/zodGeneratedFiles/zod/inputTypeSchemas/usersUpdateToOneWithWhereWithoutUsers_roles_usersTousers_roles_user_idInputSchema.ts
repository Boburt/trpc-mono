import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';

export const usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema;
