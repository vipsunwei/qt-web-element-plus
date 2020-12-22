/**
 * 报警使能复位开关编码与名字映射关系
 * @description key：使能编码
 * @description id：可以用于渲染时排顺序
 * @description name：编码对应的使能中文名字
 * @returns {object} eg.{GNA: { id: 1, name: "放球仓氢气检测1", state: false }}
 */
export function getEnableResetDataMap() {
  return {
    GNA: { id: 1, name: "放球仓氢气检测1", state: false },
    GNB: { id: 2, name: "放球仓氢气检测2", state: false },
    GNE: { id: 3, name: "放球仓烟雾报警", state: false },
    GND: { id: 4, name: "操作室烟雾报警器", state: false },
    GNI: { id: 5, name: "操作室水进传感器", state: false },
    GNJ: { id: 6, name: "氢气房氢气检测1", state: false },
    GNK: { id: 7, name: "氢气房氢气检测2", state: false },
    GNN: { id: 8, name: "氢气房烟雾报警", state: false },
    GNP: { id: 9, name: "氢气房水进传感器", state: false },
    GNL: { id: 10, name: "氢气房管道压力1", state: false },
    GNM: { id: 11, name: "氢气房管道压力2", state: false },
    GNC: { id: 12, name: "氢气房管道压力总", state: false },
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
    GNZD: { id: 1, name: "总阀门", type: 3, state: false },
    GNZF: { id: 2, name: "支路1号阀门", type: 1, state: false },
    GNZG: { id: 3, name: "支路2号阀门", type: 2, state: false },
    GNZI: { id: 4, name: "安全阀门", type: 4, state: false },
  };
}

export default { getEnableResetDataMap, getValveTypes };
