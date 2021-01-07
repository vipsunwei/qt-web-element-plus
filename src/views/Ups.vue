<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0">
      <el-button type="primary" @click="back"> 返回 </el-button>
    </el-col>
  </el-row>

  <div class="ups">
    <el-row>
      <el-col
        class="col"
        :span="12"
        :offset="0"
        v-for="item in upsInfo"
        :key="item.param"
      >
        <span class="ups-name">{{ item.name }}({{ item.param }})：</span>
        <span>{{ item.value }} {{ item.unit }}</span>
      </el-col>
    </el-row>
  </div>

  <div class="ups" v-loading="loading">
    <el-row>
      <el-col
        class="col"
        :span="12"
        :offset="0"
        v-for="item in ups"
        :key="item.param"
      >
        <span class="ups-name">{{ item.name }}：</span>
        <el-switch
          :disabled="disabled && item.param !== 'MAIN'"
          v-model="item.status"
          active-text="开"
          inactive-text="关"
          @change="onUpsChange($event, item)"
        >
        </el-switch>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { toRefs, onMounted, onUnmounted, reactive } from "vue";
import eventbusClient from "vertx3-eventbus-client";
import { useRouter } from "vue-router";
import useUps from "../hooks/useUps";
import { getUpsInfoMap } from "../data-map/ups";
export default {
  name: "Ups",
  setup() {
    onMounted(() => {
      listenEventBus();
    });
    onUnmounted(() => {
      removeListenEventBus();
    });
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
            "模拟eventbus -- upsInfo: ",
            require("../data/eventbus").default.upsInfo
          );
          handleUpsInfo(require("../data/eventbus").default.upsInfo);
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
          eb.registerHandler("PowerInfo", function (err, msg) {
            console.log("PowerInfo err -- ", err);
            console.log("PowerInfo message -- ", JSON.parse(msg.body)); // 在这里对接收的数据进行一些操作
            handleUpsInfo(JSON.parse(msg.body));
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
    const IS_MOCK = true;
    let eb = null;
    let timer = null;
    const { upsState, onUpsChange } = useUps();
    const router = useRouter();
    function back() {
      router.go(-1);
    }
    const upsInfoState = reactive({
      upsInfo: upsInfoInit(),
    });
    function upsInfoInit() {
      return Object.values(getUpsInfoMap());
    }
    function handleUpsInfo(upsInfo) {
      for (const key in upsInfo) {
        const cur = upsInfoState.upsInfo.find((value) => value.param === key);
        cur && (cur.value = upsInfo[key]);
      }
    }

    return { ...toRefs(upsState), onUpsChange, back, ...toRefs(upsInfoState) };
  },
};
</script>

<style lang="scss" scoped>
.ups {
  color: #333;
  border: 1px solid #dcdfe6;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  .col {
    height: 40px;
    display: flex;
    align-items: center;

    .ups-name {
      display: inline-block;
      width: 60%;
    }
  }
}
</style>