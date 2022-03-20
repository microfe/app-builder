import { ApplicationPolicy } from '../Types';

export const allowAnonymous: ApplicationPolicy = () => {
  return true;
};