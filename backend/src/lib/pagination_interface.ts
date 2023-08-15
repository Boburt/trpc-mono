import type { PageNumberPaginationMeta } from "prisma-extension-pagination";
import { PageNumberCounters } from "prisma-extension-pagination/dist/types";

export type PaginationType<T> = {
  items: T[];
  meta: PageNumberPaginationMeta & PageNumberCounters;
};
