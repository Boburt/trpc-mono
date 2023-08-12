import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema';

export const roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedUpdateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export default roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema;
