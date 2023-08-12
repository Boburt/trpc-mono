import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema } from './users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesScalarWhereInputSchema } from './users_rolesScalarWhereInputSchema';

export const users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpsertWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_user_idNestedInputSchema;
