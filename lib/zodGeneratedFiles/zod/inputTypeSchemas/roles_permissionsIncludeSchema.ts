import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { permissionsArgsSchema } from "../outputTypeSchemas/permissionsArgsSchema"
import { rolesArgsSchema } from "../outputTypeSchemas/rolesArgsSchema"

export const roles_permissionsIncludeSchema: z.ZodType<Prisma.roles_permissionsInclude> = z.object({
  users_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  users_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export default roles_permissionsIncludeSchema;
