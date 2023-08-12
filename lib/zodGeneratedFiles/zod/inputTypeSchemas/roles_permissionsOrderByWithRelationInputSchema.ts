import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { usersOrderByWithRelationInputSchema } from './usersOrderByWithRelationInputSchema';
import { permissionsOrderByWithRelationInputSchema } from './permissionsOrderByWithRelationInputSchema';
import { rolesOrderByWithRelationInputSchema } from './rolesOrderByWithRelationInputSchema';

export const roles_permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.roles_permissionsOrderByWithRelationInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_roles_permissions_created_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  permissions: z.lazy(() => permissionsOrderByWithRelationInputSchema).optional(),
  roles: z.lazy(() => rolesOrderByWithRelationInputSchema).optional(),
  users_roles_permissions_updated_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional()
}).strict();

export default roles_permissionsOrderByWithRelationInputSchema;
