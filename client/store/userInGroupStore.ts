import { RoleInGroup } from '@/lib/types/groupTypes/rolesInGroup';
import { makeAutoObservable } from 'mobx';

export class UserInGroupStore {
  role: RoleInGroup | null;

  constructor() {
    makeAutoObservable(this);
    this.role = null;
  }

  setRole = (role: RoleInGroup) => {
    this.role = role ? role : null;
  };
  getRole = () => {
    return this.role;
  };
}

export const userInGroupStore = new UserInGroupStore();
