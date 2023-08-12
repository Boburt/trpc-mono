import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesCreateWithoutRolesInputSchema } from './users_rolesCreateWithoutRolesInputSchema';
import { users_rolesUncheckedCreateWithoutRolesInputSchema } from './users_rolesUncheckedCreateWithoutRolesInputSchema';

export const users_rolesCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export default users_rolesCreateOrConnectWithoutRolesInputSchema;
