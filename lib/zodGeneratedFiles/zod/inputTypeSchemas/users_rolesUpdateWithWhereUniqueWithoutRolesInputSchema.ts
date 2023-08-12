import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesUpdateWithoutRolesInputSchema } from './users_rolesUpdateWithoutRolesInputSchema';
import { users_rolesUncheckedUpdateWithoutRolesInputSchema } from './users_rolesUncheckedUpdateWithoutRolesInputSchema';

export const users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export default users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema;
