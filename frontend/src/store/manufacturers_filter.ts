import {
  createQueryParams,
  removeQueryParams,
  replaceQueryParams,
} from "../utils/manufacturers_filter_fn";
import { atom, computed, map } from "nanostores";

export const $values = map<Record<string, string[]>>({});

export const $facets = atom<{
  name: string;
  code: string;
  multiple: boolean;
  value: {
    value: string;
    count: number;
  }[];
}[]>(
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

export function setMultipleValues(key: string, value: string[]) {
  let facets = $facets.get(); // Create a shallow copy
  let values = $values.get();
  let filter = facets.find((f) => f.code === key);
  if (filter) {
    $values.setKey(key, value);
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
