import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsScalarWhereInputSchema } from './users_permissionsScalarWhereInputSchema';
import { users_permissionsUpdateManyMutationInputSchema } from './users_permissionsUpdateManyMutationInputSchema';
import { users_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema } from './users_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema';

export const users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateManyMutationInputSchema),z.lazy(() => users_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export default users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema;
