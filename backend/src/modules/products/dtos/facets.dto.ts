
export interface Facet {
    key: string;
    doc_count: number;
}

export interface PropertyValue extends Facet { }

export interface Property {
    key: string;
    values: PropertyValue[];
}

export interface PriceRange {
    min: number;
    max: number;
}

export interface FacetsResponse {
    properties: Property[];
    priceRange: PriceRange;
    manufacturers: Facet[];
}

export interface ElasticsearchAggregations {
    manufacturers: {
        buckets: Array<{
            key: string;
            doc_count: number;
        }>;
    };
    properties: {
        names: {
            buckets: Array<{
                key: string;
                values: {
                    buckets: Array<{
                        key: string;
                        doc_count: number;
                    }>;
                };
            }>;
        };
    };
    price_range: {
        min: number;
        max: number;
    };
}