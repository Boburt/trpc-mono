import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';
import { UsersNullableRelationFilterSchema } from './UsersNullableRelationFilterSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { PermissionsRelationFilterSchema } from './PermissionsRelationFilterSchema';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';
import { RolesRelationFilterSchema } from './RolesRelationFilterSchema';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';

export const roles_permissionsWhereInputSchema: z.ZodType<Prisma.roles_permissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => roles_permissionsWhereInputSchema),z.lazy(() => roles_permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => roles_permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => roles_permissionsWhereInputSchema),z.lazy(() => roles_permissionsWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => PermissionsRelationFilterSchema),z.lazy(() => permissionsWhereInputSchema) ]).optional(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  users_roles_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
}).strict();

export default roles_permissionsWhereInputSchema;
