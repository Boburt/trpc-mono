import { z } from 'zod';

export const RolesScalarFieldEnumSchema = z.enum(['id','name','code','active','created_at','updated_at','created_by','updated_by']);

export default RolesScalarFieldEnumSchema;
