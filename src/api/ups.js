import axios from "axios";
import { getToken } from "../utils/utils";

const host = process.env.VUE_APP_HOST;
let IS_MOCK = false;
const request = axios.create({
  timeout: 10 * 1000,
  baseURL: host,
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export function getPowerParam() {
  const url = `/api/power/getPowerParam`;
  return IS_MOCK
    ? Promise.resolve(require("../data/ups").default.data)
    : request.get(url, { params: { token: getToken() } });
}

export function getPowerStatus() {
  const url = `/api/power/getPowerStatus`;
  return IS_MOCK
    ? Promise.resolve(require("../data/ups").default.state)
    : request.get(url, { params: { token: getToken() } });
}

export function powerOn(powerType) {
  const url = `/api/power/powerOn`;
  return IS_MOCK
    ? Promise.resolve({ powerOn: true })
    : request.get(url, {
        params: {
          token: getToken(),
          powerType,
        },
      });
}

export function powerOff(powerType) {
  const url = `/api/power/powerOff`;
  return IS_MOCK
    ? Promise.resolve({ powerOff: true })
    : request.get(url, {
        params: {
          token: getToken(),
          powerType,
        },
      });
}
