import { manufacturers } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type PublicManufacturer = InferSelectModel<typeof manufacturers> & {
  images?: {
    path: string;
    code: string;
  }[];
};
