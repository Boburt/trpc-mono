import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateWithoutPermissionsInputSchema } from './users_permissionsCreateWithoutPermissionsInputSchema';
import { users_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './users_permissionsUncheckedCreateWithoutPermissionsInputSchema';
import { users_permissionsCreateOrConnectWithoutPermissionsInputSchema } from './users_permissionsCreateOrConnectWithoutPermissionsInputSchema';
import { users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema } from './users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema';
import { users_permissionsCreateManyPermissionsInputEnvelopeSchema } from './users_permissionsCreateManyPermissionsInputEnvelopeSchema';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema } from './users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema';
import { users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema } from './users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema';
import { users_permissionsScalarWhereInputSchema } from './users_permissionsScalarWhereInputSchema';

export const users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default users_permissionsUncheckedUpdateManyWithoutPermissionsNestedInputSchema;
