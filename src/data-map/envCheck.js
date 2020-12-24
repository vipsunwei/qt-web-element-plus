/**
 * 报警使能复位开关编码与名字映射关系
 * @description key：使能编码
 * @description id：可以用于渲染时排顺序
 * @description name：编码对应的使能中文名字
 * @returns {object} eg.{GNA: { id: 1, name: "放球仓氢气检测1", status: false }}
 */
export function getEnableResetDataMap() {
  return {
    GNA: { id: 1, param: "GNA", name: "放球仓氢气检测1", status: false },
    GNB: { id: 2, param: "GNB", name: "放球仓氢气检测2", status: false },
    GNE: { id: 3, param: "GNE", name: "放球仓烟雾报警", status: false },
    GND: { id: 4, param: "GND", name: "操作室烟雾报警器", status: false },
    GNI: { id: 5, param: "GNI", name: "操作室水进传感器", status: false },
    GNJ: { id: 6, param: "GNJ", name: "氢气房氢气检测1", status: false },
    GNK: { id: 7, param: "GNK", name: "氢气房氢气检测2", status: false },
    GNN: { id: 8, param: "GNN", name: "氢气房烟雾报警", status: false },
    GNP: { id: 9, param: "GNP", name: "氢气房水进传感器", status: false },
    GNL: { id: 10, param: "GNL", name: "氢气房管道压力1", status: false },
    GNM: { id: 11, param: "GNM", name: "氢气房管道压力2", status: false },
    GNC: { id: 12, param: "GNC", name: "氢气房管道压力总", status: false },
  };
}

/**
 * 阀门类型字典
 * @description 设置阀门开关状态时需传递的阀门类型参数
 * @description key: 阀门编码
 * @description value：阀门编码对应的数字表达
 * @returns {object} eg.{GNZD: { name: "总阀门", type: 3 }}
 */
export function getValveTypes() {
  return {
    mainValveStatus: {
      id: 1,
      param: "mainValveStatus",
      name: "总阀门",
      type: 3,
      status: false,
    },
    branch1ValveStatus: {
      id: 2,
      param: "branch1ValveStatus",
      name: "支路1号阀门",
      type: 1,
      status: false,
    },
    branch2ValveStatus: {
      id: 3,
      param: "branch2ValveStatus",
      name: "支路2号阀门",
      type: 2,
      status: false,
    },
    safetyValveStatus: {
      id: 4,
      param: "safetyValveStatus",
      name: "安全阀门",
      type: 4,
      status: false,
    },
  };
}
export function getValveStateMap() {
  return {
    branch1ValveStatus: "GNZF",
    branch2ValveStatus: "GNZG",
    mainValveStatus: "GNZD",
    safetyValveStatus: "GNZI",
  };
}

export default { getEnableResetDataMap, getValveTypes, getValveStateMap };
