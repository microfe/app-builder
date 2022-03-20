import { STORE_LANG_KEY } from './configs';

export const getCurrentLang = () => {
  return localStorage.getItem(STORE_LANG_KEY);
}