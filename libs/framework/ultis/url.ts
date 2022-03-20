import { isDate } from 'lodash';
import moment from 'moment';

export const getUrlSearchParam = (key: string) => {
  const currentUrlParams = new URLSearchParams(location.search);

  return currentUrlParams.get(key) ?? undefined;
};

export const getSearchParamsObj = () => {
  const search = location.search;
  const params = new URLSearchParams(search);
  const paramObj = {};
  const allParamKeys = params.keys();

  for (const paramKey of allParamKeys) {
    paramObj[paramKey] = params.get(paramKey);
  }

  return paramObj;
};

export const searchParamsToObject = (query?: string, ...includesKeys: string[]): Record<string, string | string[]> => {
  const currentUrlParams = query
    ? new URLSearchParams(query)
    : new URLSearchParams(location.search);
  
  const searchParamsEntries = currentUrlParams.entries();
  const search = Array.from(searchParamsEntries);

  return search.reduce(
    (currentResult, item) => {
      const key = item[0];
      const value = item[1];

      if (!includesKeys.length || includesKeys.includes(key)) {

        const prevValue = currentResult[key];
        if (prevValue) {
          if (Array.isArray(prevValue)) {
            return {
              ...currentResult,
              [key]: [...prevValue, value]
            };
          }

          return {
            ...currentResult,
            [key]: [prevValue, value]
          };
        }

        return { ...currentResult, [key]: value };
      }

      return currentResult;
    },
    {},
  );
};

export const objectToSearchParams = (obj = {}, initSearch?: string) => {
  const newSearch = new URLSearchParams(initSearch);

  for (const key of Object.keys(obj)) {
    if (obj[key]) {
      let value = obj[key];
      if (isDate(value) || moment.isMoment(value)) {
        value = value.toISOString();
      }
      if (Array.isArray(value)) {
        value.forEach(o => {
          newSearch.append(key, <string>o);
        });
      } else {
        newSearch.set(key, <string> value);
      }
    } else {
      newSearch.delete(key);
    }
  }

  return newSearch;
};

export const redirect = (uri: string) => {
  window.location.replace(uri);
};

export const replaceRoutePath = (
  path: string,
  obj = {},
  searchParams?: URLSearchParams | string
) => {
  const replacedPath = Object.keys(obj)
    .reduce(
      (url, key) => {
        const regex = new RegExp(`:${key}.?`, 'g');

        return url.replace(regex, <string> obj[key]);
      },
      path,
    );

  return replacedPath + (searchParams !== undefined ? searchParams.toString() : '');
};

export const getSubDomain = (host: string, domain: string) => {
  if (host.includes('localhost')) {
    return null;
  }

  return host.replace('.' + domain, '');
};
