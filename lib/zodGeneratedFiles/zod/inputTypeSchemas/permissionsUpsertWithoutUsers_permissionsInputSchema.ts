import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsUpdateWithoutUsers_permissionsInputSchema } from './permissionsUpdateWithoutUsers_permissionsInputSchema';
import { permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema } from './permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema';
import { permissionsCreateWithoutUsers_permissionsInputSchema } from './permissionsCreateWithoutUsers_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissionsInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissionsInputSchema';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';

export const permissionsUpsertWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUpsertWithoutUsers_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]),
  where: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export default permissionsUpsertWithoutUsers_permissionsInputSchema;
