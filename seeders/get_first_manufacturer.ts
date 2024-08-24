
import { drizzleDb } from '@backend/lib/db';
import { profiles } from 'backend/drizzle/schema';
import { eq } from 'drizzle-orm';

const manufacturer = await drizzleDb.query.memberships.findFirst();
const manufacturerProfile = await drizzleDb.select({
    field_name: profiles.field_name,
    field_value: profiles.field_value,
}).from(profiles).where(eq(
    profiles.references_id, manufacturer.id,
)).execute();

console.log('manufacturer', {
    ...manufacturer,
    profiles: manufacturerProfile,
});