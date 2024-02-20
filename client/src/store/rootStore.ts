import ModalStore from "./modalStore.js";
import UserStore from "./userStore.js";
import DeviceStore from "./deviceStore.js";

class RootStore {
  userStore: UserStore;
  modalStore: ModalStore;
  deviceStore: DeviceStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.modalStore = new ModalStore(this);
    this.deviceStore = new DeviceStore(this);
  }
}

export default new RootStore();
