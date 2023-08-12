import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_user_idInputSchema;
