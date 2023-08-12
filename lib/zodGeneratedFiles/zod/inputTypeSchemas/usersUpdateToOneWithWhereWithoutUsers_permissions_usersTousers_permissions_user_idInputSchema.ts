import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';

export const usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema;
