import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema } from './users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesScalarWhereInputSchema } from './users_rolesScalarWhereInputSchema';

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byNestedInputSchema;
