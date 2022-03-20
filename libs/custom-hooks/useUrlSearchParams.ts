import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const SUPPORTED_PARAMS_TYPES = [Number, String, Boolean, Date];

type SupportedParamsType = NumberConstructor | StringConstructor | BooleanConstructor | DateConstructor;
type UseUrlSearchParamsType<T> = Record<keyof T, SupportedParamsType>;

interface IParam {
  readonly key: string;
  readonly value: string | undefined;
}

export const useUrlSearchParams = <T>(initial?: T, types?: UseUrlSearchParamsType<T>): [T, (nextParams: T) => void] => {
  if (types) {
    validateTypes(types);
  }

  const location = useLocation();
  const history = useHistory();

  const [, forceUpdate] = React.useState<unknown>();

  const locationSearch = location.search;

  const urlSearchParams = React.useMemo(
    () => new URLSearchParams(locationSearch),
    [locationSearch]
  );

  const params: T = React.useMemo(
    () => {
      const resultArray: IParam[] = [];
      for (const item of urlSearchParams) {
        resultArray.push({
          key: item[0],
          value: item[1],
        });
      }

      const paramGroups = resultArray.reduce(
        (prevValue, currentItem) => {
          prevValue[currentItem.key] = prevValue[currentItem.key] || [];
          prevValue[currentItem.key].push(currentItem);
          return prevValue;
        },
        {} as Record<keyof T, IParam[]>
      );

      const result = Object.keys(paramGroups)
        .map((key): [keyof T, string] => {
          const valueGroup = paramGroups[key];
          if (valueGroup.length === 1) {
            return [key as keyof T, valueGroup[0].value];
          }

          return [key as keyof T, valueGroup.map(({ value }) => value)];
        });

      let params = { ...initial } as T;

      result.forEach(([key, value]) => {
        const parsedValue = parseValue<T>(key, value, initial!, types);

        const isPath = key.toString().includes('.');
        if (isPath) {
          params = objectFormPath(params, key.toString(), parsedValue);
          return;
        }

        params[key] = parsedValue;
      });

      return params;
    },
    [initial, types, urlSearchParams]
  );

  const redirectToNewSearchParams = React.useCallback(
    (params: T) => {
      const nextSearchParams = objToUrlSearchParams(params, urlSearchParams);
      const nextSearchParamsStr = nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : '';

      if (window.location.search !== nextSearchParamsStr) {
        const nextUrl = window.location.pathname + nextSearchParamsStr;
        history.replace(nextUrl);
      }

      if (urlSearchParams.toString() !== nextSearchParams.toString()) {
        forceUpdate({ /** Nope */ });
      }
    },
    [history, urlSearchParams]
  );

  React.useEffect(
    () => {
      redirectToNewSearchParams({
        ...initial,
        ...params,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params]
  );

  return [params, redirectToNewSearchParams];
};

const parseValue = <T>(key: keyof T, _value: IParam['value'], defaultParams: T, types?: UseUrlSearchParamsType<T>) => {
  if (!types) return _value;
  const type = types[key];

  const value = _value === undefined
    ? defaultParams[key] as any as string
    : _value;

  if (type === Number) {
    return Number(value);
  }
  if (type === Boolean) {
    return value == 'true';
  }
  if (type === Date) {
    return new Date(value);
  }
  if (Array.isArray(type)) {
    return type.find((item) => item == value) || defaultParams[key];
  }
  if (typeof type === 'function') {
    return type(value);
  }

  return value;
};

const populateUrlSearchParams = <T>(params: T, searchParams: URLSearchParams): URLSearchParams => {
  const paramKeys = Object.keys(params);
  for (const key of paramKeys) {
    const value = params[key];
    if (value === '' || value === undefined) {
      searchParams.delete(key);
      continue;
    }

    if (Array.isArray(value)) {
      searchParams.delete(key);
      value.forEach((valueItem) => {
        searchParams.append(key, valueItem);
      });

      continue;
    }

    if (value instanceof Date) {
      if (!isNaN(value.getTime())) {
        searchParams.set(key, value.toISOString());
      }
      continue;
    }

    if (typeof value === 'object') {
      objToUrlSearchParams({ [key]: value }, searchParams);
      continue;
    }

    searchParams.set(key, value);
  }

  return searchParams;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const objToUrlSearchParams = (obj: {}, searchParams: URLSearchParams, prefix?: string) => {
  const objProperties = Object.keys(obj);

  for (const objProperty of objProperties) {
    const k = prefix ? `${prefix}.${objProperty}` : objProperty;
    const value = obj[objProperty];

    if (value !== null && typeof value === 'object') {
      objToUrlSearchParams(value, searchParams, k);
    } else {
      if (searchParams.has(k)) {
        searchParams.delete(k);
      }

      populateUrlSearchParams({ [k]: value }, searchParams);
    }
  }

  return searchParams;
};

const isNoneEmptyPrimitiveArray = (input: SupportedParamsType) => {
  return (
    Array.isArray(input) &&
    input.length > 0 &&
    input.every((item) => typeof item === 'number' || typeof item === 'string' || typeof item === 'boolean')
  );
};

const validateTypes = <T>(types: UseUrlSearchParamsType<T>) => {
  const isValidTypes = Object.values(types)
    .every(
      (type: SupportedParamsType) => SUPPORTED_PARAMS_TYPES.includes(type) || isNoneEmptyPrimitiveArray(type) || typeof type === 'function'
    );

  if (isValidTypes) {
    return;
  }

  throw new Error(`Unsupported param types. Must be one of [${SUPPORTED_PARAMS_TYPES.map((item) => item.name).join(', ')}]`);
};

const objectFormPath = (initObj, path: string, value) => {
  let paths = path.split('.');

  let current = initObj;
  while (paths.length > 1) {
    const [head, ...tail] = paths;
    paths = tail;
    if (current[head] === undefined) {
      current[head] = {};
    }
    current = current[head];
  }
  current[paths[0]] = value;
  return initObj;
};
