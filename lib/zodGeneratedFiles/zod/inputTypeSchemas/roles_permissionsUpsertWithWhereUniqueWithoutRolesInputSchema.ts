import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithoutRolesInputSchema } from './roles_permissionsUpdateWithoutRolesInputSchema';
import { roles_permissionsUncheckedUpdateWithoutRolesInputSchema } from './roles_permissionsUncheckedUpdateWithoutRolesInputSchema';
import { roles_permissionsCreateWithoutRolesInputSchema } from './roles_permissionsCreateWithoutRolesInputSchema';
import { roles_permissionsUncheckedCreateWithoutRolesInputSchema } from './roles_permissionsUncheckedCreateWithoutRolesInputSchema';

export const roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export default roles_permissionsUpsertWithWhereUniqueWithoutRolesInputSchema;
