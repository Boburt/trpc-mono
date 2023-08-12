import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { roles_permissionsFindManyArgsSchema } from "../outputTypeSchemas/roles_permissionsFindManyArgsSchema"
import { users_rolesFindManyArgsSchema } from "../outputTypeSchemas/users_rolesFindManyArgsSchema"
import { RolesCountOutputTypeArgsSchema } from "../outputTypeSchemas/RolesCountOutputTypeArgsSchema"

export const rolesIncludeSchema: z.ZodType<Prisma.rolesInclude> = z.object({
  users_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_roles: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default rolesIncludeSchema;
