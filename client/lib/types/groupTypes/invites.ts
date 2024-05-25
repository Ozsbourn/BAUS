import { RoleInGroup } from './rolesInGroup';

export type ExpiringDuration =
  | '30 Minutes'
  | '1 Hour'
  | '6 Hours'
  | '12 Hours'
  | '1 Day'
  | '2 Days'
  | '7 Days'
  | 'Never';

export type InvitationInfo = {
  email: string;
  role: RoleInGroup;
  expired: string;
  groupId: string;
};
