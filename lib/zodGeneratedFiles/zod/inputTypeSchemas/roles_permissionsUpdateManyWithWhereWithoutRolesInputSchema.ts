import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsScalarWhereInputSchema } from './roles_permissionsScalarWhereInputSchema';
import { roles_permissionsUpdateManyMutationInputSchema } from './roles_permissionsUpdateManyMutationInputSchema';
import { roles_permissionsUncheckedUpdateManyWithoutRolesInputSchema } from './roles_permissionsUncheckedUpdateManyWithoutRolesInputSchema';

export const roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export default roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema;
