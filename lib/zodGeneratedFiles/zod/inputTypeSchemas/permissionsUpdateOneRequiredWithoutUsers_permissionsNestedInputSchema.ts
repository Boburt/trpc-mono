import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateWithoutUsers_permissionsInputSchema } from './permissionsCreateWithoutUsers_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissionsInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissionsInputSchema';
import { permissionsCreateOrConnectWithoutUsers_permissionsInputSchema } from './permissionsCreateOrConnectWithoutUsers_permissionsInputSchema';
import { permissionsUpsertWithoutUsers_permissionsInputSchema } from './permissionsUpsertWithoutUsers_permissionsInputSchema';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema } from './permissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema';
import { permissionsUpdateWithoutUsers_permissionsInputSchema } from './permissionsUpdateWithoutUsers_permissionsInputSchema';
import { permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema } from './permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema';

export const permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema: z.ZodType<Prisma.permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissionsInputSchema).optional(),
  upsert: z.lazy(() => permissionsUpsertWithoutUsers_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateToOneWithWhereWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUpdateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutUsers_permissionsInputSchema) ]).optional(),
}).strict();

export default permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema;
