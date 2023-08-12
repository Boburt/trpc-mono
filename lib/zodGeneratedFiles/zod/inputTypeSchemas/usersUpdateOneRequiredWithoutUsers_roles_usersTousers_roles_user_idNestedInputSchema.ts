import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';
import { usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema } from './usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema';

export const usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema: z.ZodType<Prisma.usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutUsers_roles_usersTousers_roles_user_idInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_user_idInputSchema) ]).optional(),
}).strict();

export default usersUpdateOneRequiredWithoutUsers_roles_usersTousers_roles_user_idNestedInputSchema;
