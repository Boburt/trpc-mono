import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';

export const usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]).optional(),
}).strict();

export default usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema;