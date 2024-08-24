export const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;
export const manufacturerSchema = {
    name: indexManufacturers,
    fields: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'short_name', type: 'string', optional: true },
        { name: 'description', type: 'string', optional: true },
        { name: 'active', type: 'bool' },
        { name: 'rating', type: 'float', optional: true, facet: true },
        { name: 'country', type: 'string', optional: true, facet: true },
        { name: 'type', type: 'string' },
        { name: 'org_type', type: 'string', optional: true },
        { name: 'city', type: 'string', optional: true, facet: true },
        { name: 'ein', type: 'int32', optional: true },
        { name: 'address', type: 'string', optional: true },
        { name: 'fact_address', type: 'string', optional: true },
        { name: 'email', type: 'string', optional: true },
        { name: 'web_site', type: 'string', optional: true },
        { name: 'vat', type: 'bool' },
        { name: 'verified', type: 'bool' },
        { name: 'verified_date', type: 'int64', optional: true },
        { name: 'created_at', type: 'string' },
        { name: 'updated_at', type: 'string' },
        { name: 'created_at_timestamp', type: 'int64' }, // New sortable field
        { name: 'updated_at_timestamp', type: 'int64' }, // New sortable field
        { name: 'capacity', type: 'string[]', facet: true },
        { name: 'staff_count', type: 'int32', facet: true },
        { name: 'certificates', type: 'string[]', facet: true },
    ],
    default_sorting_field: 'created_at_timestamp'
};

export type TypesenseManufacturer = {
    id: string;
    name: string;
    short_name?: string;
    description?: string;
    active: boolean;
    rating?: number;
    country?: string;
    type: string;
    org_type?: string;
    city?: string;
    ein?: number;
    address?: string;
    fact_address?: string;
    email?: string;
    web_site?: string;
    vat: boolean;
    verified: boolean;
    verified_date?: number;
    created_at: string;
    updated_at: string;
    created_at_timestamp: number;
    updated_at_timestamp: number;
    capacity: string[];
    staff_count: number;
    certificates: string[];
};

export type TypesenseManufacturerWithRelations = TypesenseManufacturer & {
    images: {
        path: string;
        code: string;
    }[];
}