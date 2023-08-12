import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema } from './permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';

export const permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default permissionsCreateNestedManyWithoutUsers_permissions_updated_byTousersInputSchema;
