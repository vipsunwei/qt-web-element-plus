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
      <el-table-column label="报警源">
        <template #default="scope">
          {{ scope.row?.alarm?.alarmComponent }}
        </template>
      </el-table-column>
      <el-table-column label="报警级别">
        <template #default="scope">
          {{ scope.row?.alarm?.alarmLevel }}
        </template>
      </el-table-column>
      <el-table-column label="报警名称">
        <template #default="scope">
          {{ scope.row?.alarm?.alarmName }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            v-if="!scope.row?.ackUser || !scope.row?.ackTime"
            type="primary"
            size="small"
            @click="onClickAckAlarm(scope.row?.id)"
          >
            确认
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { onMounted, onUnmounted, reactive, toRefs } from "vue";
import { ackAlarm, getActiveWarningMessage } from "../api/index";
import { debounce, sleep } from "../utils/utils";
import { ElMessage } from "element-plus";
import emitter from "../hooks/useMitt";
export default {
  name: "ActiveWarningMessage",
  setup() {
    const IS_MOCK = true;
    onMounted(() => {
      window.addEventListener("resize", getMaxHeight);
      getMaxHeight();
      getTableData();
    });
    onUnmounted(() => window.removeEventListener("resize", getMaxHeight));
    const getMaxHeight = debounce(function () {
      const viewHeight = document.body.offsetHeight;
      state.maxHeight = viewHeight * 0.3;
      // console.log(state.maxHeight, typeof state.maxHeight);
    });
    async function getTableData() {
      state.isLoading = true;
      const result = await getActiveWarningMessage();
      state.tableData = result;
      state.isLoading = false;
      emitter.emit("alarm", result);
    }
    const state = reactive({
      tableData: [],
      isLoading: false,
      maxHeight: null,
    });

    function onClickAckAlarm(id) {
      console.log("alarm id - ", id);
      if (!id) return;
      ackAlarm(id).then((res) => {
        console.log(res);
        if (res.ackAlarm) {
          IS_MOCK ? refreshTableData(id) : getTableData();
          ElMessage({
            type: "success",
            message: "操作成功",
            duration: 2000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "操作失败",
            duration: 3000,
          });
        }
      });
    }

    function refreshTableData(id) {
      state.tableData = state.tableData.filter((item) => item.id !== id);
    }

    return { ...toRefs(state), onClickAckAlarm };
  },
};
</script>

<style lang="scss" scoped>
</style>