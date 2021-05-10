import voiceMap from "@/assets/voice/voiceMap.js";
import useAudioQueue from "@/hooks/useAudioQueue.js";
import useMyAudio from "@/hooks/useMyAudio.js";
import emitter from "@/hooks/useMitt";
import { ElNotification, ElMessageBox } from "element-plus";
import { getMuted } from "@/utils/utils.js";
import { componentNameDict } from "../../api/index";
let orignalSetItem = localStorage.setItem;
localStorage.setItem = function(key, newValue) {
  let setItemEvent = new Event("storageChange");
  setItemEvent.newValue = newValue;
  window.dispatchEvent(setItemEvent);
  orignalSetItem.apply(this, arguments);
};
const queue = useAudioQueue();
const audio1 = useMyAudio();

getMuted() && audio1.setMuted(getMuted());
window.addEventListener("storageChange", (e) => {
  let newValue = e.newValue && JSON.parse(e.newValue);

  if (newValue.hasOwnProperty("muted")) {
    audio1.setMuted(newValue.muted);
  }
});
audio1.addListener("ended", onEnded);
audio1.addListener("error", onError);

// let isAdded = false;
const getMediaErrorMessage = (error) => {
  // return Object.keys(Object.getPrototypeOf(error.currentTarget.error)).find(
  //   (key) => error.currentTarget.error[key] === error.currentTarget.error.code
  // );
  return error.currentTarget.error;
};
let isPlaying = false;
let isError = false;
let queueTimer = [];
export function startCheckQueue() {
  // console.info("audio queue length -- ", queue.getLength());
  if (!isError && queue.getLength()) {
    queueTimer.map((timer) => clearTimeout(timer));
    handleAlarm();
    return;
  }
  const timer = setTimeout(() => {
    startCheckQueue();
  }, 3000);
  queueTimer.push(timer);
}
// function stopCheckQueue() {
//   queueTimer.map((timer) => clearTimeout(timer));
//   audio1.removeListener("ended", onEnded);
//   audio1.setSrc(null);
//   audio1.isPlaying = false;
// }

function handleAlarm() {
  if (isPlaying) return;
  const o = queue.get();
  // if (!o) return;
  isPlaying = true;
  const src = o.src;
  // if (!src) return;
  audio1.setSrc(src);
  !isError && showWarnings(o);
}

function onEnded() {
  isPlaying = false;
  startCheckQueue();
}
function onError(e) {
  isError = true;
  ElMessageBox.confirm("允许播放告警语音吗？", "提示", {
    showCancelButton: true,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    showClose: false,
    confirmButtonText: "是",
    cancelButtonText: "否",
  }).then((res) => {
    isPlaying = false;
    isError = false;
    if (res === "confirm") {
      startCheckQueue();
    }
  });
}

function emitterFn(e) {
  // if (isAdded) return;
  if (Array.isArray(e)) {
    e.map((item) => add(item));
    // isAdded = true;
  }
}
emitter.on("alarm", emitterFn);

let notificationInstance = null;
async function showWarnings(o) {
  const alarm = o.alarm;
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
  notificationInstance = ElNotification({
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
        style="color: #333;${curAlarmConf.isShowDetail ? "" : "display:none;"}"
      >
        ${o.alarmDetail || ""}
      </p>
    </div>`,
    dangerouslyUseHTMLString: true,
    duration: curAlarmConf.duration,
    onClick: function() {
      closeWarnings();
    },
  });
}
function closeWarnings() {
  notificationInstance.close();
}
function add(o) {
  const alarm = o.alarm;
  const src = voiceMap[alarm.alarmName] || voiceMap["未找到报警语音"];
  o.src = src;
  queue.add(o);
}

export function ebHandler(alarmInfo) {
  add(alarmInfo);
  emitter.emit("get-active-warning-message", "I am warning ");
}
