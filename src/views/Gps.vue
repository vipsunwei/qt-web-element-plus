<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0">
      <el-button type="primary" @click="back"> 返回 </el-button>
    </el-col>
  </el-row>

  <div class="gps">
    <el-row>
      <el-col
        class="col"
        :span="12"
        :offset="0"
        v-for="item in gpsInfo"
        :key="item.key"
      >
        <span class="name">{{ item.name }}:</span>
        <span>{{ item.value }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getGpsInfoMap } from "../data-map/gps";
import eventbusClient from "vertx3-eventbus-client";

export default defineComponent({
  name: "Gps",
  setup() {
    onMounted(() => {
      listenEventBus();
    });
    onUnmounted(() => {
      removeListenEventBus();
    });
    const IS_MOCK = true;
    let timer = null;
    let eb = null;
    // 移除event bus监听
    function removeListenEventBus() {
      if (IS_MOCK) {
        timer && clearInterval(timer);
        timer = null;
      } else {
        // console.log(eb);
        eb.close && typeof eb.close === "function" && eb.close();
      }
    }
    // 添加event bus监听
    function listenEventBus() {
      if (IS_MOCK) {
        timer && clearInterval(timer);
        timer = setInterval(() => {
          console.log(
            "模拟eventbus -- gpsInfo: ",
            require("../data/eventbus").default.gpsInfo
          );
          handleGpsInfo(require("../data/eventbus").default.gpsInfo);
        }, 1000);
      } else {
        //** *
        const host = process.env.VUE_APP_EVENT_BUS;
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
          eb.registerHandler("GPS", function (err, msg) {
            console.log("PowerInfo err -- ", err);
            console.log("PowerInfo message -- ", JSON.parse(msg.body)); // 在这里对接收的数据进行一些操作
            handleGpsInfo(JSON.parse(msg.body));
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
        /**/
      }
    }
    function handleGpsInfo(gpsInfo) {
      for (const key in gpsInfo) {
        const cur = gpsInfoState.gpsInfo.find((value) => value.key === key);
        cur && (cur.value = gpsInfo[key]);
      }
    }
    const gpsInfoState = reactive({
      gpsInfo: gpsInfoInit(),
    });
    const router = useRouter();
    function back() {
      router.go(-1);
    }
    function gpsInfoInit() {
      return Object.values(getGpsInfoMap());
    }
    return { ...toRefs(gpsInfoState), back };
  },
});
</script>

<style lang="scss" scoped>
.gps {
  color: #333;
  border: 1px solid #dcdfe6;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  .col {
    height: 40px;
    display: flex;
    align-items: center;

    .name {
      display: inline-block;
      width: 60%;
    }
  }
}
</style>