import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_created_byInputSchema;
