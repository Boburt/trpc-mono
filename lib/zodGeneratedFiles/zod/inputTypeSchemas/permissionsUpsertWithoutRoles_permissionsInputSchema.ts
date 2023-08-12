import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsUpdateWithoutRoles_permissionsInputSchema } from './permissionsUpdateWithoutRoles_permissionsInputSchema';
import { permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema } from './permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema';
import { permissionsCreateWithoutRoles_permissionsInputSchema } from './permissionsCreateWithoutRoles_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutRoles_permissionsInputSchema } from './permissionsUncheckedCreateWithoutRoles_permissionsInputSchema';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';

export const permissionsUpsertWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUpsertWithoutRoles_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => permissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
  where: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export default permissionsUpsertWithoutRoles_permissionsInputSchema;
