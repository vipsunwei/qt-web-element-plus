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
 * 查看烟雾阈值
 * @description /api/environment/getSmokeThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getSmokeThreshold() {
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get("/api/environment/getSmokeThreshold")
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
  return IS_MOCK
    ? Promise.resolve({ setSmokeThreshold: true })
    : request
        .get("/api/environment/setSmokeThreshold", {
          params: {
            smoke,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}

/**
 * 查看压力阈值
 * @description /api/environment/getPressThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getPressThreshold() {
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get("/api/environment/getPressThreshold")
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
  return IS_MOCK
    ? Promise.resolve({ setPressThreshold: true })
    : request
        .get("/api/environment/setPressThreshold", {
          params: {
            press,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
/**
 * 获取轻微压力警告阈值
 * @description /api/environment/getLowPressThreshold
 * @returns {object} {"Threshold":"设备异常"}或{"Threshold":60}
 */
export function getLowPressThreshold() {
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get("/api/environment/getLowPressThreshold")
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
  return IS_MOCK
    ? Promise.resolve({ setLowPressThreshold: true })
    : request.get("/api/environment/setLowPressThreshold", {
        params: { press: lowPress },
      });
}

/**
 * 查看氢气阈值
 * @description /api/environment/getHydrogenThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getHydrogenThreshold() {
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get("/api/environment/getHydrogenThreshold")
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
  return IS_MOCK
    ? Promise.resolve({ setHydrogenThreshold: true })
    : request
        .get("/api/environment/setHydrogenThreshold", {
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
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get("/api/environment/getLowHydrogenThreshold")
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
  return IS_MOCK
    ? Promise.resolve({ setLowHydrogenThreshold: true })
    : request.get("/api/environment/setLowHydrogenThreshold", {
        params: { hydrogen: lowHydrogen },
      });
}

/**
 * 查看时间阈值
 * @description /api/environment/getOpenTimeThreshold
 * @returns {object} {"Threshold": 60}
 */
export function getOpenTimeThreshold() {
  return IS_MOCK
    ? Promise.resolve({ Threshold: 60 })
    : request
        .get("/api/environment/getOpenTimeThreshold")
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
  return IS_MOCK
    ? Promise.resolve({ setOpenTimeThreshold: true })
    : request
        .get("/api/environment/setOpenTimeThreshold", {
          params: {
            seconds,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}

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

/**
 * 报警复位重置功能
 * @description /api/environment/setReset
 * @param {string} param 使能编码 例："GNA"
 * @returns 返回值:{"setReset":true}
 */
export function setReset(param) {
  console.log("param: ", param);
  return IS_MOCK
    ? Promise.resolve({ setReset: true })
    : request
        .get("/api/environment/setReset", {
          params: {
            param,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
}
