import axios from "axios";
import { getToken } from "../utils/utils";

const host = process.env.VUE_APP_HOST;
// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
const IS_MOCK = false; // 切换假数据开关

const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
});
request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export function getSystemMode() {
  const url = `/api/environment/getSystemMode?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ SystemMode: "INITIALIZING" })
    : request.get(url);
}

export function setSystemMode(value) {
  const url = `/api/environment/setSystemMode?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ setSystemMode: true })
    : request.get(url, {
        params: {
          ModeName: value,
        },
      });
}
