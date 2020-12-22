<template>
  <!-- 环境检测要素 -->
  <div style="margin-top: 0px">
    <div class="title">环境检测要素</div>
    <div class="border p-10" style="color: #606266">
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房总管道压力：</el-col>
            <el-col :span="12" class="p-10">1000 kPa</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">操作室烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">放球仓烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境设备状态：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境温度：</el-col>
            <el-col :span="12" class="p-10">28 ℃</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">环境湿度：</el-col>
            <el-col :span="12" class="p-10">20 %RH</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">操作室水浸传感器：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房氢气1浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房氢气2浓度：</el-col>
            <el-col :span="12" class="p-10">1000 Ppm</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房支路1管道压力：</el-col>
            <el-col :span="12" class="p-10">1000 kPa</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房支路2管道压力：</el-col>
            <el-col :span="12" class="p-10">1000 kPa</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房烟雾报警器：</el-col>
            <el-col :span="12" class="p-10">不报警</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">氢气房水浸传感器：</el-col>
            <el-col :span="12" class="p-10">正常</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">仓顶秒风风速：</el-col>
            <el-col :span="12" class="p-10">1 m/s</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10">仓顶秒风风向：</el-col>
            <el-col :span="12" class="p-10">100 °</el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row>
            <el-col :span="12" class="p-10"></el-col>
            <el-col :span="12" class="p-10"></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- 阈值设置 -->
  <div style="margin-top: 20px">
    <div class="title">阈值设置</div>
    <el-form
      :model="threshold"
      :rules="thresholdRules"
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item label="氢气浓度上限(0-9999Ppm):" prop="GNZA">
            <el-input v-model.number="threshold.GNZA"></el-input>
          </el-form-item>
          <el-form-item label="管道压力上限(0-30000kPa):" prop="GNZB">
            <el-input v-model.number="threshold.GNZB"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="烟雾报警器上限(0-5000Ppm):" prop="GNZC">
            <el-input v-model.number="threshold.GNZC"></el-input>
          </el-form-item>
          <el-form-item label="开启时间上限设置(0-1800S):" prop="GNZE">
            <el-input v-model.number="threshold.GNZE"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="margin-bottom: 0">
        <el-button @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 安全阀门开关 -->
  <div style="margin-top: 20px">
    <div class="title">安全阀门开关</div>
    <el-form
      :model="valve"
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item label="总阀门:" prop="GNZD">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="valve.GNZD"
              active-text="开"
              inactive-text="关"
              :disabled="GNZDDisabled"
              @change="onValveStateChange($event, 'GNZD')"
            ></el-switch>
            <i
              v-show="valve.warningGNZD"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
          <el-form-item label="支路1阀门:" prop="GNZF">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="valve.GNZF"
              active-text="开"
              inactive-text="关"
              :disabled="GNZFDisabled"
              @change="onValveStateChange($event, 'GNZF')"
            ></el-switch>
            <i
              v-show="valve.warningGNZF"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="支路2阀门:" prop="GNZG">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="valve.GNZG"
              active-text="开"
              inactive-text="关"
              :disabled="GNZGDisabled"
              @change="onValveStateChange($event, 'GNZG')"
            ></el-switch>
            <i
              v-show="valve.warningGNZG"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
          <el-form-item label="安全阀:" prop="GNZI">
            <svg
              style="vertical-align: middle"
              t="1607683926625"
              class="icon"
              viewBox="0 0 1137 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="941"
              width="24"
              height="24"
            >
              <path
                d="M511.650982 227.403885V113.684852H170.562245A56.842426 56.842426 0 1 1 170.562245 0h795.862325a56.842426 56.842426 0 1 1 0 113.684852H625.506737v113.719033h56.842426a56.876607 56.876607 0 0 1 56.876607 56.842426v170.561458h66.51555a170.595639 170.595639 0 0 1 331.552335 56.842426v341.088737a170.527278 170.527278 0 0 1-331.552335 56.842426H331.553121a170.62982 170.62982 0 0 1-331.552335-56.842426v-341.088737a170.561459 170.561459 0 0 1 331.552335-56.842426h66.48137v-170.561458a56.876607 56.876607 0 0 1 56.876607-56.842426z m-56.842426 341.088736H341.089523v227.403885h454.807769v-227.403885z m-227.403885-56.842426a56.876607 56.876607 0 0 0-113.719033 0v341.088737a56.876607 56.876607 0 0 0 113.719033 0z m682.177473 341.088737a56.876607 56.876607 0 0 0 113.719033 0v-341.088737a56.876607 56.876607 0 0 0-113.719033 0zM511.650982 454.807769H625.506737V341.088737h-113.855755z m0 0"
                p-id="942"
                fill="#707070"
              ></path>
            </svg>
            <el-switch
              style="margin: 0 20px"
              v-model="valve.GNZI"
              active-text="开"
              inactive-text="关"
              :disabled="GNZIDisabled"
              @change="onValveStateChange($event, 'GNZI')"
            ></el-switch>
            <i
              v-show="valve.warningGNZI"
              class="el-icon-warning"
              style="color: #f40; font-size: 24px; vertical-align: middle"
              title="异常"
            ></i>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <!-- 报警使能复位开关 -->
  <div style="margin-top: 20px">
    <div class="title">报警使能复位开关</div>
    <el-form
      label-width="240px"
      :inline="false"
      style="border: 1px solid #dcdfe6; padding: 20px"
    >
      <el-row>
        <el-col
          :span="12"
          :offset="0"
          v-for="(col, index) in enableResetData"
          :key="index"
        >
          <el-form-item
            v-for="item in col"
            :key="item.param"
            :label="item.name + ':'"
          >
            <el-row>
              <el-col :span="12" :offset="0">
                <el-form-item :prop="item.param">
                  <el-switch
                    v-model="item.state"
                    active-text="开"
                    inactive-text="关"
                    @change="onEnableChange($event, item.param)"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-button
                  class="reset_button"
                  circle
                  type="primary"
                  :disabled="!item.state"
                >
                  复位
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, toRefs } from "vue";
import {
  getResetEnableParam,
  getEnable,
  setEnable,
  setValveState,
} from "../api/envCheck";
import { getEnableResetDataMap, getValveTypes } from "../data-map/envCheck";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const state = reactive({
      // 阈值数据
      threshold: {
        GNZA: "",
        GNZB: "",
        GNZC: "",
        GNZE: "",
      },
      // 阀门开关数据
      valve: {
        GNZD: false,
        GNZF: true,
        GNZG: false,
        GNZI: true,
        warningGNZD: true,
        warningGNZF: false,
        warningGNZG: true,
        warningGNZI: false,
      },
      // 使能复位开关数据
      enableResetData: [],
      // 阈值校验规则
      thresholdRules: {
        GNZA: [
          { type: "number", message: "规定范围0-9999" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 9999) {
                return callback(new Error("规定范围0-9999"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
        GNZB: [
          { type: "number", message: "规定范围0-30000" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 30000) {
                return callback(new Error("规定范围0-30000"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
        GNZC: [
          { type: "number", message: "规定范围0-5000" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 5000) {
                return callback(new Error("规定范围0-5000"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
        GNZE: [
          { type: "number", message: "规定范围0-1800" },
          {
            validator: function (rule, value, callback) {
              if (value < 0 || value > 1800) {
                return callback(new Error("规定范围0-1800"));
              }
              callback();
            },
            trigger: ["blur", "change"],
          },
        ],
      },
    });
    // 安全阀门开关
    const GNZDDisabled = computed(() => state.valve.warningGNZD);
    const GNZFDisabled = computed(() => state.valve.warningGNZF);
    const GNZGDisabled = computed(() => state.valve.warningGNZG);
    const GNZIDisabled = computed(() => state.valve.warningGNZI);
    /**
     * 设置阈值范围
     */
    function submit() {
      console.log("state.threshold -- ", state.threshold);
      ElMessage({
        type: "info",
        message: "提交阈值范围",
      });
    }

    /**
     * 设置阀门开关
     */
    function onValveStateChange(value, name) {
      if (state.valve["warning" + name]) {
        return;
      }
      const valveState = value ? 1 : 0;
      const valveType = getValveTypes()[name].type;
      const actionName = !!value ? "打开" : "关闭";
      const valveName = getValveTypes()[name].name;
      setValveState(valveType, valveState).then((r) => {
        console.log("setValveState result: ", r);
        const message = `${actionName}${valveName}${
          r.setValveState ? "成功" : "失败"
        }`;
        const type = r.setValveState ? "success" : "error";
        ElMessage({
          type: type,
          message: message,
          duration: 2000,
        });
      });
    }
    /**
     * 设置使能开关
     */
    function onEnableChange(value, name) {
      console.log(name, ":", value);
      let arr = [...state.enableResetData[0], ...state.enableResetData[1]];
      arr = arr.filter((value) => value.state);
      let s = arr.reduce((prev, curr) => {
        return prev + "," + curr.param;
      }, "");
      s = s.slice(1);

      console.log("string: ", s);
      setEnable(s).then((res) => {
        console.log(res);
        if (res.setEnable) {
          ElMessage.success({
            message: "操作成功",
            duration: 2000,
          });
          console.log(state.enableResetData);
        } else {
          ElMessage.warning({
            message: "操作失败",
            duration: 3000,
          });
          const [left, right] = state.enableResetData;
          let enable = left.find((value) => value.param === name);
          if (enable) {
            enable.state = !value;
            return;
          }
          enable = right.find((value) => value.param === name);
          enable.state = !value;
        }
      });
    }
    /**
     * 获取全部使能和存活使能
     */
    async function getEnableData() {
      let params = await getResetEnableParam();
      params = params.map(({ param }) => {
        const item = getEnableResetDataMap()[param];
        return {
          id: item.id,
          name: item.name,
          state: item.state,
          param,
        };
      });

      const enables = await getEnable();
      enables.map(({ param }) => {
        const cur = params.find((value) => {
          return value.param === param;
        });
        cur.state = true;
      });

      state.enableResetData = generateEnableResetData(params);
    }
    function generateEnableResetData(arr) {
      const splitPoint = Math.ceil(arr.length / 2);
      const left = arr.slice(0, splitPoint);
      const right = arr.slice(splitPoint);
      return [left, right];
    }
    onMounted(() => {
      getEnableData();
      listenEnvironmentalInfo();
    });
    onUnmounted(() => {
      removeListenEnvironmentalInfo();
    });
    function removeListenEnvironmentalInfo() {
      timer && clearInterval(timer);
      timer = null;
      // console.log(eb);
      // eb.close && typeof eb.close === "function" && eb.close();
    }

    let eb = null;
    let timer = null;
    function listenEnvironmentalInfo() {
      timer && clearInterval(timer);
      timer = setInterval(() => {
        console.log("模拟eventbus");
      }, 30000);
      /** *
      const host = process.env.VUE_APP_EVENT_BUS;
      const options = {
        vertxbus_reconnect_attempts_max: 5, // Max reconnect attempts
        vertxbus_reconnect_delay_min: 1000, // Initial delay (in ms) before first reconnect attempt
        vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
        vertxbus_reconnect_exponent: 2, // Exponential backoff factor
        vertxbus_randomization_factor: 0.5 // Randomization factor between 0 and 1
      };
      eb = new eventbusClient(`${host}/eventbus`, options);
      eb.enableReconnect(true);
      eb.onopen = function() {
        // 监听数据
        eb.registerHandler("EnvironmentalInfo", function(err, msg) {
          console.log("Warning err -- ", err);
          console.log("Warning message -- ", msg); // 在这里对接收的数据进行一些操作
          showWarnings(JSON.parse(msg.body));
        });
        // eb.publish("chat.to.server","RequestTrailData");//这行代码可以发送信息给服务端
      };
      eb.onreconnect = function(err, msg) {
        console.log("onreconnect err -- ", err);
        console.log("onreconnect msg -- ", msg);
      }; // Optional, will only be called on reconnections
      eb.onerror = function(err, msg) {
        console.log("onerror err -- ", err);
        console.log("onerror msg -- ", msg);
      };
      /**/
    }

    return {
      ...toRefs(state),
      submit,
      onValveStateChange,
      onEnableChange,
      GNZDDisabled,
      GNZFDisabled,
      GNZGDisabled,
      GNZIDisabled,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 18px;
  color: #606266;
  padding: 20px;
}
.w-60 {
  width: 60%;
}
.d-inline-block {
  display: inline-block;
}
.p-10 {
  padding: 10px;
}
.border {
  border: 1px solid #dcdfe6;
}
.border-bottom {
  border-bottom: 1px solid #dcdfe6;
}
.border-right {
  border-right: 1px solid #dcdfe6;
}
.border-left {
  border-left: 1px solid #dcdfe6;
}
.border-top {
  border-top: 1px solid #dcdfe6;
}
.reset_button {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0;
  font-size: 12px;
}
</style>