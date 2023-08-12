import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesUpdateWithoutRoles_permissionsInputSchema } from './rolesUpdateWithoutRoles_permissionsInputSchema';
import { rolesUncheckedUpdateWithoutRoles_permissionsInputSchema } from './rolesUncheckedUpdateWithoutRoles_permissionsInputSchema';
import { rolesCreateWithoutRoles_permissionsInputSchema } from './rolesCreateWithoutRoles_permissionsInputSchema';
import { rolesUncheckedCreateWithoutRoles_permissionsInputSchema } from './rolesUncheckedCreateWithoutRoles_permissionsInputSchema';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';

export const rolesUpsertWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUpsertWithoutRoles_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => rolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
  where: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export default rolesUpsertWithoutRoles_permissionsInputSchema;
