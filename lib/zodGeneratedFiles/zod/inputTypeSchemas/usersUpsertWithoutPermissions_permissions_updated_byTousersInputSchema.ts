import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const usersUpsertWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default usersUpsertWithoutPermissions_permissions_updated_byTousersInputSchema;
