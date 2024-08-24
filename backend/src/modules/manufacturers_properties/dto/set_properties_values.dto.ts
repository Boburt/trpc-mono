import { z } from "zod";

export const SetPropertiesValuesDto = z.object({
  manufacturerId: z.string(),
  properties: z.array(
    z.object({
      propertyId: z.string(),
      value: z.string().or(z.number()),
    })
  ),
});
