import axios from "axios";
import $axios from ".";
import rootStore from "../store/rootStore";

export default class DeviceApi {
  static async getAllDevices() {
    try {
      const { data } = await $axios.get("api/device/");
      rootStore.deviceStore.setDevices(data.allProducts);
      return data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e);
      } else {
        console.log(e);
      }
    }
  }
  static async addDevice(title: string, price: number, brand: string) {
    try {
      const { data } = await $axios.post("api/device/", {
        title,
        price,
        brand,
      });
      console.log(data);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e);
      } else {
        console.log(e);
      }
    }
  }
}
