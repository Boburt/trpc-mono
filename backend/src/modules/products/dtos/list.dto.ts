import { assets, manufacturers, products } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type ProductsWithRelations = InferSelectModel<typeof products> & {
    manufacturers: InferSelectModel<typeof manufacturers>;
    images: {
        path: string;
        code: string;
    }[];
}