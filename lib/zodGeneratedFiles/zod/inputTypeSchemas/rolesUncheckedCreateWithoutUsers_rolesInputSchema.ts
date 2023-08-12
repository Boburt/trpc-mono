import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema } from './roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema';

export const rolesUncheckedCreateWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUncheckedCreateWithoutUsers_rolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export default rolesUncheckedCreateWithoutUsers_rolesInputSchema;
