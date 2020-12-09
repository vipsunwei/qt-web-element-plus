<template>
  <div class="alert">
    <!-- 存活告警信息列表 -->
    <active-warning-message></active-warning-message>
    <!-- 筛选全部告警信息 -->
    <warning-message></warning-message>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import ActiveWarningMessage from "../components/ActiveWarningMessage.vue";
import WarningMessage from "../components/WarningMessage.vue";
import { onMounted, onUnmounted } from "vue";
import eventbusClient from "vertx3-eventbus-client";
export default {
  components: {
    ActiveWarningMessage,
    WarningMessage,
  },
  setup() {
    const warning = {
      id: 6,
      alarm: {
        alarmComponent: "RECEIVER",
        alarmLevel: "VERY_SERIOUS",
        alarmName: "接收机频谱数据到报率不足",
        key: "1_4_接收机频谱数据到报率不足",
      },
      startTime: 1606537349016,
      endTime: null,
      alarmDetail: "频谱数据30秒内数据数量小于25条",
      status: 1,
      ackTime: null,
      ackUser: null,
      ctime: 1606537351908,
      mtime: 1606537351908,
    };
    let eb = null;
    onMounted(() => {
      listenWarnings();
    });
    onUnmounted(() => {
      removeListenWarning();
    });
    function removeListenWarning() {
      timer && clearInterval(timer);
      timer = null;
      console.log(eb);
      eb.close && typeof eb.close === "function" && eb.close();
    }
    let timer = null;
    function listenWarnings() {
      timer = setInterval(() => {
        showWarnings(warning);
        console.log(111);
      }, 30000);
      const host = process.env.VUE_APP_HOST;
      const options = {
        vertxbus_reconnect_attempts_max: 5, // Max reconnect attempts
        vertxbus_reconnect_delay_min: 1000, // Initial delay (in ms) before first reconnect attempt
        vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
        vertxbus_reconnect_exponent: 2, // Exponential backoff factor
        vertxbus_randomization_factor: 0.5, // Randomization factor between 0 and 1
      };
      eb = new eventbusClient(`${host}/eventbus`, options);
      eb.enableReconnect(true);
      eb.onopen = function () {
        // 监听数据
        eb.registerHandler("Warning", function (err, msg) {
          console.log("Warning err -- ", err);
          console.log("Warning message -- ", msg); // 在这里对接收的数据进行一些操作
          showWarnings(msg.body);
        });
        // eb.publish("chat.to.server","RequestTrailData");//这行代码可以发送信息给服务端
      };
      eb.onreconnect = function (err, msg) {
        console.log("onreconnect err -- ", err);
        console.log("onreconnect msg -- ", msg);
      }; // Optional, will only be called on reconnections
      eb.onerror = function (err, msg) {
        console.log("onerror err -- ", err);
        console.log("onerror msg -- ", msg);
      };
    }
    let notificationInstance = null;
    function showWarnings(o) {
      const alarm = o.alarm;
      const colorMap = {
        VERY_SERIOUS: { background: "#f40", color: "#fff" },
      };
      notificationInstance = ElNotification({
        title: alarm.alarmComponent,
        message: `<div style="display:inline-block;background-color: ${
          colorMap[alarm.alarmLevel].background
        };color: ${colorMap[alarm.alarmLevel].color};">${
          alarm.alarmName
        }</div>`,
        dangerouslyUseHTMLString: true,
        onClick: function () {
          closeWarnings();
        },
      });
    }
    function closeWarnings() {
      notificationInstance.close();
    }
  },
};
</script>

<style lang="scss" scoped>
.alert {
  width: 100%;
  height: 100%;
}
</style>