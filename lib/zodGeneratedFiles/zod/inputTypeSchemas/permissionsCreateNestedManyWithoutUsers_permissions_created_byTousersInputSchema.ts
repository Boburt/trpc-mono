import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema';
import { permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema } from './permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema';
import { permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema } from './permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';

export const permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default permissionsCreateNestedManyWithoutUsers_permissions_created_byTousersInputSchema;
