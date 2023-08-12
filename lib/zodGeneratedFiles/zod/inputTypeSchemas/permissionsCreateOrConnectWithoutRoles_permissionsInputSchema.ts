import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsCreateWithoutRoles_permissionsInputSchema } from './permissionsCreateWithoutRoles_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutRoles_permissionsInputSchema } from './permissionsUncheckedCreateWithoutRoles_permissionsInputSchema';

export const permissionsCreateOrConnectWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateOrConnectWithoutRoles_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionsCreateWithoutRoles_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutRoles_permissionsInputSchema) ]),
}).strict();

export default permissionsCreateOrConnectWithoutRoles_permissionsInputSchema;
