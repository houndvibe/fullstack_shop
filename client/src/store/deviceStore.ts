import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore.js";

interface DeviceProps {
  id?: number;
  title: string;
  price: number;
  brand: string;
}

export default class DeviceStore {
  rootStore: typeof RootStore;
  _devices: DeviceProps[];

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this._devices = [];
  }

  setDevices(devices: DeviceProps[]): void {
    this._devices = devices;
  }

  get devices(): DeviceProps[] {
    return this._devices;
  }
}
