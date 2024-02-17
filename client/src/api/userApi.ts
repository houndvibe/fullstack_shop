import axios from "axios";
import $axios from ".";
import { jwtDecode } from "jwt-decode";
import rootStore from "../store/rootStore";

interface MyToken {
  email: string;
  role: "ADMIN" | "USER";
}

export default class UserApi {
  static async register(email: string, password: string, isAdmin: boolean) {
    const role = isAdmin ? "ADMIN" : "USER";

    try {
      const { data } = await $axios.post("api/user/registration", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", data.token);

      rootStore.modalStore.setLoginModalState(false);
      rootStore.userStore.setIsAuth(true);
      rootStore.userStore.setUser({ email, role });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        rootStore.modalStore.setLoginModalError(e.response!.data.message);
      } else {
        console.log(e);
      }
    }
  }

  static async login(email: string, password: string) {
    try {
      const { data } = await $axios.post("api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      rootStore.modalStore.setLoginModalState(false);
      rootStore.userStore.setIsAuth(true);
      rootStore.userStore.setUser({ email, role: data.role });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        rootStore.modalStore.setLoginModalError(e.response!.data.message);
      } else {
        console.log(e);
      }
    }
  }

  static async check() {
    try {
      const { data } = await $axios.get("api/user/checkAuth");

      localStorage.setItem("token", data.token);

      const { email, role } = jwtDecode<MyToken>(data.token);

      console.log(jwtDecode(data.token));

      rootStore.userStore.setUser({ email, role });
      rootStore.userStore.setIsAuth(true);

      return jwtDecode(data.token);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e);
        /* rootStore.modalStore.setLoginModalError(e.response!.data.message); */
      } else {
        console.log(e);
      }
    }
  }
}
