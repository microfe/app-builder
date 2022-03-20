import { ApplicationPolicy } from '../Types';

export const isAuthenticated: ApplicationPolicy = (appContext) => {
  if(!appContext.user) {
    return '/auth/login';
  }
  
  return true;
};