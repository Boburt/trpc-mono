import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';

export const usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export default usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema;
