import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersUpsertWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersUpsertWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';
import { usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema } from './usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema';

export const usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_roles_usersTousers_roles_created_byInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_created_byInputSchema) ]).optional(),
}).strict();

export default usersUpdateOneWithoutUsers_roles_usersTousers_roles_created_byNestedInputSchema;
