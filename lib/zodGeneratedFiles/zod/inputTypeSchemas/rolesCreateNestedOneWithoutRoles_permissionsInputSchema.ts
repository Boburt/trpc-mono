import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateWithoutRoles_permissionsInputSchema } from './rolesCreateWithoutRoles_permissionsInputSchema';
import { rolesUncheckedCreateWithoutRoles_permissionsInputSchema } from './rolesUncheckedCreateWithoutRoles_permissionsInputSchema';
import { rolesCreateOrConnectWithoutRoles_permissionsInputSchema } from './rolesCreateOrConnectWithoutRoles_permissionsInputSchema';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';

export const rolesCreateNestedOneWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesCreateNestedOneWithoutRoles_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional()
}).strict();

export default rolesCreateNestedOneWithoutRoles_permissionsInputSchema;
