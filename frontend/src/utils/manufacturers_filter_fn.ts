export function replaceQueryParams(params) {
  const url = new URL(window.location.href);
  url.search = params;
  history.replaceState(null, "", url.toString());
}
export function createQueryParams(
  obj: {
    [key: string]: string[];
  },
  prefix = ""
) {
  let queryParams = "";
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    if (Array.isArray(obj[key])) {
      for (const value of obj[key]) {
        queryParams +=
          (queryParams ? "&" : "") +
          `${fullKey}[]=${encodeURIComponent(value)}`;
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      queryParams +=
        (queryParams ? "&" : "") + createQueryParams(obj[key], fullKey);
    } else {
      queryParams +=
        (queryParams ? "&" : "") + `${fullKey}=${encodeURIComponent(obj[key])}`;
    }
  }
  return queryParams;
}

export function removeQueryParams(paramsToRemove: string[]) {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  paramsToRemove.forEach((param) => {
    const regex = new RegExp(`^${param}(\\[.*\\]\\[\\])?$`);
    [...searchParams.keys()].forEach((key) => {
      if (regex.test(key)) {
        searchParams.delete(key);
      }
    });
  });
  url.search = searchParams.toString();
  history.replaceState(null, "", url.toString());
}

export function parseQueryParams(query: string) {
  const params = new URLSearchParams(query);
  const obj = {};

  for (const [key, value] of params) {
    const keys = key.match(/([^\[\]]+)/g);
    let currentObj = obj;

    keys?.forEach((k, index) => {
      if (index === keys.length - 1) {
        if (currentObj[k] instanceof Array) {
          currentObj[k].push(decodeURIComponent(value));
        } else if (currentObj[k]) {
          currentObj[k] = [currentObj[k], decodeURIComponent(value)];
        } else {
          currentObj[k] = [decodeURIComponent(value)];
        }
      } else {
        currentObj[k] = currentObj[k] || {};
        currentObj = currentObj[k];
      }
    });
  }

  return obj;
}
