import { z } from 'zod';

export const Roles_permissionsScalarFieldEnumSchema = z.enum(['role_id','permission_id','created_by','updated_by']);

export default Roles_permissionsScalarFieldEnumSchema;
