<template>
  <el-row :gutter="40" style="margin-left: 0; margin-right: 0">
    <template v-for="item in deviceList" :key="item.name">
      <el-col :span="6" :offset="0">
        <el-card
          shadow="hover"
          :body-style="{ padding: '20px' }"
          style="cursor: pointer"
        >
          <img :src="item.img" alt="..." style="width: 100%" />
          <div style="padding: 10px 0 0 0; text-align: center">
            <el-badge v-if="item.n" :value="item.n" :max="10" type="error">
              <el-button size="small">{{ item.name }}</el-button>
            </el-badge>
            <el-button v-else size="small">{{ item.name }}</el-button>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<script>
import { reactive, toRefs } from "vue";
import sxt from "../assets/shexiangtou.jpg";
import ipPhone from "../assets/ip-phone.jpg";
import dy from "../assets/dianyuan.jpg";
import gps from "../assets/gps.jpg";
export default {
  setup() {
    const state = reactive({
      deviceList: [
        { n: 0, name: "视频监控", img: sxt },
        { n: 0, name: "IP电话", img: ipPhone },
        { n: 0, name: "电源管理", img: dy },
        { n: 0, name: "GPS", img: gps },
      ],
    });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss" scoped>
</style>