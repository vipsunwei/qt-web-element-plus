import axios from "axios";
const host = process.env.VUE_APP_HOST;
// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
const IS_MOCK = true; // 切换假数据开关

const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
});
request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export function getSystemMode() {
  return IS_MOCK
    ? Promise.resolve({ SystemMode: "INITIALIZING" })
    : request.get("/api/environment/getSystemMode");
}

export function setSystemMode(value) {
  return IS_MOCK
    ? Promise.resolve({ setSystemMode: true })
    : request.get("/api/environment/setSystemMode", {
        params: {
          ModeName: value,
        },
      });
}
