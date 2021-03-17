const data = [
  { 自动探空系统: 0 },
  { 接收机: 1 },
  { 基测箱: 2 },
  { 自动气象站: 3 },
  { GPS: 4 },
  { 充气系统: 8 },
  { 环境检测系统: 9 },
  { "环境检测系统：烟雾报警器1": 9001 },
  { "环境检测系统：烟雾报警器2": 9002 },
  { "环境检测系统：氢气浓度1": 9003 },
  { "环境检测系统：氢气浓度2": 9004 },
  { "环境检测系统：管道压力": 9005 },
  { "环境检测系统：水浸传感器": 9006 },
  { "环境检测系统：环境设备状态": 9007 },
  { "环境检测系统：氢气房烟雾报警器": 9012 },
  { "环境检测系统：氢气房氢气浓度1": 9013 },
  { "环境检测系统：氢气房氢气浓度2": 9014 },
  { "环境检测系统：氢气房支路1管道压力": 9015 },
  { "环境检测系统：氢气房支路2管道压力": 9016 },
  { "环境检测系统：氢气房水浸传感器": 9017 },
  { "环境检测系统：氢气房环境设备状态": 9018 },
];

const data1 = [
  {
    typeCode: 1,
    typeText: "接收机",
  },
  {
    typeCode: 2,
    typeText: "基测箱",
  },
  {
    typeCode: 3,
    typeText: "自动气象站",
  },
  {
    typeCode: 4,
    typeText: "GPS",
  },
  {
    typeCode: 8,
    typeText: "充气系统",
  },
];

export default { status: 200, data, data1 };
