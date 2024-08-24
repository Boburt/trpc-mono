import { categories } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type TreeCategoryDto = InferSelectModel<typeof categories> & {
    children: TreeCategoryDto[];
};