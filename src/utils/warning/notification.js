import { ElNotification } from "element-plus";
import { componentNameDict } from "../../api/index";

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
        style="color: #333;${curAlarmConf.isShowDetail ? "" : "display:none;"}"
      >
        ${o.alarmDetail || ""}
      </p>
    </div>`,
    dangerouslyUseHTMLString: true,
    duration: curAlarmConf.duration,
  });
}

export default showWarnings;
