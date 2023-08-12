import { z } from 'zod';

export const Users_rolesScalarFieldEnumSchema = z.enum(['user_id','role_id','created_by','updated_by']);

export default Users_rolesScalarFieldEnumSchema;
