import axios from "axios";
import $axios from ".";
import rootStore from "../store/rootStore";

export default class DeviceApi {
  static async getAllDevices() {
    try {
      /*       rootStore.deviceStore.setLoaded("loading"); */
      const { data } = await $axios.get("api/device/");

      await rootStore.deviceStore.setDevices(data.allProducts);
      /*       await rootStore.deviceStore.setLoaded("ok"); */
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
      await $axios.post("api/device/", {
        title,
        price,
        brand,
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e);
      } else {
        console.log(e);
      }
    }
  }

  static async deleteDevice(id: number) {
    try {
      const { data } = await $axios.delete(`api/device/${id}`);
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
