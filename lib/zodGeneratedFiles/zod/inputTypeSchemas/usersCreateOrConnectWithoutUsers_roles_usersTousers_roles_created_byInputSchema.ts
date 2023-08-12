import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';

export const usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export default usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema;
