import { onMounted, onUnmounted, reactive } from "vue";
import eventbusClient from "vertx3-eventbus-client";

/**
 * 使用event bus接收数据
 * @param {string} channel 通道名称
 * @param {boolean} IS_MOCK 是否使用模拟假数据
 * @param {string} mockDataName 假数据key名
 * @param {function} callback 处理event bus接收到的数据
 */
export default function useEventBus(channel, IS_MOCK, mockDataName, callback) {
  onMounted(() => listenEventBus());
  onUnmounted(() => removeListenEventBus());
  let timer = null;
  let eb = null;
  const timeout = 1000;
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
        const mockData = require("../data/eventbus").default[mockDataName];
        // mockData.id++;
        // mockData.ib = mockData.ib + 1;
        console.log(`模拟eventbus -- ${channel}: `, mockData);
        callback && typeof callback === "function" && callback(mockData);
        // state.msg = mockData;
      }, timeout);
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
      eb.onopen = function() {
        // 监听数据
        eb.registerHandler(channel, function(err, msg) {
          console.log(`${channel} err -- `, err);
          console.log(`${channel} message -- `, JSON.parse(msg.body)); // 在这里对接收的数据进行一些操作
          callback &&
            typeof callback === "function" &&
            callback(JSON.parse(msg.body));
          // state.msg = JSON.parse(msg.body);
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
  }
  // const state = reactive({
  //   msg: {},
  // });

  // return { state };
}
