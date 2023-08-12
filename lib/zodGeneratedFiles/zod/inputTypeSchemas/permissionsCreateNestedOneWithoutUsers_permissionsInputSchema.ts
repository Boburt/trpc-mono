import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateWithoutUsers_permissionsInputSchema } from './permissionsCreateWithoutUsers_permissionsInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissionsInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissionsInputSchema';
import { permissionsCreateOrConnectWithoutUsers_permissionsInputSchema } from './permissionsCreateOrConnectWithoutUsers_permissionsInputSchema';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';

export const permissionsCreateNestedOneWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateNestedOneWithoutUsers_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissionsInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissionsInputSchema).optional(),
  connect: z.lazy(() => permissionsWhereUniqueInputSchema).optional()
}).strict();

export default permissionsCreateNestedOneWithoutUsers_permissionsInputSchema;
