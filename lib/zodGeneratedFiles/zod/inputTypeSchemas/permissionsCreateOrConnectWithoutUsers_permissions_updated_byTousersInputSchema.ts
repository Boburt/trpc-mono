import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema';

export const permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema;
