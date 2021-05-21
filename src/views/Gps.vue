<template>
  <el-descriptions column="3" border direction="vertical">
    <el-descriptions-item label="时间（UTC）" span="3">
      {{ utcTime }}
    </el-descriptions-item>
    <template v-for="item in locationInfo" :key="item.key">
      <el-descriptions-item :label="item.name" span="1">
        <span>{{ item.value }}</span>
        <span v-show="item.value && item.unit">
          {{ item.unit }}
        </span>
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from "vue";
// import { useRouter } from "vue-router";
import { getGpsInfoMap, getGpsLocationInfoMap } from "../data-map/gps";
// import useEnableReset from "../hooks/useEnableReset";
import useEventBus from "../hooks/useEventBus";
import { toFixedFilter } from "../utils/utils";

export default defineComponent({
  name: "Gps",
  setup() {
    const IS_MOCK = false;
    useEventBus("GPS", handleGpsInfo, {
      IS_MOCK,
      mockDataName: "gpsInfo",
    });
    useEventBus("GPS_LOCATION", handleLocationInfo, {
      IS_MOCK,
      mockDataName: "locationInfo",
    });
    const len6 = ["latitude", "longitude"];
    const len2 = ["altitude"];
    function handleLocationInfo(locationInfo) {
      for (const key in locationInfo) {
        const cur = gpsInfoState.locationInfo.find(
          (value) => value.key === key
        );
        cur &&
          (cur.value = len6.includes(key)
            ? toFixedFilter(locationInfo[key], 6)
            : len2.includes(key)
            ? toFixedFilter(locationInfo[key], 2)
            : locationInfo[key]);
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
      locationInfo: locationInfoInit(),
      utcTime: computed(() => {
        let Y, M, D, h, m, s;
        for (let i = 0, l = gpsInfoState.gpsInfo.length; i < l; i++) {
          const item = gpsInfoState.gpsInfo[i];
          // console.log(456);
          if (!item.value) return "";
          item.key === "year" && (Y = item.value + item.name);
          item.key === "monthValue" && (M = item.value + item.name);
          item.key === "dayOfMonth" && (D = item.value + item.name);
          item.key === "hour" && (h = item.value + item.name);
          item.key === "minute" && (m = item.value + item.name);
          item.key === "second" && (s = item.value + item.name);
        }
        // console.log(123);
        return Y + M + D + " " + h + m + s;
      }),
    });
    // const router = useRouter();
    // function back() {
    //   router.go(-1);
    // }
    function locationInfoInit() {
      return Object.values(getGpsLocationInfoMap());
    }
    function gpsInfoInit() {
      return Object.values(getGpsInfoMap());
    }
    return { ...toRefs(gpsInfoState) };
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