import ModalStore from "./modalStore.js";
import UserStore from "./userStore.js";

class RootStore {
  userStore: UserStore;
  modalStore: ModalStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export default new RootStore();
