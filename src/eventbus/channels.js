import store from "../store/index";

const channels = [
  {
    channel: "SystemMode",
    handler: function(data) {
      console.info("system mode from event bus: ", data);
      if (data?.SystemMode) {
        store.commit("SET_SYSTEM_MODE", data.SystemMode);
      }
    },
  },
  {
    channel: "ReleaseStep",
    handler: function(data) {
      console.info("ReleaseStep data -- ", data);
      if (data?.ReleaseStep) {
        store.dispatch("setReleaseStep", data.ReleaseStep);
      }
    },
  },
];

export const mockOptions = {
  SystemMode: {
    timer: null,
    timeout: 3000,
    times: Infinity,
    mockDataName: "systemMode",
  },
  ReleaseStep: {
    timer: null,
    timeout: 5000,
    times: 16,
    mockDataName: "releaseStep",
  },
};

export default channels;
