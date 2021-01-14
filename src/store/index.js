import { createStore } from "vuex";
import { getSystemMode, setSystemMode } from "../api/systemMode";
import { mode } from "../data-map/systemMode";
import { ElMessage } from "element-plus";

export default createStore({
  state: {
    systemMode: "",
  },
  mutations: {
    SET_SYSTEM_MODE(state, value) {
      state.systemMode = value;
    },
  },
  actions: {
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
      console.info(result.SystemMode);
      commit("SET_SYSTEM_MODE", result.SystemMode);
    },
  },
  getters: {
    systemMode(state) {
      return mode[state.systemMode];
    },
  },
  modules: {},
});
