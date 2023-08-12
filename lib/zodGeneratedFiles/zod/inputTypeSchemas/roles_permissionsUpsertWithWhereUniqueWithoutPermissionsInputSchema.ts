import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithoutPermissionsInputSchema } from './roles_permissionsUpdateWithoutPermissionsInputSchema';
import { roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema } from './roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema';
import { roles_permissionsCreateWithoutPermissionsInputSchema } from './roles_permissionsCreateWithoutPermissionsInputSchema';
import { roles_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './roles_permissionsUncheckedCreateWithoutPermissionsInputSchema';

export const roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export default roles_permissionsUpsertWithWhereUniqueWithoutPermissionsInputSchema;
