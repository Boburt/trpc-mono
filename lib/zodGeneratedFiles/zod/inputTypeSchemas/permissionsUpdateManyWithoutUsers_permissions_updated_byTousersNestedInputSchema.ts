import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema } from './permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema';
import { permissionsWhereUniqueInputSchema } from './permissionsWhereUniqueInputSchema';
import { permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema } from './permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema';
import { permissionsScalarWhereInputSchema } from './permissionsScalarWhereInputSchema';

export const permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateWithoutUsers_permissions_updated_byTousersInputSchema).array(),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUncheckedCreateWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateOrConnectWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpsertWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => permissionsWhereUniqueInputSchema),z.lazy(() => permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpdateWithWhereUniqueWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsUpdateManyWithWhereWithoutUsers_permissions_updated_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => permissionsScalarWhereInputSchema),z.lazy(() => permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default permissionsUpdateManyWithoutUsers_permissions_updated_byTousersNestedInputSchema;