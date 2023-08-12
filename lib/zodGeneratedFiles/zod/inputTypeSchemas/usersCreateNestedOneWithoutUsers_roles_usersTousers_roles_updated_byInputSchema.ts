import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_updated_byInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutUsers_roles_usersTousers_roles_updated_byInputSchema;
