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
  const url = `/api/power/getPowerParam?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve(require("../data/ups").default.data)
    : request.get(url);
}

export function getPowerStatus() {
  const url = `/api/power/getPowerStatus?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve(require("../data/ups").default.state)
    : request.get(url);
}

export function powerOn(powerType) {
  const url = `/api/power/powerOn?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ powerOn: true })
    : request.get(url, {
        params: {
          powerType,
        },
      });
}

export function powerOff(powerType) {
  const url = `/api/power/powerOff?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ powerOff: true })
    : request.get(url, {
        params: {
          powerType,
        },
      });
}
