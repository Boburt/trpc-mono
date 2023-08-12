import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersCreateWithoutRoles_roles_created_byTousersInputSchema } from './usersCreateWithoutRoles_roles_created_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema';

export const usersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutRoles_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]),
}).strict();

export default usersCreateOrConnectWithoutRoles_roles_created_byTousersInputSchema;
