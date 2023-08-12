import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateWithoutRoles_permissionsInputSchema } from './permissionsCreateWithoutRoles_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutRoles_permissionsInputSchema } from './permissionsUncheckedCreateWithoutRoles_permissionsInputSchema';
import { permissionsCreateOrConnectWithoutRoles_permissionsInputSchema } from './permissionsCreateOrConnectWithoutRoles_permissionsInputSchema';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';

export const permissionsCreateNestedOneWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateNestedOneWithoutRoles_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional()
}).strict();

export default permissionsCreateNestedOneWithoutRoles_permissionsInputSchema;
