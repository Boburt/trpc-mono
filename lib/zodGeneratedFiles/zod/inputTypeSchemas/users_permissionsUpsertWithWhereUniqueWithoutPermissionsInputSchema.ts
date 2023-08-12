import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithoutPermissionsInputSchema } from './users_permissionsUpdateWithoutPermissionsInputSchema';
import { users_permissionsUncheckedUpdateWithoutPermissionsInputSchema } from './users_permissionsUncheckedUpdateWithoutPermissionsInputSchema';
import { users_permissionsCreateWithoutPermissionsInputSchema } from './users_permissionsCreateWithoutPermissionsInputSchema';
import { users_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './users_permissionsUncheckedCreateWithoutPermissionsInputSchema';

export const users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export default users_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema;
