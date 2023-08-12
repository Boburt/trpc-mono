import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { usersOrderByWithRelationInputSchema } from './usersOrderByWithRelationInputSchema';
import { roles_permissionsOrderByRelationAggregateInputSchema } from './roles_permissionsOrderByRelationAggregateInputSchema';
import { users_rolesOrderByRelationAggregateInputSchema } from './users_rolesOrderByRelationAggregateInputSchema';

export const rolesOrderByWithRelationInputSchema: z.ZodType<Prisma.rolesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_roles_created_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_roles_updated_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_roles: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export default rolesOrderByWithRelationInputSchema;
