import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersCreateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersCreateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema';

export const usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
}).strict();

export default usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema;
