import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema';

export const permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema;
