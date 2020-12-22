<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0">
      <el-button type="primary" @click="back"> 返回 </el-button>
    </el-col>
  </el-row>

  <div class="ups" v-loading="loading">
    <el-row v-for="(row, i) in ups" :key="i">
      <el-col
        class="col"
        :span="12"
        :offset="0"
        v-for="item in row"
        :key="item.label"
      >
        <span class="ups-name">{{ item.label }}：</span>
        <el-switch
          v-model="item.state"
          active-text="开"
          inactive-text="关"
          @change="onUpsChange($event, item)"
        >
        </el-switch>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  name: "Ups",
  setup() {
    const router = useRouter();
    const state = reactive({
      loading: false,
      ups: [
        [
          { state: false, label: "所有电源" },
          { state: false, label: "总输入电压、电流、功耗、电源频率和电量" },
        ],
        [
          { state: false, label: "通风照明电源" },
          { state: false, label: "工作室电源" },
        ],
        [
          { state: false, label: "通风照明电源" },
          { state: false, label: "通风照明电源" },
        ],
        [
          { state: false, label: "控制室电源" },
          { state: false, label: "氢气房电源" },
        ],
        [
          { state: false, label: "工作室空调、控制室空调" },
          { state: false, label: "氢气房空调" },
        ],
        [
          { state: false, label: "摄像机电源" },
          { state: false, label: "环境检测电源" },
        ],
      ],
    });

    function onUpsChange(v, item) {
      if (state.loading) return;
      state.loading = true;
      console.log(v, item);
      if (item.label !== "所有电源") {
        setTimeout(() => {
          const message = `${!!v ? "打开" : "关闭"}${item.label}成功`;
          ElMessage({
            type: "success",
            message: message,
            duration: 2000,
          });
          state.loading = false;
        }, 500);

        return;
      }

      setTimeout(() => {
        const error = `${!!v ? "打开" : "关闭"}${item.label}失败`;
        ElMessage({
          type: "error",
          message: error,
          duration: 2000,
        });
        item.state = !v;
        state.loading = false;
      }, 500);
    }

    function back() {
      router.go(-1);
    }

    return { ...toRefs(state), onUpsChange, back };
  },
};
</script>

<style lang="scss" scoped>
.ups {
  border: 1px solid #dcdfe6;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  .col {
    height: 40px;
    display: flex;
    align-items: center;

    .ups-name {
      display: inline-block;
      width: 60%;
    }
  }
}
</style>