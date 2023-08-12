import { z } from 'zod';

export const Users_permissionsScalarFieldEnumSchema = z.enum(['user_id','permission_id','created_by','updated_by']);

export default Users_permissionsScalarFieldEnumSchema;
