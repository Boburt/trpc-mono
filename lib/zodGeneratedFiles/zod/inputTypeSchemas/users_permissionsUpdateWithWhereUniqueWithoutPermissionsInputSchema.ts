import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithoutPermissionsInputSchema } from './users_permissionsUpdateWithoutPermissionsInputSchema';
import { users_permissionsUncheckedUpdateWithoutPermissionsInputSchema } from './users_permissionsUncheckedUpdateWithoutPermissionsInputSchema';

export const users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export default users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema;
