import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "../utils/utils";

const host = process.env.VUE_APP_HOST;
console.log("🚀 ~ file: index.js ~ host", host);
// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
const IS_MOCK = false; // 切换假数据开关

const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
});
request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    ElMessage({
      type: "error",
      message: err.message,
      duration: 3000,
    });
    return Promise.reject(err);
  }
);

// /api/history/getTkyInfo?startTime=2020-11-11 12:23:23&endTime=2020-11-19 23:00:15
export const getTkyInfo = (st, et) => {
  const token = getToken();
  const url = `/api/history/getTkyInfo`;
  return IS_MOCK
    ? Promise.resolve(require("../data/tkyinfo").default.data)
    : request.get(url, {
        params: {
          token,
          startTime: st,
          endTime: et,
        },
      });
};
/**
 * 根据基测时间获取探空仪id列表
 * @param {string} st 开始时间
 * @param {string} et 结束时间
 */
export function getTkyInfoByJCTime(st, et) {
  const token = getToken();
  const url = "/api/history/getTkyInfoByJCTime";
  return IS_MOCK
    ? Promise.resolve([
        {
          id: 1,
          tkyid: "20070909",
          tkyType: 1,
          tkyFrequencyPoint: 401.0,
          status: 1,
          jcStatusTime: 1605124800000,
          checkResult: 1,
          checkResultTime: 1605125100000,
          fqStartTime: 1605125400000,
          fqEndTime: 1605139198000,
          tkyFirm: 30,
          sensorType: 1,
          ctime: 1605124800000,
          mtime: 1605139199000,
        },
        {
          id: 2,
          tkyid: "20070901",
          tkyType: 1,
          tkyFrequencyPoint: 401.131,
          status: 1,
          jcStatusTime: 1605211200000,
          checkResult: 1,
          checkResultTime: 1605211500000,
          fqStartTime: 1605211800000,
          fqEndTime: 1605225598000,
          tkyFirm: 30,
          sensorType: 1,
          ctime: 1605211200000,
          mtime: 1605225599000,
        },
      ])
    : request.get(url, {
        params: {
          token,
          startTime: st,
          endTime: et,
        },
      });
}

/**
 * 获取检测报告
 * @param {string} tkyid 探空仪id
 * @returns {Promise} Promise
 */
export function getCheckReport(tkyid) {
  const token = getToken();
  const url = "/api/history/getCheckReport";
  return IS_MOCK
    ? Promise.resolve({
        tkyid: "20707999",
        envPressure: 1011.983495088971039876923896372318267822265625,
        envTemperature: 19.4,
        envHumidity: 25.3,
        envLng: 116.4700887,
        envLat: 39.8065693,
        envAlt: 35.7,
        tkyPressure: 1014.51600000000007639755494892597198486328125,
        tkyTemperature: 16.4200000000000017053025658242404460906982421875,
        tkyHumidity: 36.34080000000000154614099301397800445556640625,
        tkyLng: 116.470001220703125,
        tkyLat: 39.80658676147461250138803734444081783294677734375,
        tkyAlt: 35.34400000000000119371179607696831226348876953125,
        diffPressure: 2.532504911029036520631052553653717041015625,
        diffTemperature: -2.9799999999999982946974341757595539093017578125,
        diffHumidity: 11.04080000000000154614099301397800445556640625,
        diffLng: -0.000087479296875,
        diffLat: 0.00001746147461250138803734444081783294677734375,
        diffAlt: -0.35599999999999880628820392303168773651123046875,
        passedPressure: true,
        passedTemperature: true,
        passedHumidity: false,
        passedLng: true,
        passedLat: true,
        passedAlt: true,
        passedBatteryVol: null,
        passedLocating: null,
        passedRssi: null,
        passed: false,
        ctime: null,
      })
    : request.get(url, {
        params: {
          token,
          tkyid,
        },
      });
}

// /api/history/getBaseTestReport?tkyid=11
export const getBaseTestReport = (tkyid) => {
  console.log("tkyid: ", tkyid);
  const token = getToken();
  const url = `/api/history/getBaseTestReport`;
  return IS_MOCK
    ? Promise.resolve(require("../data/baseTestReport").default.data)
    : request.get(url, {
        params: {
          token,
          tkyid,
        },
      });
};

// /api/history/getInstantInfo?tkyid=11
export const getInstantInfo = (tkyid) => {
  console.log("tkyid: ", tkyid);
  const url = `/api/history/getInstantInfo`;
  const token = getToken();
  return IS_MOCK
    ? Promise.resolve(require("../data/instantInfo").default.data)
    : request.get(url, {
        params: {
          token,
          tkyid,
        },
      });
};

// /api/history/getTkyData?
// tkyid=00230067&startTime=2020-11-18 02:23:23&endTime=2020-11-20 18:00:15&pageSize=10&pageNumber=1
export const getTkyData = ({
  tkyid,
  startTime,
  endTime,
  pageSize,
  pageNumber,
}) => {
  console.log(tkyid, startTime, endTime, pageSize, pageNumber);
  const url = `/api/history/getTkyData`;
  const token = getToken();
  return IS_MOCK
    ? Promise.resolve(require("../data/tkyData").default.data)
    : request.get(url, {
        params: {
          token,
          tkyid,
          startTime,
          endTime,
          pageSize,
          pageNumber,
        },
      });
};

export function getWarningAlarmLevel() {
  let url = `/api/history/getWarningAlarmLevel`;
  return IS_MOCK
    ? Promise.resolve(require("../data/levels").default.data)
    : request.get(url, { params: { token: getToken() } });
}

export function getWarningAlarmComponent() {
  const url = `/api/history/getWarningAlarmComponent`;
  return IS_MOCK
    ? Promise.resolve(require("../data/types").default.data)
    : request.get(url, { params: { token: getToken() } });
}

// /api/history/getActiveWarningMessage
export function getActiveWarningMessage() {
  const url = `/api/history/getActiveWarningMessage`;
  return IS_MOCK
    ? Promise.resolve(require("../data/activeWarningMessage").default.data)
    : request.get(url, { params: { token: getToken() } });
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
  const url = `/api/history/getWarningMessage`;
  return IS_MOCK
    ? Promise.resolve(require("../data/warningMessage").default.data)
    : request.get(url, {
        params: {
          token: getToken(),
          startTime,
          endTime,
          level,
          typeCode,
          pageNumber,
          pageSize,
        },
      });
}
/**
 * 告警确认
 * @description /api/environment/ackAlarm?id=1
 * @param {string|number} id Id数据  在告警信息里有
 * @returns {object} {"ackAlarm":true}是否成功
 */
export function ackAlarm(id) {
  const url = `/api/environment/ackAlarm`;
  return IS_MOCK
    ? Promise.resolve({ ackAlarm: true })
    : request.get(url, {
        params: {
          token: getToken(),
          id,
        },
      });
}
/**
 * 报警级别字典
 */
export const levelsDict = {
  INFO: { number: "等级 0", text: "运行信息", key: "INFO" },
  SLIGHT: { number: "等级 1", text: "轻微", key: "SLIGHT" },
  GENERAL: { number: "等级 2", text: "一般", key: "GENERAL" },
  SERIOUS: { number: "等级 3", text: "严重", key: "SERIOUS" },
  VERY_SERIOUS: { number: "等级 4", text: "非常严重", key: "VERY_SERIOUS" },
};
/**
 * 报警源名字字典
 */
export const componentNameDict = {
  SYSTEM: { text: "自动探空系统", key: "SYSTEM" },
  RECEIVER: { text: "接收机", key: "RECEIVER" },
  JCX: { text: "基测箱", key: "JCX" },
  AWS: { text: "自动气象站", key: "AWS" },
  GPS: { text: "GPS", key: "GPS" },
  P7: { text: "七针激活装置", key: "P7" },
  POWER_CONTROL: { text: "电源管理模块", key: "POWER_CONTROL" },
  GAS_CHARGING: { text: "充气系统", key: "GAS_CHARGING" },
  GAS_CHECHING: { text: "环境检测系统", key: "GAS_CHECHING" },
  GAS_CHECHING_SHELTER: {
    text: "环境检测系统-放舱",
    key: "GAS_CHECHING_SHELTER",
  },
  GAS_CHECHING_GAS_ROOM: {
    text: "环境检测系统-氢气房",
    key: "GAS_CHECHING_GAS_ROOM",
  },
  GAS_CHECHING_VALVE: { text: "环境检测系统-阀门", key: "GAS_CHECHING_VALVE" },
};
