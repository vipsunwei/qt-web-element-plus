// /api/CheckSurvey/getCheckSurveyCriteion?token=123
import axios from "axios";
import { getToken } from "../utils/utils";

const IS_MOCK = false;
const host = process.env.VUE_APP_HOST;
const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
});

export const paramsDict = {
  mustBeJcTky: "是否需要基测",
  resetTkyFreq: "重置探空仪频点",
  poweronMaxTime: "上电最大时间",
  checkWaitTime: "检查时长",
  retryTimes: "重试时间",
  diffPressure: "压力差",
  diffTemperature: "温度差",
  diffHumidity: "湿度差",
  diffLng: "经度差",
  diffLat: "纬度差",
  diffAlt: "海拔差",
};
export function getCheckSurveyCriteion() {
  let url = "/api/CheckSurvey/getCheckSurveyCriteion";
  const token = getToken();
  return IS_MOCK
    ? Promise.resolve({
        CheckSurveyCriteionInfo: {
          mustBeJcTky: false,
          resetTkyFreq: true,
          poweronMaxTime: 50,
          checkWaitTime: 180,
          retryTimes: 5,
          diffPressure: 50.0,
          diffTemperature: 5.0,
          diffHumidity: 10.0,
          diffLng: 0.2,
          diffLat: 0.2,
          diffAlt: 20.0,
        },
      })
    : request({
        url,
        method: "get",
        params: {
          token,
        },
      })
        .then((res) => res.data)
        .catch((error) => error);
}

export function setCheckSurveyCriteion(params = {}) {
  const token = getToken();
  // /api/CheckSurvey/setCheckSurveyCriteion?token=123&mustBeJcTky=false&resetTkyFreq=true&poweronMaxTime=50&checkWaitTime=200&retryTimes=5&diffPressure=50&diffTemperature=5&diffHumidity=10&diffLng=0.2&diffLat=0.2&diffAlt=20
  let url = "/api/CheckSurvey/setCheckSurveyCriteion";
  return IS_MOCK
    ? Promise.resolve({ setCheckSurveyCriteion: true })
    : request
        .get(url, {
          params: {
            token,
            ...params,
          },
        })
        .then((res) => res.data)
        .catch((error) => error);
}
