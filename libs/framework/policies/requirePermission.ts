import {
  ApplicationPolicy,
  IApplicationContext,
  IApplicationPermission
} from '../Types';

export const requirePermission = (permission: IApplicationPermission): ApplicationPolicy => (applicationContext: IApplicationContext) => {
  const { roles: applicationRoles } = applicationContext;
  return !!applicationRoles?.find(role => role.permissions.find(rolePermission => rolePermission === permission));
};