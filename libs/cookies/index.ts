import cookies, { CookieAttributes } from 'js-cookie';

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const setCookie = (key: string, value: string, option: CookieAttributes) => {
  return cookies.set(key, value, option);
};

export const deleteCookie = (key: string) => {
  return cookies.remove(key);
};