import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema;
