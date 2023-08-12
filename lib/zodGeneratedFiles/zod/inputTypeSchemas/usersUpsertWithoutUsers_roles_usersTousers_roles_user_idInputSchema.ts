import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema;
