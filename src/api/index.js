import axios from "axios";

// 探空仪信息假数据
import tkyInfo from "../data/tkyinfo.js";
// 基测报告假数据
import baseTestReport from "../data/baseTestReport.js";
// 瞬时值假数据
import instantInfo from "../data/instantInfo";
// 探空仪数据假数据
import tkyData from "../data/tkyData";
// 告警级别假数据
import levels from "../data/levels";
// 告警类别假数据
import types from "../data/types";
// 当前存活告警信息假数据
import activeWarningMessage from "../data/activeWarningMessage";
// 告警信息假数据
import warningMessage from "../data/warningMessage";

const host = process.env.VUE_APP_HOST;
console.log("🚀 ~ file: index.js ~ line 13 ~ host", host);
// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
const IS_MOCK = true; // 切换假数据开关

const request = axios.create({
  baseURL: host,
  timeout: 10000,
});

// /api/history/getTkyInfo?startTime=2020-11-11 12:23:23&endTime=2020-11-19 23:00:15
export const getTkyInfo = (st, et) => {
  return IS_MOCK
    ? Promise.resolve(tkyInfo)
    : request
        .get("/api/history/getTkyInfo", {
          params: {
            startTime: st,
            endTime: et,
          },
        })
        .then((res) => res)
        .catch((err) => err);
};

// /api/history/getBaseTestReport?tkyid=11
export const getBaseTestReport = (tkyid) => {
  console.log("tkyid: ", tkyid);
  return IS_MOCK
    ? Promise.resolve(baseTestReport)
    : request
        .get("/api/history/getBaseTestReport", {
          params: {
            tkyid,
          },
        })
        .then((res) => res)
        .catch((err) => err);
};

// /api/history/getInstantInfo?tkyid=11
export const getInstantInfo = (tkyid) => {
  console.log("tkyid: ", tkyid);
  return IS_MOCK
    ? Promise.resolve(instantInfo)
    : request
        .get("/api/history/getInstantInfo", {
          params: {
            tkyid,
          },
        })
        .then((res) => res)
        .catch((err) => err);
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
    ? Promise.resolve(tkyData)
    : request
        .get("/api/history/getTkyData", {
          params: {
            tkyid,
            startTime,
            endTime,
            pageSize,
            pageNumber,
          },
        })
        .then((res) => res)
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
