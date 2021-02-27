// /api/environment/getReleaseStep

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

export function getReleaseStep() {
  const url = `/api/environment/getReleaseStep?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ ReleaseStep: "SOUNDING_TERMINATED" })
    : request.get(url);
}

export function resetReleaseStep() {
  const url = `/api/environment/resetReleaseStep?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ resetReleaseStep: true })
    : request.get(url);
}
