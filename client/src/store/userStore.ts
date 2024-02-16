import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore.js";

interface UserProps {
  id?: number;
  email: string;
  password?: string;
  role: "USER" | "ADMIN";
}

export default class UserStore {
  rootStore: typeof RootStore;
  _isAuth: boolean;
  _user: UserProps | null;

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this._isAuth = false;
    this._user = null;
  }

  setIsAuth(bool: boolean): void {
    this._isAuth = bool;
  }
  setUser(user: UserProps | null): void {
    this._user = user;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get user(): UserProps | null {
    return this._user;
  }
}
