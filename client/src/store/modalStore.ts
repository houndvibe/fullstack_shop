import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore.js";

export default class ModalStore {
  rootStore: typeof RootStore;
  _loginModalState: boolean;
  _loginModalError: string | null;

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this._loginModalState = false;
    this._loginModalError = null;
  }

  setLoginModalState(state: boolean): void {
    this._loginModalState = state;
  }

  setLoginModalError(message: string | null): void {
    this._loginModalError = message;
  }

  get loginModalState(): boolean {
    return this._loginModalState;
  }

  get loginModalError(): string | null {
    return this._loginModalError;
  }
}
