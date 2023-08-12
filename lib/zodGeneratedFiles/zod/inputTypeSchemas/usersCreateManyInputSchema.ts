import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { user_statusSchema } from './user_statusSchema';
import { usersCreatedoc_filesInputSchema } from './usersCreatedoc_filesInputSchema';

export const usersCreateManyInputSchema: z.ZodType<Prisma.usersCreateManyInput> = z.object({
  id: z.string().optional(),
  phone: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  is_super_user: z.boolean().optional(),
  status: z.lazy(() => user_statusSchema),
  card_name: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  car_model: z.string().optional().nullable(),
  car_number: z.string().optional().nullable(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  fcm_token: z.string().optional().nullable(),
  wallet_balance: z.number().optional(),
  max_active_order_count: z.number().int().optional().nullable(),
  doc_files: z.union([ z.lazy(() => usersCreatedoc_filesInputSchema),z.string().array() ]).optional(),
  order_start_date: z.coerce.date().optional().nullable(),
  app_version: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  api_token: z.string().optional().nullable(),
  tg_id: z.string().optional().nullable()
}).strict();

export default usersCreateManyInputSchema;
