let _i18n: (source?: string, ...params: (string | number)[]) => string = (source) => source ?? '';

export const setI18n = (fn: typeof _i18n) => {
  _i18n = fn;
};

export const i18n: typeof _i18n = (source?: string, ...params: (string | number)[]) => {
  return _i18n(source, ...params);
};