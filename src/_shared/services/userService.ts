import { getAuth } from 'firebase/auth';

export const getCurrentUser = () => {
  return getAuth().currentUser;
};

export const getCurrentUserId = () => {
  return getAuth().currentUser?.uid;
};