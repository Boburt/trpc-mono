import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema';
import { roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_updated_byTousersInputSchema;
