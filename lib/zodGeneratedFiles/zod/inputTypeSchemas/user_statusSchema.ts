import { z } from 'zod';

export const user_statusSchema = z.enum(['active','blocked','inactive']);

export type user_statusType = `${z.infer<typeof user_statusSchema>}`

export default user_statusSchema;
