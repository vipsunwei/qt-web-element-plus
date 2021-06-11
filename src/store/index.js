import { createStore } from "vuex";
import { getSystemMode, setSystemMode } from "../api/systemMode";
import { mode } from "../data-map/systemMode";
import { releaseStepMap } from "../data-map/releaseStep";
import { ElMessage } from "element-plus";
import { getReleaseStep } from "../api/releaseStep";
import stepsVioce from "../assets/steps/index";
import getMyAudio from "../utils/myAudio";
const startStep = ["WAITING_COMMAND"];
const overStep = ["SOUNDING_TERMINATED", "SOUNDING_ABORTED"];

const myAudio = getMyAudio();
function playStepsVioce(item) {
  const src = stepsVioce[item.title];
  myAudio.setSrc(src);
}

export default createStore({
  state: {
    systemMode: "",
    steps: [],
    warnings: [],
    warningMuted: true,
  },
  mutations: {
    SET_WARNING_MUTED(state, value) {
      state.warningMuted = value;
    },
    SET_WARNING(state, value) {
      state.warnings = value;
    },
    SET_STEPS(state, value) {
      state.steps = value;
    },
    SET_SYSTEM_MODE(state, value) {
      state.systemMode = value;
    },
  },
  actions: {
    async setReleaseStep({ state, commit }, releaseStep) {
      const steps = state.steps;
      let mapItem = null;
      if (overStep.includes(releaseStep)) {
        mapItem = releaseStepMap.OVER;
      } else {
        mapItem = releaseStepMap[releaseStep];
      }
      const cur = steps.find((item) => item.id === mapItem?.id);
      if (cur) {
        cur.status = true;
      }
      if (startStep.includes(releaseStep)) {
        steps.map((item) => {
          item.status = !(item.id > mapItem.id);
          return item;
        });
      }
      commit("SET_STEPS", steps);
      playStepsVioce(mapItem);
    },
    async getReleaseStep({ commit }) {
      const arr = Object.values(releaseStepMap);
      getReleaseStep()
        .then((result) => {
          if (overStep.includes(result.ReleaseStep)) {
            const overItem = arr.find((item) => item.isOver);
            if (overItem) {
              overItem.status = true;
            }
            commit("SET_STEPS", arr);
          } else {
            const cur = releaseStepMap[result.ReleaseStep];
            arr.map((item) => {
              item.status = !item.isOver && item.id <= cur.id;
              return item;
            });
            commit("SET_STEPS", arr);
          }
        })
        .catch((err) => {
          console.dir(err);
          commit("SET_STEPS", arr);
        });
    },
    async setSystemMode({ commit }, value) {
      const result = await setSystemMode(value);
      if (result.setSystemMode) {
        commit("SET_SYSTEM_MODE", value);
        ElMessage({
          type: "success",
          message: "设置成功",
          duration: 2000,
        });
      } else {
        ElMessage({
          type: "error",
          message: "设置失败",
          duration: 3000,
        });
      }
    },
    async getSystemMode({ commit }) {
      const result = await getSystemMode();
      commit("SET_SYSTEM_MODE", result.SystemMode);
    },
    async addWarning({ state, commit }, warnings) {
      const newWarnings = [...state.warnings, ...warnings];
      commit("SET_WARNING", newWarnings);
    },
    async delWarning({ state, commit }, warning) {
      const newWarnings = state.warnings.filter(
        (item) => item.id !== warning.id
      );
      commit("SET_WARNING", newWarnings);
    },
  },
  getters: {
    systemMode(state) {
      return mode[state.systemMode];
    },
    getOneWarning(state) {
      return state.warnings[0];
    },
  },
  modules: {},
});
