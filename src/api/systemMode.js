import axios from "axios";
import { ElMessage } from "element-plus";
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
  (err) => {
    const res = err.response;
    const message = res?.config?.url + res?.status + res?.statusText;
    ElMessage({
      type: "error",
      message: message,
      duration: 3000,
    });
    return Promise.reject(err);
  }
);

export function getSystemMode() {
  const url = `/api/environment/getSystemMode`;
  return IS_MOCK
    ? Promise.resolve({ SystemMode: "INITIALIZING" })
    : request.get(url, { params: { token: getToken() } });
}

export function setSystemMode(value) {
  const url = `/api/environment/setSystemMode`;
  return IS_MOCK
    ? Promise.resolve({ setSystemMode: true })
    : request.get(url, {
        params: {
          token: getToken(),
          ModeName: value,
        },
      });
}
