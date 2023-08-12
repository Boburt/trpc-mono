import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema';
import { usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema';

export const usersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutPermissions_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutPermissions_permissions_updated_byTousersInputSchema;
