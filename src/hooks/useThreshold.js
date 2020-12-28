import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  getSmokeThreshold,
  getPressThreshold,
  getHydrogenThreshold,
  getOpenTimeThreshold,
  setSmokeThreshold,
  setPressThreshold,
  setHydrogenThreshold,
  setOpenTimeThreshold,
} from "../api/envCheck";
import { debounce } from "../utils/utils";

/**
 * 阈值范围
 * @returns {object} { thresholdState, onThresholdSubmit }
 */
export default function useThreshold() {
  onMounted(() => getThreshold());
  /**
   * 阈值数据初始化
   */
  const thresholdState = reactive({
    // 阈值数据
    threshold: {
      hydrogen: "",
      press: "",
      smoke: "",
      openTime: "",
    },
    // 阈值校验规则
    thresholdRules: {
      hydrogen: [
        { type: "number", message: "规定范围0-9999" },
        {
          validator: function(rule, value, callback) {
            if (value < 0 || value > 9999) {
              return callback(new Error("规定范围0-9999"));
            }
            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      press: [
        { type: "number", message: "规定范围0-30000" },
        {
          validator: function(rule, value, callback) {
            if (value < 0 || value > 30000) {
              return callback(new Error("规定范围0-30000"));
            }
            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      smoke: [
        { type: "number", message: "规定范围0-5000" },
        {
          validator: function(rule, value, callback) {
            if (value < 0 || value > 5000) {
              return callback(new Error("规定范围0-5000"));
            }
            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      openTime: [
        { type: "number", message: "规定范围0-1800" },
        {
          validator: function(rule, value, callback) {
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
  /**
   * 备份一份阈值数据用于判断阈值是否有修改
   */
  const oldThresholdData = {
    smoke: "",
    press: "",
    hydrogen: "",
    openTime: "",
  };
  /**
   * 获取阈值范围并记录一份阈值数据用于判断是否修改了阈值
   */
  function getThreshold() {
    getSmokeThreshold().then((res) => {
      thresholdState.threshold.smoke = res.Threshold;
      oldThresholdData.smoke = res.Threshold;
    });
    getPressThreshold().then((res) => {
      thresholdState.threshold.press = res.Threshold;
      oldThresholdData.press = res.Threshold;
    });
    getHydrogenThreshold().then((res) => {
      thresholdState.threshold.hydrogen = res.Threshold;
      oldThresholdData.hydrogen = res.Threshold;
    });
    getOpenTimeThreshold().then((res) => {
      thresholdState.threshold.openTime = res.Threshold;
      oldThresholdData.openTime = res.Threshold;
    });
  }
  /**
   * 处理设置阈值范围
   * @description 做了防抖处理触发立即执行，1000毫秒内不重复触发
   */
  const onThresholdSubmit = debounce(
    function() {
      for (const key in oldThresholdData) {
        if (+oldThresholdData[key] !== thresholdState.threshold[key]) {
          thresholdFunctions[key](thresholdState.threshold[key]);
        }
      }
    },
    1000,
    true
  );
  function smokeFn(smoke) {
    setSmokeThreshold(smoke).then((res) => {
      console.log("set smoke result -- ", res);
      if (res.setSmokeThreshold) {
        oldThresholdData.smoke = smoke;
      } else {
        // thresholdState.threshold.smoke = oldThresholdData.smoke;
      }
      ElMessage({
        type: res.setSmokeThreshold ? "success" : "error",
        message: res.setSmokeThreshold
          ? "设置烟雾报警器上限成功"
          : "设置烟雾报警器上限失败",
        duration: res.setSmokeThreshold ? 2000 : 3000,
      });
    });
  }
  function pressFn(press) {
    setPressThreshold(press).then((res) => {
      console.log("set press result -- ", res);
      if (res.setPressThreshold) {
        oldThresholdData.press = press;
      } else {
        // thresholdState.threshold.press = oldThresholdData.press;
      }
      ElMessage({
        type: res.setPressThreshold ? "success" : "error",
        message: res.setPressThreshold
          ? "设置管道压力上限成功"
          : "设置管道压力上限失败",
        duration: res.setPressThreshold ? 2000 : 3000,
      });
    });
  }
  function hydrogenFn(hydrogen) {
    setHydrogenThreshold(hydrogen).then((res) => {
      console.log("set hydrogen result -- ", res);
      if (res.setHydrogenThreshold) {
        oldThresholdData.hydrogen = hydrogen;
      } else {
        // thresholdState.threshold.hydrogen = oldThresholdData.hydrogen;
      }
      ElMessage({
        type: res.setHydrogenThreshold ? "success" : "error",
        message: res.setHydrogenThreshold
          ? "设置氢气浓度上限成功"
          : "设置氢气浓度上限失败",
        duration: res.setHydrogenThreshold ? 2000 : 3000,
      });
    });
  }
  function openTimeFn(openTime) {
    setOpenTimeThreshold(openTime).then((res) => {
      console.log("set open time result -- ", res);
      if (res.setOpenTimeThreshold) {
        oldThresholdData.openTime = openTime;
      } else {
        // thresholdState.threshold.openTime = oldThresholdData.openTime;
      }
      ElMessage({
        type: res.setOpenTimeThreshold ? "success" : "error",
        message: res.setOpenTimeThreshold
          ? "设置时间上限成功"
          : "设置时间上限失败",
        duration: res.setOpenTimeThreshold ? 2000 : 3000,
      });
    });
  }
  /**
   * 阈值项与处理设置阈值的函数的对应关系
   * 方便在循环遍历中调用
   */
  const thresholdFunctions = {
    smoke: smokeFn,
    press: pressFn,
    hydrogen: hydrogenFn,
    openTime: openTimeFn,
  };

  return { thresholdState, onThresholdSubmit };
}
