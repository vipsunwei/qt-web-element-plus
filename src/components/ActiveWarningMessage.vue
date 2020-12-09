<template>
  <el-card
    shadow="always"
    :body-style="{ padding: '0px' }"
    style="margin-bottom: 20px"
  >
    <template #header>
      <span>当前存活的告警信息</span>
    </template>
    <el-table
      v-loading="isLoading"
      :data="tableData"
      :max-height="maxHeight"
      stripe
    >
      <el-table-column type="index" align="center" label="#" width="80">
      </el-table-column>
      <el-table-column label="alarmComponent">
        <template #default="scope">
          {{ scope.row?.alarm?.alarmComponent }}
        </template>
      </el-table-column>
      <el-table-column label="alarmLevel">
        <template #default="scope">
          {{ scope.row?.alarm?.alarmLevel }}
        </template>
      </el-table-column>
      <el-table-column label="alarmName">
        <template #default="scope">
          {{ scope.row?.alarm?.alarmName }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { onMounted, onUnmounted, reactive, toRefs } from "vue";
import { getActiveWarningMessage, getTkyData } from "../api/index";
import { debounce, sleep } from "../utils/utils";
export default {
  name: "ActiveWarningMessage",
  setup() {
    onMounted(() => {
      window.addEventListener("resize", getMaxHeight);
      getMaxHeight();
      getTableData();
    });
    onUnmounted(() => window.removeEventListener("resize", getMaxHeight));
    const getMaxHeight = debounce(function () {
      const viewHeight = document.body.offsetHeight;
      state.maxHeight = viewHeight * 0.3;
      console.log(state.maxHeight, typeof state.maxHeight);
    });
    async function getTableData() {
      state.isLoading = true;
      const result = await getActiveWarningMessage();
      if (result.status === 200) {
        state.tableData = result.data;
      }
      await sleep(800);
      state.isLoading = false;
    }
    const state = reactive({
      tableData: [],
      isLoading: false,
      maxHeight: null,
    });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss" scoped>
</style>