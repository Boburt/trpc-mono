import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';

export const usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]),
}).strict();

export default usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema;
