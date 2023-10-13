import { create } from "zustand";
import { RouterOutputs } from "../utils/trpc";
import { devtools } from "zustand/middleware";
import {
  createQueryParams,
  removeQueryParams,
  replaceQueryParams,
} from "../utils/manufacturers_filter_fn";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { deepMap, atom, computed, action, map } from "nanostores";

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

export const useManufacturersFilterStore = create(
  immer<IManufacturersFilterStore>((set, get) => ({
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
      set((state) => {
        // let values = { ...state.values }; // Create a shallow copy
        let facets = [...state.facets]; // Create a shallow copy
        let filter = facets.find((f) => f.code === key);
        if (filter) {
          if (filter.multiple) {
            if (state.values[key]) {
              if (state.values[key].includes(value)) {
                state.values[key] = state.values[key].filter(
                  (v) => v !== value
                );
              } else {
                state.values[key].push(value);
              }
            } else {
              state.values[key] = [value];
            }
          } else {
            state.values[key] = [value];
          }
        }
        const searchParams = createQueryParams(
          { ...state.values },
          "manufacturers_filter"
        );
        replaceQueryParams(searchParams); // Return the updated values object
      });
    },
    removeValue: (key: string, value: string) => {
      set((state) => {
        let filter = state.facets.find((f) => f.code === key);
        if (filter) {
          if (filter.multiple) {
            if (state.values[key]) {
              if (state.values[key].includes(value)) {
                state.values[key] = state.values[key].filter(
                  (v) => v !== value
                );
              }
            }
          } else {
            state.values[key] = [];
          }
        }
      });
    },

    resetValues: () => {
      set((state) => {
        let searchParamsToRemove: string[] = [];
        state.facets.forEach((f) => {
          searchParamsToRemove.push(`manufacturers_filter`);
        });

        state.facets.forEach((f) => {
          if (f.multiple) {
            state.values[f.code] = [];
          } else {
            state.values[f.code] = [];
          }
        });
        removeQueryParams(searchParamsToRemove);
      });
    },
  }))
);

export const $values = map<Record<string, string[]>>({});

export const $facets = atom<RouterOutputs["manufacturers"]["getFacetFilter"]>(
  []
);

export const $isValuesFilled = computed(
  [$values, $facets],
  (values, facets) => {
    let filled = false;
    facets.forEach((f) => {
      if (values[f.code] && values[f.code].length > 0) {
        filled = true;
      }
    });
    return filled;
  }
);

export function setValue(key: string, value: string) {
  let facets = $facets.get(); // Create a shallow copy
  let values = $values.get();
  let filter = facets.find((f) => f.code === key);
  if (filter) {
    if (filter.multiple) {
      if (values[key]) {
        if (values[key].includes(value)) {
          $values.setKey(
            key,
            values[key].filter((v) => v !== value)
          );
        } else {
          $values.setKey(key, [...values[key], value]);
        }
      } else {
        $values.setKey(key, [value]);
      }
    } else {
      $values.setKey(key, [value]);
    }
  }
  const searchParams = createQueryParams(
    { ...$values.get() },
    "manufacturers_filter"
  );
  replaceQueryParams(searchParams);
}

export function removeValue(key: string, value: string) {
  let facets = $facets.get(); // Create a shallow copy
  let values = $values.get();
  let filter = facets.find((f) => f.code === key);
  if (filter) {
    if (filter.multiple) {
      if (values[key]) {
        if (values[key].includes(value)) {
          $values.setKey(
            key,
            values[key].filter((v) => v !== value)
          );
        }
      }
    } else {
      $values.setKey(key, []);
    }
  }
}

export function resetValues() {
  let facets = $facets.get(); // Create a shallow copy
  let values = $values.get();
  let searchParamsToRemove: string[] = [];
  facets.forEach((f) => {
    searchParamsToRemove.push(`manufacturers_filter`);
  });

  facets.forEach((f) => {
    if (f.multiple) {
      $values.setKey(f.code, []);
    } else {
      $values.setKey(f.code, []);
    }
  });
  removeQueryParams(searchParamsToRemove);
}
