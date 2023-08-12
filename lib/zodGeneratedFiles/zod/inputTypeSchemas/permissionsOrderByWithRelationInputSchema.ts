import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { usersOrderByWithRelationInputSchema } from './usersOrderByWithRelationInputSchema';
import { roles_permissionsOrderByRelationAggregateInputSchema } from './roles_permissionsOrderByRelationAggregateInputSchema';
import { users_permissionsOrderByRelationAggregateInputSchema } from './users_permissionsOrderByRelationAggregateInputSchema';

export const permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.permissionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_permissions_created_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional()
}).strict();

export default permissionsOrderByWithRelationInputSchema;
