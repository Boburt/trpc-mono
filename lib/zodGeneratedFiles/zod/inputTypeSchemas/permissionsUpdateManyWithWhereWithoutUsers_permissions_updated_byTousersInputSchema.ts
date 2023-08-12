import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsScalarWhereInputSchema } from './permissionsScalarWhereInputSchema';
import { permissionsUpdateManyMutationInputSchema } from './permissionsUpdateManyMutationInputSchema';
import { permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInputSchema';

export const permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => permissionsUpdateManyMutationInputSchema),z.lazy(() => permissionsUncheckedUpdateManyWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema;
