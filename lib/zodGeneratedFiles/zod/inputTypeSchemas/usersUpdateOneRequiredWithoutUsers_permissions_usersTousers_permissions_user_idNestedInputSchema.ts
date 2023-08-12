import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';
import { usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';

export const usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema: z.ZodType<Prisma.usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema) ]).optional(),
}).strict();

export default usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema;
