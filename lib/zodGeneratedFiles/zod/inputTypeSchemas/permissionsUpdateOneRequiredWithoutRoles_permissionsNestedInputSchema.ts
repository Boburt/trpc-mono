import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateWithoutRoles_permissionsInputSchema } from './permissionsCreateWithoutRoles_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutRoles_permissionsInputSchema } from './permissionsUncheckedCreateWithoutRoles_permissionsInputSchema';
import { permissionsCreateOrConnectWithoutRoles_permissionsInputSchema } from './permissionsCreateOrConnectWithoutRoles_permissionsInputSchema';
import { permissionsUpsertWithoutRoles_permissionsInputSchema } from './permissionsUpsertWithoutRoles_permissionsInputSchema';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema } from './permissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema';
import { permissionsUpdateWithoutRoles_permissionsInputSchema } from './permissionsUpdateWithoutRoles_permissionsInputSchema';
import { permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema } from './permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema';

export const permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema: z.ZodType<Prisma.permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  upsert: z.lazy(() => permissionsUpsertWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateToOneWithWhereWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedUpdateWithoutRoles_permissionsInputSchema) ]).optional(),
}).strict();

export default permissionsUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema;
