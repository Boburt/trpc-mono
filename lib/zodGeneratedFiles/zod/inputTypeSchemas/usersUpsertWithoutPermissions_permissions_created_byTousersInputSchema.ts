import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersCreateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersCreateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const usersUpsertWithoutPermissions_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutPermissions_permissions_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default usersUpsertWithoutPermissions_permissions_created_byTousersInputSchema;
