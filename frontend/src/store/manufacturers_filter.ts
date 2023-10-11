import { create } from "zustand";
import { RouterOutputs } from "../utils/trpc";
import {
  createQueryParams,
  removeQueryParams,
  replaceQueryParams,
} from "../utils/manufacturers_filter_fn";

interface IManufacturersFilterStore {
  facets: RouterOutputs["manufacturers"]["getFacetFilter"];
  values: {
    [key: string]: string[];
  };
  isValuesFilled: () => boolean;
  setValue: (key: string, value: string) => void;
  removeValue: (key: string, value: string) => void;
  resetValues: () => void;
}

export const useManufacturersFilterStore = create<IManufacturersFilterStore>(
  (set, get) => ({
    facets: [],
    values: {},
    isValuesFilled: () => {
      let values = get().values;
      let facets = get().facets;
      let filled = false;
      facets.forEach((f) => {
        if (values[f.code] && values[f.code].length > 0) {
          filled = true;
        }
      });
      return filled;
    },
    setValue: (key: string, value: string) => {
      let values = get().values;
      let facets = get().facets;
      let filter = facets.find((f) => f.code === key);
      if (filter) {
        if (filter.multiple) {
          if (values[key]) {
            if (values[key].includes(value)) {
              values[key] = values[key].filter((v) => v !== value);
            } else {
              values[key].push(value);
            }
          } else {
            values[key] = [value];
          }
        } else {
          values[key] = [value];
        }
      }
      const searchParams = createQueryParams(values, "manufacturers_filter");
      replaceQueryParams(searchParams);
      set({ values });
    },
    removeValue: (key: string, value: string) => {
      let values = get().values;
      let facets = get().facets;
      let filter = facets.find((f) => f.code === key);
      if (filter) {
        if (filter.multiple) {
          if (values[key]) {
            if (values[key].includes(value)) {
              values[key] = values[key].filter((v) => v !== value);
            }
          }
        } else {
          values[key] = [];
        }
      }
      set({ values });
    },

    resetValues: () => {
      let values = get().values;
      let facets = get().facets;

      let searchParamsToRemove: string[] = [];
      facets.forEach((f) => {
        searchParamsToRemove.push(`manufacturers_filter`);
      });

      facets.forEach((f) => {
        if (f.multiple) {
          values[f.code] = [];
        } else {
          values[f.code] = [];
        }
      });
      removeQueryParams(searchParamsToRemove);
      set({ values });
    },
  })
);
