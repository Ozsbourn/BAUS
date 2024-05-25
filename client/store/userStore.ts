import { makeAutoObservable } from 'mobx';
import { UserInfo } from '@/lib/types/userTypes/userInfo';

type AuthStatus = 'AUTHORIZED' | 'UNAUTHORIZED';

export class UserStore {
  authStatus: AuthStatus;
  info?: UserInfo;

  constructor() {
    makeAutoObservable(this);

    this.authStatus = 'UNAUTHORIZED';
    this.info = {} as UserInfo;
  }

  loginUser = (userInfo: UserInfo) => {
    this._fetchUserData(userInfo);
    this.authStatus = 'AUTHORIZED';
  };
  logoutUser = () => {
    this.authStatus = 'UNAUTHORIZED';
  };

  _fetchUserData = (userInfo: UserInfo) => {
    this.info = {
      userId: userInfo.userId,
      login: userInfo.login,
      name: userInfo.name,
      email: userInfo.email,
      avatarUrl: userInfo.avatarUrl,
      status: userInfo.status,
    };
  };
  _clearUserData = () => {
    this.info = {
      userId: '',
      login: '',
      name: '',
      email: '',
      avatarUrl: '',
      status: '',
    };
  };

  getUserInfo = () => {
    return {
      userId: this.info!.userId,
      login: this.info!.login,
      name: this.info!.name,
      avatarUrl: this.info!.avatarUrl,
      status: this.info!.status,
    };
  };

  _getUserAuthStatus = () => {
    return this.isUserAuthorized;
  };
  isUserAuthorized = () => {
    return this.authStatus === 'AUTHORIZED' ? true : false;
  };
}

export const userStore = new UserStore();
