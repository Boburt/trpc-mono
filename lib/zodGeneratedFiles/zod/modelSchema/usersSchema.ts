import { z } from 'zod';
import { user_statusSchema } from '../inputTypeSchemas/user_statusSchema'

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const usersSchema = z.object({
  status: user_statusSchema,
  id: z.string(),
  phone: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  password: z.string().nullish(),
  is_super_user: z.boolean(),
  card_name: z.string().nullish(),
  card_number: z.string().nullish(),
  birth_date: z.coerce.date().nullish(),
  car_model: z.string().nullish(),
  car_number: z.string().nullish(),
  is_online: z.boolean(),
  latitude: z.number(),
  longitude: z.number(),
  fcm_token: z.string().nullish(),
  wallet_balance: z.number(),
  max_active_order_count: z.number().int().nullish(),
  doc_files: z.string().array(),
  order_start_date: z.coerce.date().nullish(),
  app_version: z.string().nullish(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  api_token: z.string().nullish(),
  tg_id: z.string().nullish(),
})

export type users = z.infer<typeof usersSchema>

/////////////////////////////////////////
// USERS PARTIAL SCHEMA
/////////////////////////////////////////

export const usersPartialSchema = usersSchema.partial()

export type usersPartial = z.infer<typeof usersPartialSchema>

/////////////////////////////////////////
// USERS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const usersOptionalDefaultsSchema = usersSchema.merge(z.object({
  id: z.string().optional(),
  is_super_user: z.boolean().optional(),
  is_online: z.boolean().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  wallet_balance: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type usersOptionalDefaults = z.infer<typeof usersOptionalDefaultsSchema>

export default usersSchema;
