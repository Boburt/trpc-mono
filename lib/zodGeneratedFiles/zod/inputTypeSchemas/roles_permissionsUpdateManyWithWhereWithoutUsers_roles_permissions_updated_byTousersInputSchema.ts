import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsScalarWhereInputSchema } from './roles_permissionsScalarWhereInputSchema';
import { roles_permissionsUpdateManyMutationInputSchema } from './roles_permissionsUpdateManyMutationInputSchema';
import { roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => roles_permissionsUpdateManyMutationInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateManyWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_updated_byTousersInputSchema;
