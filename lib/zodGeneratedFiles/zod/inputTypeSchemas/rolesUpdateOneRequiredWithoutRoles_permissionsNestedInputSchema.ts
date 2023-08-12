import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateWithoutRoles_permissionsInputSchema } from './rolesCreateWithoutRoles_permissionsInputSchema';
import { rolesUncheckedCreateWithoutRoles_permissionsInputSchema } from './rolesUncheckedCreateWithoutRoles_permissionsInputSchema';
import { rolesCreateOrConnectWithoutRoles_permissionsInputSchema } from './rolesCreateOrConnectWithoutRoles_permissionsInputSchema';
import { rolesUpsertWithoutRoles_permissionsInputSchema } from './rolesUpsertWithoutRoles_permissionsInputSchema';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema } from './rolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema';
import { rolesUpdateWithoutRoles_permissionsInputSchema } from './rolesUpdateWithoutRoles_permissionsInputSchema';
import { rolesUncheckedUpdateWithoutRoles_permissionsInputSchema } from './rolesUncheckedUpdateWithoutRoles_permissionsInputSchema';

export const rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema: z.ZodType<Prisma.rolesUpdateOneRequiredWithoutRoles_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedCreateWithoutRoles_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutRoles_permissionsInputSchema).optional(),
  upsert: z.lazy(() => rolesUpsertWithoutRoles_permissionsInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => rolesUpdateToOneWithWhereWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUpdateWithoutRoles_permissionsInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutRoles_permissionsInputSchema) ]).optional(),
}).strict();

export default rolesUpdateOneRequiredWithoutRoles_permissionsNestedInputSchema;
