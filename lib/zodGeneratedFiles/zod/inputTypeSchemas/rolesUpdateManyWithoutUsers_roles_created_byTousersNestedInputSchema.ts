import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateWithoutUsers_roles_created_byTousersInputSchema } from './rolesCreateWithoutUsers_roles_created_byTousersInputSchema';
import { rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema } from './rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema';
import { rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema } from './rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema';
import { rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema } from './rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema';
import { rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema } from './rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema } from './rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema';
import { rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema } from './rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema';
import { rolesScalarWhereInputSchema } from './rolesScalarWhereInputSchema';

export const rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema: z.ZodType<Prisma.rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpsertWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpdateWithWhereUniqueWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rolesScalarWhereInputSchema),z.lazy(() => rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default rolesUpdateManyWithoutUsers_roles_created_byTousersNestedInputSchema;
