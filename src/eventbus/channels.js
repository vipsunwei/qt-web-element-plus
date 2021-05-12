import store from "../store/index";
import emitter from "../hooks/useMitt";
// import { sleep } from "../utils/utils";
// import { ebHandler, startCheckQueue } from "@/utils/warning/warning.js";

// const ms = 10 * 1000;
// (async () => {
//   console.info(ms + "毫秒开始");
//   await sleep(ms);
//   startCheckQueue();
// })();

const channels = [
  {
    channel: "SystemMode",
    handler: function(data) {
      // console.info("system mode from event bus: ", data);
      if (data?.SystemMode) {
        store.commit("SET_SYSTEM_MODE", data.SystemMode);
      }
    },
  },
  {
    channel: "ReleaseStep",
    handler: function(data) {
      // console.info("ReleaseStep data -- ", data);
      if (data?.ReleaseStep) {
        store.dispatch("setReleaseStep", data.ReleaseStep);
      }
    },
  },
  {
    channel: "Warning",
    handler: function(data) {
      // ebHandler(data);
      store.dispatch("addWarning", [data]);

      emitter.emit("get-active-warning-message");
    },
  },
];

export const mockOptions = {
  SystemMode: {
    timer: null,
    timeout: 3000,
    times: 4,
    mockDataName: "systemMode",
  },
  ReleaseStep: {
    timer: null,
    timeout: 5000,
    times: 16,
    mockDataName: "releaseStep",
  },
  Warning: {
    timer: null,
    timeout: 3000,
    times: 3,
    mockDataName: "warning",
  },
};

export default channels;
