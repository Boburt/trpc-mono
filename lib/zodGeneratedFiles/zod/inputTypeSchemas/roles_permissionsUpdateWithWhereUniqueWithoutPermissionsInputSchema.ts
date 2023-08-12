import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithoutPermissionsInputSchema } from './roles_permissionsUpdateWithoutPermissionsInputSchema';
import { roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema } from './roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema';

export const roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export default roles_permissionsUpdateWithWhereUniqueWithoutPermissionsInputSchema;
