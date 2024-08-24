import { z } from "zod";

/**
 * A Zod object schema representing a paginated response.
 * @property {number} [skip] - The number of items to skip.
 * @property {number} [take] - The number of items to take.
 * @property {string} [cursor] - The cursor to use for pagination.
 */
export const paginatedZodObj = z.object({
  skip: z.number().optional(),
  take: z.number().optional(),
  cursor: z.string().optional(),
});
