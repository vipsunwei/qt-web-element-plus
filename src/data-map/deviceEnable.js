export function getDeviceEnableMap() {
  return {
    YSRP: { key: "YSRP", label: "接收机", name: "YSRP", status: false },
    YBMB: { key: "YBMB", label: "基测箱", name: "YBMB", status: false },
    YGPS: { key: "YGPS", label: "GPS", name: "YGPS", status: false },
    YP7: { key: "YP7", label: "7针", name: "YP7", status: false },
    YPM: { key: "YPM", label: "电源管理", name: "YPM", status: false },
    YINF: { key: "YINF", label: "充气系统", name: "YINF", status: false },
    YEMS: {
      key: "YEMS",
      label: "环境检测系统（原氢气检测）",
      name: "YEMS",
      status: false,
    },
    YAWS: {
      key: "YAWS",
      label: "地面自动气象站",
      name: "YAWS",
      status: false,
    },
  };
}
