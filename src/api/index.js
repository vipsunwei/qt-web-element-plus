import axios from "axios";

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
  (err) => Promise.reject(err)
);

// /api/history/getTkyInfo?startTime=2020-11-11 12:23:23&endTime=2020-11-19 23:00:15
export const getTkyInfo = (st, et) => {
  return IS_MOCK
    ? Promise.resolve(require("../data/tkyinfo").default.data)
    : request.get("/api/history/getTkyInfo", {
        params: {
          startTime: st,
          endTime: et,
        },
      });
};

// /api/history/getBaseTestReport?tkyid=11
export const getBaseTestReport = (tkyid) => {
  console.log("tkyid: ", tkyid);
  return IS_MOCK
    ? Promise.resolve(require("../data/baseTestReport").default.data)
    : request.get("/api/history/getBaseTestReport", {
        params: {
          tkyid,
        },
      });
};

// /api/history/getInstantInfo?tkyid=11
export const getInstantInfo = (tkyid) => {
  console.log("tkyid: ", tkyid);
  return IS_MOCK
    ? Promise.resolve(require("../data/instantInfo").default.data)
    : request.get("/api/history/getInstantInfo", {
        params: {
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
  return IS_MOCK
    ? Promise.resolve(require("../data/tkyData").default.data)
    : request.get("/api/history/getTkyData", {
        params: {
          tkyid,
          startTime,
          endTime,
          pageSize,
          pageNumber,
        },
      });
};

export function getWarningAlarmLevel() {
  let url = "/api/history/getWarningAlarmLevel";
  return IS_MOCK
    ? Promise.resolve(require("../data/levels").default.data)
    : request.get(url);
}

export function getWarningAlarmComponent() {
  return IS_MOCK
    ? Promise.resolve(require("../data/types").default.data)
    : request.get("/api/history/getWarningAlarmComponent");
}

// /api/history/getActiveWarningMessage
export function getActiveWarningMessage() {
  return IS_MOCK
    ? Promise.resolve(require("../data/activeWarningMessage").default.data)
    : request.get("/api/history/getActiveWarningMessage");
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
    ? Promise.resolve(require("../data/warningMessage").default.data)
    : request.get("/api/history/getWarningMessage", {
        params: {
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
  return IS_MOCK
    ? Promise.resolve({ ackAlarm: true })
    : request.get("/api/environment/ackAlarm", {
        params: {
          id,
        },
      });
}
