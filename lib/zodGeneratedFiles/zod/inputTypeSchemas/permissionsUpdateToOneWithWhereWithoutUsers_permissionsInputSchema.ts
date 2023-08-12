import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';
import { permissionsUpdateWithoutUsers_permissionsInputSchema } from './permissionsUpdateWithoutUsers_permissionsInputSchema';
import { permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema } from './permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema';

export const permissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUpdateToOneWithWhereWithoutUsers_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]),
}).strict();

export default permissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema;
