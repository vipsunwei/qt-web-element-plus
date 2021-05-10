import { ElMessage } from "element-plus";
import { computed, onMounted, reactive } from "vue";
import { getPowerStatus, getPowerParam, powerOn, powerOff } from "../api/ups";
import { getUpsParamDataMap } from "../data-map/ups";

export default function useUps() {
  onMounted(() => getData());
  const upsDefault = () => Object.values(getUpsParamDataMap());
  const upsState = reactive({
    ups: upsDefault(),
    loading: false,
    isOffline: false,
    offlineText: "设备离线",
    disabled: computed(() => {
      let r = false;
      //   const main = upsState.ups.find((value) => value.param === "MAIN");
      //   if (main) {
      //     r = !main.status;
      //   }
      return r;
    }),
  });

  async function getData() {
    upsState.loading = true;
    let params;
    try {
      params = await getPowerParam();
    } catch (error) {
      console.warn(error.toJSON());
    }
    if (!(params && Array.isArray(params))) {
      upsState.isOffline = true;
      upsState.loading = false;
      return;
    }
    params = params.map(({ param }) => {
      const item = getUpsParamDataMap()[param];
      return {
        id: item.id,
        name: item.name,
        status: item.status,
        param,
      };
    });
    const status = await getPowerStatus();
    if (!(status && Array.isArray(status))) return;
    status.map((item) => {
      for (const key in item) {
        const cur = params.find((value) => value.param === key);
        cur && (cur.status = item[key]);
      }
    });
    upsState.ups = params;
    upsState.isOffline = false;
    upsState.loading = false;
  }
  function open(v, item) {
    powerOn(item.param).then((res) => {
      upsState.loading = false;
      if (res.powerOn) {
        item.status = v;
      }
      ElMessage({
        type: res.powerOn ? "success" : "error",
        message: res.powerOn ? `打开${item.name}成功` : `打开${item.name}失败`,
        duration: res.powerOn ? 2000 : 3000,
      });
    });
  }
  function close(v, item) {
    powerOff(item.param).then((res) => {
      upsState.loading = false;
      if (res.powerOff) {
        item.status = v;
      }
      ElMessage({
        type: res.powerOff ? "success" : "error",
        message: res.powerOff ? `关闭${item.name}成功` : `关闭${item.name}失败`,
        duration: res.powerOff ? 2000 : 3000,
      });
    });
  }

  function onUpsChange(v, item) {
    if (upsState.loading) return;
    upsState.loading = true;
    item.status = !v;
    v ? open(v, item) : close(v, item);
  }

  return { upsState, onUpsChange };
}
