import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateWithoutPermissionsInputSchema } from './roles_permissionsCreateWithoutPermissionsInputSchema';
import { roles_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './roles_permissionsUncheckedCreateWithoutPermissionsInputSchema';
import { roles_permissionsCreateOrConnectWithoutPermissionsInputSchema } from './roles_permissionsCreateOrConnectWithoutPermissionsInputSchema';
import { roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema } from './roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema';
import { roles_permissionsCreateManyPermissionsInputEnvelopeSchema } from './roles_permissionsCreateManyPermissionsInputEnvelopeSchema';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema } from './roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema';
import { roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema } from './roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema';
import { roles_permissionsScalarWhereInputSchema } from './roles_permissionsScalarWhereInputSchema';

export const roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default roles_permissionsUpdateManyWithoutPermissionsNestedInputSchema;
