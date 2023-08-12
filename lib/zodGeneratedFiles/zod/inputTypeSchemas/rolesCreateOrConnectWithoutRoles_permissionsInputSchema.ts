import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesCreateWithoutRoles_permissionsInputSchema } from './rolesCreateWithoutRoles_permissionsInputSchema';
import { rolesUncheckedCreateWithoutRoles_permissionsInputSchema } from './rolesUncheckedCreateWithoutRoles_permissionsInputSchema';

export const rolesCreateOrConnectWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export default rolesCreateOrConnectWithoutRoles_permissionsInputSchema;
