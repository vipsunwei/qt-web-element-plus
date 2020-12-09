<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="0">
      <el-select
        style="width: 100%"
        v-model="level"
        placeholder="请选择级别(等级越高级别越高)"
        clearable
        filterable
        @change="onLevelChange"
      >
        <el-option
          v-for="item in levels"
          :key="item.levelCode"
          :label="item.levelText"
          :value="item.levelCode"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12" :offset="0">
      <el-select
        style="width: 100%"
        v-model="type"
        placeholder="请选择类别"
        clearable
        filterable
        @change="onTypeChange"
      >
        <el-option
          v-for="item in types"
          :key="item.typeCode"
          :label="item.typeText"
          :value="item.typeCode"
        >
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top: 20px">
    <el-col :span="12" :offset="0">
      <el-date-picker
        v-model="date"
        type="datetimerange"
        unlink-panels
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        range-separator="至"
        @change="onDateChange"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="12" :offset="0" align="center">
      <el-button type="primary" @click="search">搜索</el-button>
    </el-col>
  </el-row>
  <el-card
    shadow="always"
    :body-style="{ padding: '0px' }"
    style="margin-top: 20px; margin-bottom: 20px"
  >
    <template #header>
      <span>告警信息</span>
    </template>
    <el-table :data="warningMessage" :height="maxHeight" stripe>
      <el-table-column
        type="index"
        label="#"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="alarmComponent">
        <template #default="scope">
          <span>{{ scope.row?.alarm?.alarmComponent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="alarmLevel">
        <template #default="scope">
          <span>{{ scope.row?.alarm?.alarmLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="alarmName">
        <template #default="scope">
          <span>{{ scope.row?.alarm?.alarmName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="status">
        <template #default="scope">
          <span>{{ scope.row?.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ackTime">
        <template #default="scope">
          <span>{{ scope.row?.ackTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ackUser">
        <template #default="scope">
          <span>{{ scope.row?.ackUser }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; margin-bottom: 20px"
      @size-change="onPageSizeChange"
      @current-change="onPageNumberChange"
      :current-page="pageNumber"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      background
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { debounce, formatDate, sleep } from "./../utils/utils";
import {
  getWarningAlarmLevel,
  getWarningAlarmComponent,
  getWarningMessage,
} from "../api/index";
import { onMounted, onUnmounted, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
export default {
  name: "WarningMessage",
  setup() {
    onMounted(() => {
      window.addEventListener("resize", getMaxHeight);
      getMaxHeight();
      getLevels();
      getTypes();
    });
    onUnmounted(() => window.removeEventListener("resize", getMaxHeight));
    const state = reactive({
      maxHeight: null,
      date: "",
      level: "",
      levels: [],
      type: "",
      types: [],
      warningMessage: [],
      totalCount: 0,
      pageSize: 100,
      pageNumber: 1,
      isLoading: false,
    });
    const getMaxHeight = debounce(function () {
      const viewHeight = document.body.offsetHeight;
      state.maxHeight = viewHeight * 0.8;
    });
    function formatLevelItem(o) {
      const tempObject = {};
      for (const key in o) {
        if (+o[key] >= 0) {
          tempObject.levelCode = o[key];
          tempObject.levelText = "等级 " + o[key];
        }
      }
      return tempObject;
    }
    function formatLevels(levelArr) {
      const arr = [];
      for (let i = 0; i < levelArr.length; i++) {
        const o = formatLevelItem(levelArr[i]);
        arr.push(o);
      }
      return arr;
    }
    async function getLevels() {
      const result = await getWarningAlarmLevel();
      if (result.status === 200) {
        state.levels = formatLevels(result.data);
      }
    }
    function onLevelChange(curLevel) {
      console.log("cur level -- ", curLevel, "state.level", state.level);
    }
    function formatTypeItem(o) {
      const tempObject = {};
      for (const key in o) {
        if (o[key]) {
          tempObject.typeCode = o[key];
          tempObject.typeText = key;
        }
      }
      return tempObject;
    }
    function formatTypes(typeArr) {
      const arr = [];
      for (let i = 0; i < typeArr.length; i++) {
        const o = formatTypeItem(typeArr[i]);
        arr.push(o);
      }
      return arr;
    }
    async function getTypes() {
      const result = await getWarningAlarmComponent();
      if (result.status === 200) {
        state.types = formatTypes(result.data);
      }
    }
    function onTypeChange(curType) {
      console.log("type value -- ", curType, state.type);
    }
    function onDateChange(dates) {
      if (!dates) return;
      let [st, et] = dates;
      st = formatDate(st, "yyyy-MM-dd HH:mm:ss");
      et = formatDate(et, "yyyy-MM-dd HH:mm:ss");
      console.log("st", st, "et", et);
    }
    function onPageSizeChange(curPageSize) {
      console.log(state.pageSize, "curPageSize", curPageSize);
      state.pageSize = curPageSize;
      state.pageNumber = 1;
      search();
    }
    const onPageNumberChange = debounce(function (curPageNumber) {
      console.log(state.pageNumber, "curPageNumber", curPageNumber);
      state.pageNumber = curPageNumber;
      search();
    }, 500);
    function search() {
      debugger;
      if (state.level !== "" && state.type !== "" && state.date !== "") {
        const option = {
          startTime: formatDate(state.date[0], "yyyy-MM-dd HH:mm:ss"),
          endTime: formatDate(state.date[1], "yyyy-MM-dd HH:mm:ss"),
          level: state.level,
          typeCode: state.type,
          pageNumber: state.pageNumber,
          pageSize: state.pageSize,
        };
        getWarnings(option);
      } else {
        ElMessage.error({
          message: "级别&类别&时间范围必选",
          showClose: true,
        });
      }
    }
    async function getWarnings(option) {
      if (state.isLoading) {
        ElMessage.warning({
          message: "您的操作太快了~",
        });
        return;
      }
      state.isLoading = true;
      const result = await getWarningMessage(option);
      if (result.status === 200) {
        state.warningMessage = result.data?.dataArray?.slice(0, state.pageSize);
        state.totalCount = result.data?.totalCount < 1000 ? 1000 : 100;
      }
      await sleep(1000);
      state.isLoading = false;
    }
    return {
      onLevelChange,
      onTypeChange,
      ...toRefs(state),
      onDateChange,
      search,
      onPageSizeChange,
      onPageNumberChange,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
