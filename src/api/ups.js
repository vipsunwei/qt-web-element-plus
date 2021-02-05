import axios from "axios";
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
  return IS_MOCK
    ? Promise.resolve(require("../data/ups").default.data)
    : request.get("/api/power/getPowerParam");
}

export function getPowerStatus() {
  return IS_MOCK
    ? Promise.resolve(require("../data/ups").default.state)
    : request.get("/api/power/getPowerStatus");
}

export function powerOn(powerType) {
  return IS_MOCK
    ? Promise.resolve({ powerOn: true })
    : request.get("/api/power/powerOn", {
        params: {
          powerType,
        },
      });
}

export function powerOff(powerType) {
  return IS_MOCK
    ? Promise.resolve({ powerOff: true })
    : request.get("/api/power/powerOff", {
        params: {
          powerType,
        },
      });
}
