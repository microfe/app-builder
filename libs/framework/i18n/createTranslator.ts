import { getCurrentLang } from './getCurrentLang';
import { normalizeResources } from './normalizeResources';
import { setCurrentLang } from './setCurrentLang';

export interface I18nResource {
  readonly [langkey: string]: { [key: string]: string };
}

export interface CreateTranslatiorProps {
  readonly resources: I18nResource;
  readonly defaultLangue: string;
}

const formatString = (source: string, ...params: string[]) => {
  return params.reduce((prevValue, param, index) => prevValue.replace(`{${index}}`, param), source);
};

export const createTranslator = ({
  resources,
  defaultLangue
}: CreateTranslatiorProps) => {
  const currentLang = getCurrentLang();

  if (!currentLang) {
    setCurrentLang(defaultLangue);
    return createTranslator({ resources, defaultLangue });
  }

  const _resources = normalizeResources(resources);

  return (source: string, ...params: string[]) => {
    if (!currentLang || !source) {
      return source;
    }

    if (_resources[currentLang]) {
      const dest = _resources[currentLang][source.toLowerCase()];
      return formatString(dest ?? source, ...params);
    }

    return formatString(source, ...params);
  };
};