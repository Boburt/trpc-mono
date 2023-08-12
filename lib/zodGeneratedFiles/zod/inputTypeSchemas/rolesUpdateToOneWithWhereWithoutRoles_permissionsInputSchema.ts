import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';
import { rolesUpdateWithoutRoles_permissionsInputSchema } from './rolesUpdateWithoutRoles_permissionsInputSchema';
import { rolesUncheckedUpdateWithoutRoles_permissionsInputSchema } from './rolesUncheckedUpdateWithoutRoles_permissionsInputSchema';

export const rolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.rolesUpdateToOneWithWhereWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => rolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => rolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export default rolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema;
