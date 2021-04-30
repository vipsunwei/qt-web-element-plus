const data = [
  { param: "MAIN" },
  { param: "LIGHT" },
  { param: "WORK_ROOM_POWER" },
  { param: "HYDROGEN_ROOM_POWER" },
  { param: "WORK_ROOM_AIR_CONDITIONER" },
  { param: "CAMERA_POWER" },
  { param: "YEMS_POWER" },
  { param: "EM_STOP" },
];

const state = [
  { WORK_ROOM_AIR_CONDITIONER: false },
  { HYDROGEN_ROOM_POWER: false },
  { LIGHT: true },
  { WORK_ROOM_POWER: false },
  { CAMERA_POWER: false },
  { MAIN: true },
  { YEMS_POWER: false },
  { EM_STOP: false },
];
// 电源管理实时数据临近最后一条
const tkPowerData = {
  id: 686,
  deviceDiIdVersion: "YPM_600_1",
  stationNumber: null,
  ua: 235.3,
  ub: 235.7,
  uc: 236.5,
  ia: 1.92,
  ib: 0.46,
  ic: 0.13,
  pt: 515.0,
  pa: 393.0,
  pb: 91.0,
  pc: 30.0,
  qt: 10.0,
  qa: 18.0,
  qb: -10.0,
  qc: 30.0,
  freq: 49.96,
  impep: 234.5,
  expep: 0.6,
  ctime: 1619685088000,
};
export default { data, state, tkPowerData };
