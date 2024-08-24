import { assets, manufacturers, products } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type ProductsWithRelations = InferSelectModel<typeof products> & {
    // manufacturers: InferSelectModel<typeof manufacturers> | null;
    images: {
        path: string;
        code: string;
    }[];
    // properties: {
    //     name: string | null;
    //     value: string;
    //     id: string;
    // }[]
}