export function getGpsInfoMap() {
  return {
    year: { key: "year", name: "年", value: "" },
    hour: { key: "hour", name: "时", value: "" },
    monthValue: { key: "monthValue", name: "月", value: "" },
    minute: { key: "minute", name: "分", value: "" },
    // dayOfWeek: { key: "dayOfWeek", name: "星期", value: "" },
    dayOfMonth: { key: "dayOfMonth", name: "日", value: "" },
    second: { key: "second", name: "秒", value: "" },
    // month: { key: "month", name: "月", value: "" },
    // dayOfYear: { key: "dayOfYear", name: "本年第几天", value: "" },
  };
}

export function getGpsLocationInfoMap() {
  return {
    latitude: { key: "latitude", name: "纬度", value: "", unit: "度" },
    longitude: { key: "longitude", name: "经度", value: "", unit: "度" },
    altitude: { key: "altitude", name: "海拔", value: "", unit: "米" },
  };
}
