import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema;
