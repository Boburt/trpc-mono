import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsScalarWhereInputSchema } from './roles_permissionsScalarWhereInputSchema';
import { roles_permissionsUpdateManyMutationInputSchema } from './roles_permissionsUpdateManyMutationInputSchema';
import { roles_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema } from './roles_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema';

export const roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export default roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema;
