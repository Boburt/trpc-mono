import { z } from 'zod';

export const UsersScalarFieldEnumSchema = z.enum(['id','phone','first_name','last_name','password','is_super_user','status','card_name','card_number','birth_date','car_model','car_number','is_online','latitude','longitude','fcm_token','wallet_balance','max_active_order_count','doc_files','order_start_date','app_version','created_at','updated_at','api_token','tg_id']);

export default UsersScalarFieldEnumSchema;
