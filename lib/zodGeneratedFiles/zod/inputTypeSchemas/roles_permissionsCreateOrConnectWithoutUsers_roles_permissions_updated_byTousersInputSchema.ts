import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema';
import { roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema;
