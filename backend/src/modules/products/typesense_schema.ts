export const indexProducts = `${process.env.PROJECT_PREFIX}products`;
export const productSchema = {
    name: indexProducts,
    fields: [
        { name: 'id', type: "string" },
        { name: 'manufacturer_id', type: "string" },
        { name: 'manufacturer_name', type: "string", facet: true },
        { name: 'name', type: "string" },
        { name: 'description', type: "string" },
        { name: 'active', type: 'bool' },
        { name: 'price_rub', type: 'float', facet: true },
        { name: 'price_usd', type: 'float', facet: true },
        { name: 'stock_quantity', type: 'int32' },
        { name: 'created_at', type: 'string' },
        { name: 'updated_at', type: 'string' },
        { name: 'created_at_timestamp', type: 'int64' }, // New sortable field
        { name: 'updated_at_timestamp', type: 'int64' }, // New sortable field
        { name: 'category', type: "string" },
        { name: 'category_id', type: "string" },
        { name: 'properties', type: 'string[]', facet: true },
    ],
    default_sorting_field: 'created_at_timestamp',
    enable_nested_fields: true
};

export type TypesenseProduct = {
    id: string;
    manufacturer_id: string;
    manufacturer_name: string;
    name: string;
    description: string;
    active: boolean;
    price_rub: number;
    price_usd: number;
    stock_quantity: number;
    created_at: string;
    updated_at: string;
    created_at_timestamp: number;
    updated_at_timestamp: number;
    category: string;
    category_id: string;
    properties: string[];
};

export type TypesenseProductWithRelations = TypesenseProduct & {
    images: {
        path: string;
        code: string;
    }[];
};