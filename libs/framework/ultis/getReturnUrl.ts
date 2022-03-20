import { returnUrlParam } from '../config';

export const getReturnUrl = () => {
  const urlSearch = new URLSearchParams(location.search);
  return urlSearch.get(returnUrlParam);
};
