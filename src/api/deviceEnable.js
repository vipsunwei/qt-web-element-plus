import axios from "axios";
import { getToken } from "../utils/utils";

// const IS_MOCK = false;
const host = process.env.VUE_APP_HOST;
const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
});

/**
 * 获取全部设备使能状态
 */
export function getDeviceEnable() {
  let url = `/api/environment/getDeviceEnable`;
  const token = getToken();
  if (token) {
    url += `?token=${token}`;
  }
  return request
    .get(url)
    .then((res) => res.data)
    .catch((error) => error);
}

/**
 * 关闭对应设备使能
 * @param {object} param 参数对象
 * @param {string} param.token token
 * @param {string} param.Dtype Dtype
 */
export function closeDeviceEnable(param) {
  const token = getToken();
  let url = `/api/environment/closeDeviceEnable?token=${token}&Dtype=${param.Dtype}`;

  return request
    .get(url)
    .then((res) => res.data)
    .catch((error) => error);
}

/**
 * 开启对应设备使能
 * @param {object} param 参数对象
 * @param {string} param.token token
 * @param {string} param.Dtype Dtype
 */
export function openDeviceEnable(param) {
  const token = getToken();
  let url = `/api/environment/openDeviceEnable?token=${token}&Dtype=${param.Dtype}`;
  return request
    .get(url)
    .then((res) => res.data)
    .catch((error) => error);
}
