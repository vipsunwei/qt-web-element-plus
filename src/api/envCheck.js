import axios from "axios";
import { getToken } from "../utils/utils";

const host = process.env.VUE_APP_HOST;

// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
// 切换假数据开关
const IS_MOCK = false;

const request = axios.create({
  baseURL: host,
  timeout: 10000,
});

/**
 * 查看烟雾阈值
 * @description /api/environment/getSmokeThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getSmokeThreshold() {
  const url = `/api/environment/getSmokeThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get(url)
        .then((res) => res.data)
        .catch((error) => error);
}
/**
 * 设置烟雾阈值
 * @description /api/environment/setSmokeThreshold
 * @param {number|string} smoke 烟雾阈值 取值范围：0~5000
 * @returns {object} {"setSmokeThreshold": true}
 */
export function setSmokeThreshold(smoke) {
  const url = `/api/environment/setSmokeThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ setSmokeThreshold: true })
    : request
        .get(url, {
          params: {
            smoke,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
/**
 * 查询设备烟雾阈值
 * @returns {*} { ThresholdInquire: 70 }
 */
export function getSmokeThresholdInquire() {
  const token = getToken();
  const url = "/api/environment/getSmokeThresholdInquire";
  return IS_MOCK
    ? Promise.resolve({ ThresholdInquire: 70 })
    : request
        .get(url, {
          params: { token },
        })
        .then((res) => res.data)
        .catch((error) => error);
}

/**
 * 查看压力阈值
 * @description /api/environment/getPressThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getPressThreshold() {
  const url = `/api/environment/getPressThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get(url)
        .then((res) => res.data)
        .catch((error) => error);
}
/**
 * 设置压力阈值
 * @description /api/environment/setPressThreshold
 * @param {number|string} press 压力阈值 取值范围：0~30000
 * @returns {object} {"setPressThreshold":true}
 */
export function setPressThreshold(press) {
  const url = `/api/environment/setPressThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ setPressThreshold: true })
    : request
        .get(url, {
          params: {
            press,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
/**
 * 查询设备压力阈值
 * @returns {*} {"ThresholdInquire":60}
 */
export function getPressThresholdInquire() {
  const token = getToken();
  const url = "/api/environment/getPressThresholdInquire";
  return IS_MOCK
    ? Promise.resolve({ ThresholdInquire: 70 })
    : request
        .get(url, {
          params: { token },
        })
        .then((res) => res.data)
        .catch((error) => error);
}
/**
 * 获取轻微压力警告阈值
 * @description /api/environment/getLowPressThreshold
 * @returns {object} {"Threshold":"设备异常"}或{"Threshold":60}
 */
export function getLowPressThreshold() {
  const url = `/api/environment/getLowPressThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get(url)
        .then((res) => res.data)
        .catch((err) => err);
}
/**
 * 设置压力轻微告警阈值
 * @description /api/environment/setLowPressThreshold
 * @param {number|string} lowPress 压力轻微警告阈值,参数要小于等于  压力告警   要做参数校验
 * @returns {object} {"setLowPressThreshold":true}
 */
export function setLowPressThreshold(lowPress) {
  const url = `/api/environment/setLowPressThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ setLowPressThreshold: true })
    : request.get(url, {
        params: { press: lowPress },
      });
}

/**
 * 查看氢气阈值
 * @description /api/environment/getHydrogenThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getHydrogenThreshold() {
  const url = `/api/environment/getHydrogenThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get(url)
        .then((res) => res.data)
        .catch((error) => error);
}
/**
 * 查询设备氢气阈值
 * @returns {*} {"ThresholdInquire":60}
 */
export function getHydrogenThresholdInquire() {
  const token = getToken();
  const url = "/api/environment/getHydrogenThresholdInquire";
  return IS_MOCK
    ? Promise.resolve({ ThresholdInquire: 70 })
    : request
        .get(url, {
          params: { token },
        })
        .then((res) => res.data)
        .catch((error) => error);
}
/**
 * 设置氢气浓度阈值
 * @description /api/environment/setHydrogenThreshold
 * @param {number|string} hydrogen 氢气浓度阈值 取值范围：0~9999
 * @returns {object} {"setHydrogenThreshold":true}
 */
export function setHydrogenThreshold(hydrogen) {
  const url = `/api/environment/setHydrogenThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ setHydrogenThreshold: true })
    : request
        .get(url, {
          params: {
            hydrogen,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
/**
 * 获取轻微氢气警告阈值
 * @description /api/environment/getLowHydrogenThreshold
 * @returns {object} {"Threshold":"设备异常"}或{"Threshold":60}
 */
export function getLowHydrogenThreshold() {
  const url = `/api/environment/getLowHydrogenThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get(url)
        .then((res) => res.data)
        .catch((err) => err);
}
/**
 * 设置氢气轻微警告阈值
 * @description /api/environment/setLowHydrogenThreshold
 * @param {number|string} lowHydrogen 氢气轻微警告阈值,参数要小于等于  氢气告警   要做参数校验
 * @returns {object} {"setLowHydrogenThreshold:":true}
 */
export function setLowHydrogenThreshold(lowHydrogen) {
  const url = `/api/environment/setLowHydrogenThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ setLowHydrogenThreshold: true })
    : request.get(url, {
        params: { hydrogen: lowHydrogen },
      });
}

/**
 * 查看时间阈值
 * @description /api/environment/getOpenTimeThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getOpenTimeThreshold() {
  const url = `/api/environment/getOpenTimeThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get(url)
        .then((res) => res.data)
        .catch((error) => error);
}
/**
 * 设置时间阈值
 * @description /api/environment/setOpenTimeThreshold
 * @param {number|string} seconds 时间阈值 取值范围：0~1800秒
 * @returns 返回值:{"setOpenTimeThreshold":true}
 */
export function setOpenTimeThreshold(seconds) {
  const url = `/api/environment/setOpenTimeThreshold?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ setOpenTimeThreshold: true })
    : request
        .get(url, {
          params: {
            seconds,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
/**
 * 查询设备时间阈值
 * @returns {*} { ThresholdInquire: 70 }
 */
export function getOpenTimeThresholdInquire() {
  const token = getToken();
  const url = `/api/environment/getOpenTimeThresholdInquire`;
  return IS_MOCK
    ? Promise.resolve({ ThresholdInquire: 70 })
    : request
        .get(url, {
          params: { token },
        })
        .then((res) => res.data)
        .catch((error) => error);
}

/**
 * 设置阀门开关状态
 * @description  /api/environment/setValveState?valveType=3&valveState=1
 * @param {number|string} valveType 阀门类别 1:支路1号阀门,2: 支路2号阀门 ,3: 总阀门 ,4: 安全阀门
 * @param {number|string} valveState 阀门状态 0:是关闭 ,1:是打开
 * @returns 返回值：{ setValveState: true }
 */
export const setValveState = (valveType, valveState) => {
  let url = `/api/environment/setValveState`;
  const token = getToken();
  if (token) {
    url += `?token=${token}`;
  }
  return IS_MOCK
    ? Promise.resolve({ setValveState: true })
    : request
        .get(url, {
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
  let url = `/api/environment/getResetEnableParam`;
  const token = getToken();
  if (token) {
    url += `?token=${token}`;
  }
  return IS_MOCK
    ? import("../data/resetEnableParams.js").then((result) => result.default)
    : request
        .get(url)
        .then((res) => res.data)
        .catch((err) => err);
};

/**
 * 获取当前存活的使能
 * @description /api/environment/getEnable
 * @returns 返回值：[{"param":"GNA"},{"param":"GNB"},{"param":"GNC"},{"param":"GND"},{"param":"GNE"},{"param":"GNI"},{"param":"GNJ"},{"param":"GNK"},{"param":"GNL"},{"param":"GNM"},{"param":"GNN"},{"param":"GNP"}]
 */
export const getEnable = () => {
  let url = `/api/environment/getEnable`;
  const token = getToken();
  if (token) {
    url += `?token=${token}`;
  }
  return IS_MOCK
    ? import("../data/enable.js").then((result) => result.default)
    : request
        .get(url)
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
  let url = `/api/environment/setEnable`;
  const token = getToken();
  if (token) {
    url += `?token=${token}`;
  }
  return IS_MOCK
    ? Promise.resolve({ setEnable: true })
    : request
        .get(url, {
          params: {
            params,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
};

/**
 * 报警复位重置功能
 * @description /api/environment/setReset
 * @param {string} param 使能编码 例："GNA"
 * @returns 返回值:{"setReset":true}
 */
export function setReset(param) {
  console.log("param: ", param);
  let url = `/api/environment/setReset`;
  const token = getToken();
  if (token) {
    url += `?token=${token}`;
  }
  return IS_MOCK
    ? Promise.resolve({ setReset: true })
    : request
        .get(url, {
          params: {
            param,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
