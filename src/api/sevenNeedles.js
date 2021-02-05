import axios from "axios";

const host = process.env.VUE_APP_HOST;

// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
// 切换假数据开关
const IS_MOCK = false;

const request = axios.create({
  baseURL: host,
  timeout: 10000,
});

/**
 * 激活探空仪
 * @description /api/sevenPin/powerOn
 * @returns 返回值:{"powerOn":true}
 */
export function powerOn() {
  return IS_MOCK
    ? Promise.resolve({ powerOn: true })
    : request
        .get("/api/sevenPin/powerOn")
        .then((res) => res.data)
        .catch((error) => error);
}

/**
 * 关闭探空仪
 * @description /api/sevenPin/powerOff
 * @returns 返回值:{"powerOff":true}
 */
export function powerOff() {
  return IS_MOCK
    ? Promise.resolve({ powerOff: true })
    : request
        .get("/api/sevenPin/powerOff")
        .then((res) => res.data)
        .catch((error) => error);
}

/**
 * 获取探空仪频点
 * @description /api/sevenPin/getSondeFreq
 * @returns 返回值:{"SondeFreq":403.452}
 */
export function getSondeFreq() {
  return IS_MOCK
    ? Promise.resolve({ SondeFreq: 403.452 })
    : request
        .get("/api/sevenPin/getSondeFreq")
        .then((res) => res.data)
        .catch((err) => err);
}

/**
 * 获取探空仪id
 * @description /api/sevenPin/getSondeId
 * @returns 返回值:{"SondeId":"7F7F7F7F"}
 */
export function getSondeId() {
  return IS_MOCK
    ? Promise.resolve({ SondeId: "7F7F7F7F" })
    : request
        .get("/api/sevenPin/getSondeId")
        .then((res) => res.data)
        .catch((err) => err);
}

/**
 * 设置探空仪频点
 * @param {number|string} sondeFreq 探空仪频点
 * @returns 返回值:{"setSondeFreq":true}
 */
export function setSondeFreq(sondeFreq) {
  return IS_MOCK
    ? Promise.resolve({ setSondeFreq: true })
    : request
        .get("/api/sevenPin/setSondeFreq", {
          params: {
            sondeFreq,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
