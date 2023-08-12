import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsCreateWithoutUsers_permissionsInputSchema } from './permissionsCreateWithoutUsers_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissionsInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissionsInputSchema';

export const permissionsCreateOrConnectWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateOrConnectWithoutUsers_permissionsInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]),
}).strict();

export default permissionsCreateOrConnectWithoutUsers_permissionsInputSchema;
