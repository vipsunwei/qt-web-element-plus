<template>
  <div class="home" v-loading="isLoading">
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      unlink-panels
      @change="handleDatePickerChange"
    >
    </el-date-picker>

    <div v-if="isShowSelectTkyid" style="padding: 20px 0">探空仪编号</div>
    <el-select
      v-if="isShowSelectTkyid"
      v-model="tkyid"
      filterable
      :remote="false"
      placeholder="请选择探空仪编号"
      @change="handleTkyidChange"
    >
      <el-option
        v-for="item in tkyids"
        :key="item.tkyid"
        :label="item.tkyid"
        :value="item.tkyid"
      >
      </el-option>
    </el-select>

    <div v-if="!isRadioDisabled" style="padding: 20px 0">选择查询数据类型</div>
    <el-radio-group
      v-if="!isRadioDisabled"
      v-model="dataType"
      :disabled="isRadioDisabled"
      @change="handleDataTypeChange"
    >
      <el-radio-button label="探测数据"></el-radio-button>
      <el-radio-button label="瞬时值"></el-radio-button>
      <el-radio-button label="基测报告"></el-radio-button>
    </el-radio-group>

    <div v-if="isTCSJ" style="margin-top: 20px">
      <el-date-picker
        v-model="dateForTCSJ"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :unlink-panels="false"
        :disabled-date="disabledDate"
        @change="handleDateForTCSJChange"
      >
      </el-date-picker>
      <el-table
        :data="tableData"
        :max-height="maxHeight"
        border
        stripe
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column
          v-for="col in tkyDataColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        @size-change="handlePageSizeChange"
        @current-change="handlePageNumberChange"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="pageSize"
        :current-page="pageNumber"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      >
      </el-pagination>
    </div>
    <div v-else-if="isSSZ" style="margin-top: 20px">
      <el-table :data="instantInfo" :show-header="false" border stripe>
        <el-table-column prop="label"> </el-table-column>
        <el-table-column prop="value"> </el-table-column>
      </el-table>
    </div>
    <div v-else-if="isJCBG" style="margin-top: 20px">
      <el-table :data="baseTestReport" :show-header="false" border stripe>
        <el-table-column prop="label"> </el-table-column>
        <el-table-column prop="value"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref, toRefs } from "vue";
import { debounce, formatDate, sleep } from "../utils/utils.js";
import {
  getBaseTestReport,
  getInstantInfo,
  getTkyData,
  getTkyInfo,
} from "../api/index.js";

export default {
  name: "Home",
  components: {},
  setup() {
    onMounted(() => {
      window.addEventListener("resize", getMaxHeight);
      getMaxHeight();
    });
    onUnmounted(() => window.removeEventListener("resize", getMaxHeight));
    const getMaxHeight = debounce(function () {
      const viewHeight = window.document.body.offsetHeight;
      maxHeight.value = viewHeight * 0.7;
      console.log(maxHeight.value);
    });
    /** 时间选择框 */
    const date = ref("");
    const tkyids = ref([]);
    async function handleDatePickerChange(dates) {
      if (!dates) {
        return;
      }
      let [st, et] = dates;
      st = formatDate(st, "yyyy-MM-dd HH:mm:ss");
      et = formatDate(et, "yyyy-MM-dd HH:mm:ss");
      if (state.isLoading) return;
      state.isLoading = true;
      const result = await getTkyInfo(st, et);
      console.log(result);
      if (result.status === 200) {
        tkyids.value = result.data;
      } else {
        alert("请求失败");
      }
      state.isLoading = false;
    }
    /** 探空仪编号 */
    const isShowSelectTkyid = computed(() => tkyids.value.length);
    const tkyid = ref("");
    function handleTkyidChange(curTkyid) {
      console.log(curTkyid, " --- curTkyid");
      console.log(tkyid.value, " --- tkyid.value");
      // tkyid.value = curTkyid;
      dataType.value = "";
      state.dateForTCSJ = "";
      state.pageSize = 100;
      state.pageNumber = 1;
    }
    /** 选择查询数据类型 */
    const isRadioDisabled = computed(() => !tkyid.value);
    const dataType = ref("");
    const isTCSJ = computed(() => dataType.value === "探测数据");
    const isSSZ = computed(() => dataType.value === "瞬时值");
    const isJCBG = computed(() => dataType.value === "基测报告");
    function handleDataTypeChange(value) {
      switch (value) {
        case "基测报告":
          showBaseTestReport();
          break;
        case "瞬时值":
          showInstantInfo();
          break;
        case "探测数据":
          showTkyData();
          break;
      }
    }
    /** 基测报告 start */
    const jcResultRecordColumns = {
      tkyid: "探空仪id",
      jcxPressure: "基测箱压力",
      jcxTemperature: "基测箱温度",
      jcxHumidity: "基测箱湿度",
      tkyPressure: "探空仪压力",
      tkyTemperature: "探空仪温度",
      tkyHumidity: "探空仪湿度",
      diffPressure: "压力差值",
      diffTemperature: "温度差值",
      diffHumidity: "湿度差值",
      passedPressure: "压力是否通过",
      passedTemperature: "温度是否通过",
      passedHumidity: "湿度是否通过",
      passed: "是否通过",
      cTime: "创建时间",
    };
    const baseTestReport = ref(null);
    async function showBaseTestReport() {
      if (state.isLoading) return;
      state.isLoading = true;
      const result = await getBaseTestReport(tkyid.value);
      const jcResultRecord = result.data?.jcResultRecord;
      if (!jcResultRecord.ctime) {
        jcResultRecord.ctime = result.data?.ctime;
      }
      jcResultRecord.cTime = formatDate(
        new Date(jcResultRecord.ctime),
        "yyyy-MM-dd HH:mm:ss"
      );
      const baseTestReportFormatted = [];
      for (const key in jcResultRecord) {
        if (jcResultRecordColumns[key]) {
          baseTestReportFormatted.push({
            label: jcResultRecordColumns[key],
            value: passedfilter(key, jcResultRecord[key]),
          });
        }
      }
      baseTestReport.value = baseTestReportFormatted;
      await sleep(1000);
      state.isLoading = false;
    }
    function passedfilter(key, value) {
      if (key.startsWith("passed")) {
        return value === true ? "是" : "否";
      }
      return value;
    }
    /** 瞬时值 start */
    const instantInfoColumns = {
      tkyid: "探空仪Id",
      pressure: "压强",
      temperature: "温度",
      humidity: "湿度",
      windSpeed: "风速",
      windDirection: "风向",
      cloudiness: "云量",
      cloudHeight: "云高",
      cloudform: "云状",
      weatherPhenomenon: "天气现象",
      visibility: "能见度",
      memo: "瞬时信息备忘录",
    };
    const instantInfo = ref(null);
    async function showInstantInfo() {
      if (state.isLoading) return;
      state.isLoading = true;
      const result = await getInstantInfo(tkyid.value);
      const data = result.data;
      const instantInfoFormatted = [];
      for (const key in data) {
        if (instantInfoColumns[key]) {
          instantInfoFormatted.push({
            label: instantInfoColumns[key],
            value: data[key],
          });
        }
      }
      instantInfo.value = instantInfoFormatted;
      await sleep(1000);
      state.isLoading = false;
    }
    /** 探测数据 start */
    const tkyData = ref({
      dataArray: [],
      totalCount: 0,
      pageSize: 100,
    });
    const state = reactive({
      dateForTCSJ: "",
      startTime: "",
      endTime: "",
      pageSize: 100,
      pageNumber: 1,
      isShowTable: false,
      isLoading: false,
    });
    const tableData = computed(
      () => tkyData.value?.dataArray?.slice(0, state.pageSize) || []
    );
    const totalCount = computed(() => tkyData.value?.totalCount || 0);
    const maxHeight = ref("100vh");
    /** 探测数据 - 时间选择框 */
    function handleDateForTCSJChange(dates) {
      if (!dates) {
        return;
      }
      // const [st, et] = dates;
      // state.startTime = formatDate(st, "yyyy-MM-dd HH:mm:ss");
      // state.endTime = formatDate(et, "yyyy-MM-dd HH:mm:ss");
      state.pageNumber = 1;
      showTkyData();
    }
    function disabledDate(time) {
      let st = date.value[0].getTime();
      let et = date.value[1].getTime();
      return time.getTime() > et || time.getTime() < st;
    }
    /** 探测数据 - 分页器 */
    function handlePageSizeChange(value) {
      state.pageSize = value;
      state.pageNumber = 1;
      showTkyData();
    }
    const handlePageNumberChange = debounce(function (value) {
      state.pageNumber = value;
      showTkyData();
    });
    const tkyDataColumns = [
      {
        prop: "tkyid",
        label: "探空仪id",
      },
      {
        prop: "stationNumber",
        label: "台站号",
      },
      {
        prop: "freqz",
        label: "freqz",
      },
      {
        prop: "dataTime",
        label: "dataTime",
      },
      {
        prop: "lng",
        label: "lng",
      },
      {
        prop: "ctime",
        label: "创建时间",
      },
    ];

    async function showTkyData() {
      if (state.isLoading) return;
      state.isLoading = true;
      state.dateForTCSJ = state.dateForTCSJ || date.value;
      state.startTime = formatDate(state.dateForTCSJ[0], "yyyy-MM-dd HH:mm:ss");
      state.endTime = formatDate(state.dateForTCSJ[1], "yyyy-MM-dd HH:mm:ss");
      const option = {
        tkyid: tkyid.value,
        startTime: state.startTime,
        endTime: state.endTime,
        pageSize: state.pageSize,
        pageNumber: state.pageNumber,
      };
      await sleep(1500);
      const result = await getTkyData(option);
      tkyData.value = result.data;
      state.isLoading = false;
    }

    return {
      date,
      tkyid,
      tkyids,
      isShowSelectTkyid,
      handleDatePickerChange,
      handleTkyidChange,
      isRadioDisabled,
      dataType,
      handleDataTypeChange,
      isTCSJ,
      isSSZ,
      isJCBG,
      baseTestReport,
      instantInfo,
      ...toRefs(state),
      tableData,
      tkyDataColumns,
      totalCount,
      handleDateForTCSJChange,
      handlePageSizeChange,
      handlePageNumberChange,
      disabledDate,
      maxHeight,
    };
  },
};
</script>
