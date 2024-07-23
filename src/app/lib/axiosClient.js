import axios from "axios";

export const baseURL = "http://3.233.197.138/api/app/";
// export const baseURL = "https://2b31-39-50-195-106.ngrok-free.app";
// export const baseURL = "https://47ac-39-50-195-106.ngrok-free.app/superadmin/";

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(function (config) {
  let token = localStorage?.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
