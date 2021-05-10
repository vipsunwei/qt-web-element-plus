<template>
  <el-card
    shadow="always"
    :body-style="{ padding: '0px' }"
    style="margin-bottom: 20px"
  >
    <template #header>
      <span>当前存活的告警信息</span>
    </template>
    <el-table v-loading="isLoading" :data="tableData" stripe>
      <el-table-column type="index" align="center" label="#" width="80">
      </el-table-column>
      <el-table-column label="报警源">
        <template #default="scope">
          {{ componentNameDict[scope.row?.alarm?.alarmComponent].text }}
        </template>
      </el-table-column>
      <el-table-column label="报警级别">
        <template #default="scope">
          {{ levelsDict[scope.row?.alarm?.alarmLevel].text }}
        </template>
      </el-table-column>
      <el-table-column label="报警名称">
        <template #default="scope">
          {{ scope.row?.alarm?.alarmName }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template #default="scope">
          {{
            (scope.row?.startTime &&
              formatDate(
                new Date(scope.row?.startTime),
                "yyyy-MM-dd HH:mm:ss"
              )) ||
            ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template #default="scope">
          {{
            (scope.row?.endTime &&
              formatDate(
                new Date(scope.row?.endTime),
                "yyyy-MM-dd HH:mm:ss"
              )) ||
            ""
          }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="ackUser" label="确认人"> </el-table-column> -->
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
import { onMounted, onUnmounted, reactive, toRaw, toRefs } from "vue";
import {
  ackAlarm,
  getActiveWarningMessage,
  levelsDict,
  componentNameDict,
} from "../api/index";
import { debounce, formatDate } from "../utils/utils";
import { ElMessage } from "element-plus";
import emitter from "../hooks/useMitt";
import { useStore } from "vuex";
export default {
  name: "ActiveWarningMessage",
  setup() {
    const IS_MOCK = true;
    const store = useStore();
    onMounted(() => {
      window.addEventListener("resize", getMaxHeight);
      getMaxHeight();
      getTableData().then((result) => {
        // emitter.emit("alarm", result);
        store.dispatch("addWarning", result);
      });
      // 挂在后监听eventbus收到实时报警时发过来的拉取一次当前存活报警列表的消息
      emitter.on("get-active-warning-message", getTableData);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", getMaxHeight);
      emitter.off("get-active-warning-message", getTableData);
    });
    const getMaxHeight = debounce(function () {
      const viewHeight = document.body.offsetHeight;
      state.maxHeight = viewHeight * 0.3;
    });
    // 获取当前存活的告警信息
    function getTableData(e) {
      state.isLoading = true;
      return getActiveWarningMessage()
        .then((result) => {
          state.tableData = result;

          // emitter.emit("alarm", result);

          return result;
        })
        .finally(() => {
          state.isLoading = false;
        });
    }
    const state = reactive({
      tableData: [],
      isLoading: false,
      maxHeight: null,
    });

    function onClickAckAlarm(id) {
      if (!id) return;
      ackAlarm(id).then((res) => {
        if (res.ackAlarm) {
          !IS_MOCK ? refreshTableData(id) : getTableData();
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

    // 假数据刷新当前存活的告警信息
    function refreshTableData(id) {
      state.tableData.map((item) => {
        if (item.id === id) {
          item.ackTime = new Date() - 0;
          item.ackUser = "username";
        }
        return item;
      });
      // console.log(state.tableData);
      // const rawData = toRaw(state.tableData);
      // state.tableData = rawData.map((item) => {
      //   if (item.id === id) {
      //     item.ackUser = "username";
      //     item.ackTime = new Date() - 0;
      //   }
      //   return item;
      // });
      // console.log(state.tableData, rawData);
      // state.tableData = state.tableData.filter((item) => item.id !== id);
    }

    return {
      ...toRefs(state),
      onClickAckAlarm,
      levelsDict,
      componentNameDict,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>