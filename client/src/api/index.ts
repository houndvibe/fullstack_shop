import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:7000/",
});

$axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default $axios;
