import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesScalarWhereInputSchema } from './users_rolesScalarWhereInputSchema';
import { users_rolesUpdateManyMutationInputSchema } from './users_rolesUpdateManyMutationInputSchema';
import { users_rolesUncheckedUpdateManyWithoutRolesInputSchema } from './users_rolesUncheckedUpdateManyWithoutRolesInputSchema';

export const users_rolesUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateManyMutationInputSchema),z.lazy(() => users_rolesUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export default users_rolesUpdateManyWithWhereWithoutRolesInputSchema;
