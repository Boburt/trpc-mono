import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithoutRolesInputSchema } from './roles_permissionsUpdateWithoutRolesInputSchema';
import { roles_permissionsUncheckedUpdateWithoutRolesInputSchema } from './roles_permissionsUncheckedUpdateWithoutRolesInputSchema';

export const roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export default roles_permissionsUpdateWithWhereUniqueWithoutRolesInputSchema;
