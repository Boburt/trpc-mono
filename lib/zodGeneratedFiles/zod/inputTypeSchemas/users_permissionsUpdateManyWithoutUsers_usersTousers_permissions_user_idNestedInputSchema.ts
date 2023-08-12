import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema } from './users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsScalarWhereInputSchema } from './users_permissionsScalarWhereInputSchema';

export const users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_user_idNestedInputSchema;
