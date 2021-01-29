import voiceMap from "@/assets/voice/voiceMap.js";
import useAudioQueue from "@/hooks/useAudioQueue.js";
import useMyAudio from "@/hooks/useMyAudio.js";
import emitter from "@/hooks/useMitt";
import { ElNotification, ElMessageBox } from "element-plus";

const queue = useAudioQueue();
const audio1 = useMyAudio();

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
  console.info("audio queue length -- ", queue.getLength());
  if (!isError && queue.getLength()) {
    queueTimer.map((timer) => clearTimeout(timer));
    console.info("get length", queue.getLength());
    handleAlarm();
    return;
  }
  const timer = setTimeout(() => {
    console.info("audio queue length is ", queue.getLength(), " !");
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
  console.info("handleAlarm isPlaying  ", isPlaying);
  if (isPlaying) return;
  const o = queue.get();
  // if (!o) return;
  isPlaying = true;
  const src = o.src;
  // if (!src) return;
  console.info("alarm level -- ", o.alarm.alarmLevel);
  audio1.setSrc(src);
  !isError && showWarnings(o);
}

function onEnded() {
  console.info("current audio play finished");
  isPlaying = false;
  startCheckQueue();
}
function onError(e) {
  isError = true;
  console.info("播放出错了 -- ", getMediaErrorMessage(e));
  console.info("onError -- ", isPlaying);
  ElMessageBox.confirm("允许播放告警语音吗？", "提示", {
    showCancelButton: false,
  }).then((res) => {
    console.info(res);
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
  // const colorMap = {
  //   VERY_SERIOUS: { background: "#f40", color: "#fff" },
  // };
  notificationInstance = ElNotification({
    title: alarm.alarmComponent,
    type: "info",
    message: `<div style="display:inline-block;color:#f40;">${alarm.alarmName}</div>`,
    // message: `<div style="display:inline-block;background-color: ${
    //   colorMap[alarm.alarmLevel].background
    // };color: ${colorMap[alarm.alarmLevel].color};">${
    //   alarm.alarmName
    // }</div>`,
    dangerouslyUseHTMLString: true,
    duration: 3000,
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
  console.info("eventbus来消息了！");
  add(alarmInfo);
}
