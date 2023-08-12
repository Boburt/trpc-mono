import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesUpdateWithoutRolesInputSchema } from './users_rolesUpdateWithoutRolesInputSchema';
import { users_rolesUncheckedUpdateWithoutRolesInputSchema } from './users_rolesUncheckedUpdateWithoutRolesInputSchema';
import { users_rolesCreateWithoutRolesInputSchema } from './users_rolesCreateWithoutRolesInputSchema';
import { users_rolesUncheckedCreateWithoutRolesInputSchema } from './users_rolesUncheckedCreateWithoutRolesInputSchema';

export const users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_rolesUpdateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export default users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema;
