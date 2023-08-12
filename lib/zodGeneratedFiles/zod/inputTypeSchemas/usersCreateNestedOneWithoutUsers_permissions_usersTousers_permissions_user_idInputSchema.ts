import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema;
