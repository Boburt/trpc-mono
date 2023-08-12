import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateWithoutRolesInputSchema } from './users_rolesCreateWithoutRolesInputSchema';
import { users_rolesUncheckedCreateWithoutRolesInputSchema } from './users_rolesUncheckedCreateWithoutRolesInputSchema';
import { users_rolesCreateOrConnectWithoutRolesInputSchema } from './users_rolesCreateOrConnectWithoutRolesInputSchema';
import { users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema } from './users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema';
import { users_rolesCreateManyRolesInputEnvelopeSchema } from './users_rolesCreateManyRolesInputEnvelopeSchema';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema } from './users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema';
import { users_rolesUpdateManyWithWhereWithoutRolesInputSchema } from './users_rolesUpdateManyWithWhereWithoutRolesInputSchema';
import { users_rolesScalarWhereInputSchema } from './users_rolesScalarWhereInputSchema';

export const users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default users_rolesUncheckedUpdateManyWithoutRolesNestedInputSchema;
