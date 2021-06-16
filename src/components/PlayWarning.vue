<template>
  <teleport to="body">
    <video id="warningVideo" :muted="muted" controls autoplay>
      <source :src="warningUrl" />
    </video>
  </teleport>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, toRaw } from "vue";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import voiceMap from "../assets/voice/voiceMap.js";
import { componentNameDict } from "../api/index.js";
// import showWarnings from "../utils/warning/notification.js";

export default {
  name: "PlayWarning",
  setup() {
    const store = useStore();
    const warningUrl = ref("");
    const timerArr = ref([]);
    const isPlaying = ref(false);
    const muted = computed(() => store.state.warningMuted);
    const curAlarm = ref(null);
    onMounted(() => {
      document
        .querySelector("body")
        .addEventListener("click", onUserClickBody, false);
      document
        .querySelector("#warningVideo")
        .addEventListener("ended", onEnded, false);
      document
        .querySelector("#warningVideo")
        .addEventListener("error", onError, false);
      setTimeout(() => pollingWarning(), 5 * 1000);
    });
    onUnmounted(() => {
      document
        .querySelector("body")
        .removeEventListener("click", onUserClickBody);
      document
        .querySelector("#warningVideo")
        .removeEventListener("ended", onEnded);
      document
        .querySelector("#warningVideo")
        .removeEventListener("error", onError);
      timerArr.value.map((timer) => clearTimeout(timer));
    });
    function onUserClickBody(e) {
      store.commit("SET_WARNING_MUTED", false);
      // document.querySelector("#warningVideo").muted = false;
      document
        .querySelector("body")
        .removeEventListener("click", onUserClickBody);
    }
    async function onEnded(e) {
      await store.dispatch("delWarning", toRaw(curAlarm.value));
      isPlaying.value = false;
      pollingWarning();
    }
    function onError(err) {
      console.warn("播放报错了-- ", err);
    }
    async function showWarnings(o) {
      const alarm = o.alarm;
      if (!alarm) return;
      const alarmDict = {
        INFO: {
          background: "#FFFFFF",
          color: "#67C23A",
          duration: 8000,
          isShowDetail: true,
        },
        SLIGHT: {
          background: "#FFFFFF",
          color: "#F56C6C",
          duration: 8000,
          isShowDetail: false,
        },
        GENERAL: {
          background: "#FFFFFF",
          color: "#F56C6C",
          duration: 8000,
          isShowDetail: false,
        },
        SERIOUS: {
          background: "#FFFFFF",
          color: "#F56C6C",
          duration: 8000,
          isShowDetail: false,
        },
        VERY_SERIOUS: {
          background: "#F56C6C",
          color: "#FFFFFF",
          duration: 8000,
          isShowDetail: false,
        },
      };
      const curAlarmConf = alarmDict[alarm.alarmLevel];
      ElNotification({
        title: componentNameDict[alarm.alarmComponent].text,
        // type: "info",
        message: `<div 
          style="width:100%;height:100%;
          display:block;background-color:${curAlarmConf.background}"
        >

          <div style="width:100%;height:100%;
            position:absolute;left:0;top:0;z-index:-1;
            background-color:${curAlarmConf.background}"
          ></div>
          
          <p style="color:${curAlarmConf.color};">${alarm.alarmName}</p>
          <p 
            style="color: #333;${
              curAlarmConf.isShowDetail ? "" : "display:none;"
            }"
          >
            ${o.alarmDetail || ""}
          </p>
        </div>`,
        dangerouslyUseHTMLString: true,
        duration: curAlarmConf.duration,
      });
    }
    function getWarningUrl(warning) {
      const alarm = warning.alarm;
      if (
        !alarm ||
        !alarm.alarmName ||
        (!voiceMap[alarm.alarmName] && alarm.alarmLevel !== "INFO")
      ) {
        return voiceMap["未找到报警语音"];
      }
      if (alarm.alarmLevel === "INFO") {
        return voiceMap["muted"];
      }
      return voiceMap[alarm.alarmName];
    }
    function handleAlarm() {
      if (isPlaying.value) return;
      curAlarm.value = store.getters.getOneWarning;
      const rawAlarm = toRaw(curAlarm.value);
      showWarnings(rawAlarm);
      // console.log(rawAlarm);
      const url = getWarningUrl(rawAlarm);
      // console.log(url);
      isPlaying.value = true;
      warningUrl.value = url;
      document.querySelector("#warningVideo").load();
    }
    function pollingWarning() {
      if (store.state.warnings.length) {
        timerArr.value.map((timer) => clearTimeout(timer));
        handleAlarm();
        return;
      }
      const timer = setTimeout(() => {
        console.log("length is ", store.state.warnings.length);
        pollingWarning();
      }, 3000);
      timerArr.value.push(timer);
    }
    return { muted, warningUrl };
  },
};
</script>

<style lang="scss" scoped>
#warningVideo {
  position: absolute;
  top: -140px;
  left: -290px;
  opacity: 0;
  z-index: -100;
}
</style>