import axios from "axios";

const host = process.env.VUE_APP_HOST;

// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
// 切换假数据开关
const IS_MOCK = true;

const request = axios.create({
  baseURL: host,
  timeout: 10000,
});

/**
 * 设置阀门开关状态
 * @description  /api/environment/setValveState?valveType=3&valveState=1
 * @param {number|string} valveType 阀门类别 1:支路1号阀门,2: 支路2号阀门 ,3: 总阀门 ,4: 安全阀门
 * @param {number|string} valveState 阀门状态 0:是关闭 ,1:是打开
 * @returns 返回值：{ setValveState: true }
 */
export const setValveState = (valveType, valveState) => {
  return IS_MOCK
    ? Promise.resolve({ setValveState: true })
    : request
        .get("/api/environment/setValveState", {
          params: {
            valveType,
            valveState,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
};

/**
 * 获取使能和复位全部参数值
 * @description /api/environment/getResetEnableParam
 * @returns 返回值：[{"param":"GNA"},{"param":"GNB"},{"param":"GNE"},{"param":"GND"},{"param":"GNI"},{"param":"GNJ"},{"param":"GNK"},{"param":"GNN"},{"param":"GNP"},{"param":"GNL"},{"param":"GNM"},{"param":"GNC"}]
 */
export const getResetEnableParam = () => {
  return IS_MOCK
    ? import("../data/resetEnableParams.js").then((result) => result.default)
    : request
        .get("/api/environment/getResetEnableParam")
        .then((res) => res.data)
        .catch((err) => err);
};

/**
 * 获取当前存活的使能
 * @description /api/environment/getEnable
 * @returns 返回值：[{"param":"GNA"},{"param":"GNB"},{"param":"GNC"},{"param":"GND"},{"param":"GNE"},{"param":"GNI"},{"param":"GNJ"},{"param":"GNK"},{"param":"GNL"},{"param":"GNM"},{"param":"GNN"},{"param":"GNP"}]
 */
export const getEnable = () => {
  return IS_MOCK
    ? import("../data/enable.js").then((result) => result.default)
    : request
        .get("/api/environment/getEnable")
        .then((res) => res.data)
        .catch((err) => err);
};

/**
 * 设置使能
 * @description /api/environment/setEnable?params=GNA,GNB,GNC
 * @param {string} params 编码拼接的字符串
 * @returns 返回值：{"setEnable:":true}
 */
export const setEnable = (params) => {
  return IS_MOCK
    ? Promise.resolve({ setEnable: true })
    : request
        .get("/api/environment/setEnable", {
          params: {
            params,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
};

export function getWarningAlarmLevel() {
  let url = "/api/history/getWarningAlarmLevel";
  return IS_MOCK
    ? Promise.resolve(levels)
    : request
        .get(url)
        .then((res) => res)
        .catch((err) => err);
}

export function getWarningAlarmComponent() {
  return IS_MOCK
    ? Promise.resolve(types)
    : request
        .get("/api/history/getWarningAlarmComponent")
        .then((res) => res)
        .catch((err) => err);
}

// /api/history/getActiveWarningMessage
export function getActiveWarningMessage() {
  return IS_MOCK
    ? Promise.resolve(activeWarningMessage)
    : request
        .get("/api/history/getActiveWarningMessage")
        .then((res) => res)
        .catch((err) => err);
}

// /api/history/getWarningMessage
// ?typeCode=2&startTime=2020-11-10 12:23:23&endTime=2020-11-27 23:00:15&pageSize=10&pageNumber=1&level=2
export function getWarningMessage({
  startTime,
  endTime,
  level,
  typeCode,
  pageNumber,
  pageSize,
}) {
  console.log(startTime, endTime, level, typeCode, pageNumber, pageSize);
  return IS_MOCK
    ? Promise.resolve(warningMessage)
    : request
        .get("/api/history/getWarningMessage", {
          params: {
            startTime,
            endTime,
            level,
            typeCode,
            pageNumber,
            pageSize,
          },
        })
        .then((res) => res)
        .catch((err) => err);
}
