import { STORE_LANG_KEY } from './configs';

export const setCurrentLang = (langCode: string) => {
  return localStorage.setItem(STORE_LANG_KEY, langCode);
};