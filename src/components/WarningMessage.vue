<template>
  <el-row :gutter="10">
    <el-col
      :span="6"
      :offset="0"
      :style="{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }"
    >
      级别
      <el-select
        style="width: 100%"
        v-model="level"
        placeholder="请选择级别(等级越高级别越高)"
        clearable
        filterable
        @change="onLevelChange"
      >
        <el-option label="所有" value=""></el-option>
        <el-option
          v-for="item in levels"
          :key="item.levelCode"
          :label="item.levelText"
          :value="item.levelCode"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col
      :span="6"
      :offset="0"
      :style="{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }"
    >
      类别
      <el-select
        style="width: 100%"
        v-model="type"
        placeholder="请选择类别"
        clearable
        filterable
        @change="onTypeChange"
      >
        <el-option label="所有" value=""></el-option>

        <el-option
          v-for="item in types"
          :key="item.typeCode"
          :label="item.typeText"
          :value="item.typeCode"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col
      :span="9"
      :offset="0"
      :style="{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }"
    >
      时间
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
    <el-col
      :span="3"
      :offset="0"
      align="center"
      :style="{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }"
    >
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
    <el-table :data="warningMessage" stripe>
      <el-table-column
        type="index"
        label="#"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="报警源">
        <template #default="scope">
          <span>{{ scope.row?.alarm?.alarmComponent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报警级别">
        <template #default="scope">
          <span>{{ levelsDict[scope.row?.alarm?.alarmLevel] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报警名称">
        <template #default="scope">
          <span>{{ scope.row?.alarm?.alarmName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span>{{
            scope.row?.status == 1
              ? "未处理"
              : scope.row?.status == 0
              ? "已处理"
              : scope.row?.status
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="确认时间">
        <template #default="scope">
          <span>{{ formatAckTime(scope.row?.ackTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="确认人">
        <template #default="scope">
          <span>{{ scope.row?.ackUser }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div
      :style="{
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
      }"
    >
      <el-pagination
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
      <el-button
        :style="{ marginLeft: '10px' }"
        type="primary"
        size="mini"
        @click="goFirst"
        :disabled="disabledGoFirst"
      >
        首页
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="goLast"
        :disabled="disabledGoLast"
      >
        末页
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { debounce, formatDate } from "./../utils/utils";
import {
  getWarningAlarmLevel,
  getWarningAlarmComponent,
  getWarningMessage,
  levelsDict,
} from "../api/index";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
} from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
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
      pageSize: 20,
      pageNumber: 1,
      isLoading: false,
      disabledGoFirst: computed(() => state.pageNumber === 1),
      disabledGoLast: computed(
        () => state.pageNumber === Math.ceil(state.totalCount / state.pageSize)
      ),
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
    function getLevels() {
      getWarningAlarmLevel().then((result) => {
        state.levels = formatLevels(result);
      });
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
    function getTypes() {
      getWarningAlarmComponent().then((result) => {
        state.types = formatTypes(result);
      });
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
      if (state.date !== "") {
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
        ElMessage.warning({ message: "时间范围必选" });
      }
    }
    function getWarnings(option) {
      if (state.isLoading) {
        // ElMessage.warning({
        //   message: "您的操作太快了~",
        // });
        return;
      }
      state.isLoading = true;
      getWarningMessage(option)
        .then((result) => {
          state.warningMessage = result?.dataArray?.slice(0, state.pageSize);
          state.totalCount = result?.totalCount;
        })
        .finally(() => {
          state.isLoading = false;
        });
    }

    function formatAckTime(ackTime) {
      if (!ackTime) return "";
      return formatDate(new Date(ackTime), "yyyy-MM-dd");
    }

    function goFirst() {
      if (state.pageNumber === 1) return;
      state.pageNumber = 1;
      search();
    }
    function goLast() {
      const last = Math.ceil(state.totalCount / state.pageSize);
      if (last === state.pageNumber) return;
      state.pageNumber = last;
      search();
    }
    return {
      onLevelChange,
      onTypeChange,
      ...toRefs(state),
      onDateChange,
      search,
      onPageSizeChange,
      onPageNumberChange,
      levelsDict,
      formatAckTime,
      goFirst,
      goLast,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
