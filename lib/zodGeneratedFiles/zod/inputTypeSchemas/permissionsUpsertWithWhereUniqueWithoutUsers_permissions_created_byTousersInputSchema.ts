import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema';
import { permissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema';
import { permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema';

export const permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => permissionsUpdateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema) ]),
}).strict();

export default permissionsUpsertWithWhereUniqueWithoutUsers_permissions_created_byTousersInputSchema;
