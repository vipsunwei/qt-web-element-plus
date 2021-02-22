import axios from "axios";
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
  return request
    .get("/api/environment/getDeviceEnable")
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
  return request
    .get(
      `/api/environment/closeDeviceEnable?token=${param.token}&Dtype=${param.Dtype}`
    )
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
  return request
    .get(
      `/api/environment/openDeviceEnable?token=${param.token}&Dtype=${param.Dtype}`
    )
    .then((res) => res.data)
    .catch((error) => error);
}
