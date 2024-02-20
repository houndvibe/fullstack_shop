import { makeAutoObservable } from "mobx";
import RootStore from "./rootStore.js";

export interface DeviceProps {
  id: number;
  title: string;
  price: number;
  brand: string;
}
type loadStatus = "loading" | "ok";

export default class DeviceStore {
  rootStore: typeof RootStore;
  _devices: DeviceProps[];
  _loaded: loadStatus;

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this._devices = [];
    this._loaded = "ok";
  }

  setDevices(devices: DeviceProps[]): void {
    this._devices = devices;
  }

  setLoaded(str: loadStatus): void {
    this._loaded = str;
  }

  get devices(): DeviceProps[] {
    return this._devices;
  }
  get loadStatus(): string {
    return this._loaded;
  }
}
