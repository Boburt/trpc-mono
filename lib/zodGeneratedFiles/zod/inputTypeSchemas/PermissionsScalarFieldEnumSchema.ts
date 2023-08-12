import { z } from 'zod';

export const PermissionsScalarFieldEnumSchema = z.enum(['id','slug','description','active','created_at','updated_at','created_by','updated_by']);

export default PermissionsScalarFieldEnumSchema;
