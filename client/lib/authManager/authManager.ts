export class AuthManager {
  private token: string;

  constructor() {
    this.token = '';
  }

  get = () => {
    return this;
  };

  setToken = (token: string) => {
    this.token = token;
  };
  getToken = () => {
    return this.token;
  };

  _checkToken = () => {};
  _refreshToken = () => {};
}
