import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateWithoutRolesInputSchema } from './roles_permissionsCreateWithoutRolesInputSchema';
import { roles_permissionsUncheckedCreateWithoutRolesInputSchema } from './roles_permissionsUncheckedCreateWithoutRolesInputSchema';
import { roles_permissionsCreateOrConnectWithoutRolesInputSchema } from './roles_permissionsCreateOrConnectWithoutRolesInputSchema';
import { roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema } from './roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema';
import { roles_permissionsCreateManyRolesInputEnvelopeSchema } from './roles_permissionsCreateManyRolesInputEnvelopeSchema';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema } from './roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema';
import { roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema } from './roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema';
import { roles_permissionsScalarWhereInputSchema } from './roles_permissionsScalarWhereInputSchema';

export const roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default roles_permissionsUncheckedUpdateManyWithoutRolesNestedInputSchema;
