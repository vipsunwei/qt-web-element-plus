<template>
  <teleport to="body">
    <el-button
      id="setting"
      circle
      type="primary"
      icon="el-icon-setting"
      title="播报声音设置"
      @click="openSetting"
    >
    </el-button>

    <el-dialog title="播报声音设置" v-model="drawer" width="30%" append-to-body>
      <el-checkbox v-model="isPlayWarningVoice"> 关闭报警声音 </el-checkbox>
    </el-dialog>
  </teleport>
</template>

<script>
import { ref } from "vue";

export default {
  computed: {
    isPlayWarningVoice: {
      get() {
        return this.$store.state.warningMuted;
      },
      set(value) {
        this.$store.commit("SET_WARNING_MUTED", value);
      },
    },
  },
  setup() {
    function openSetting() {
      drawer.value = true;
    }

    const drawer = ref(false);

    return {
      openSetting,
      drawer,
    };
  },
};
</script>

<style lang="scss" scoped>
#setting {
  position: fixed;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  z-index: 10;
}
</style>