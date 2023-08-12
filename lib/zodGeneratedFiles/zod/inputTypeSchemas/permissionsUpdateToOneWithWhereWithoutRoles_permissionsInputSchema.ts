import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';
import { permissionsUpdateWithoutRoles_permissionsInputSchema } from './permissionsUpdateWithoutRoles_permissionsInputSchema';
import { permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema } from './permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema';

export const permissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUpdateToOneWithWhereWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => permissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export default permissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema;
