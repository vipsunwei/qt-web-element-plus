<template>
  <el-row :gutter="40" style="margin-left: 0; margin-right: 0">
    <template v-for="item in deviceList" :key="item.name">
      <el-col :span="6" :offset="0">
        <el-card
          shadow="hover"
          :body-style="{ padding: '20px' }"
          style="cursor: pointer"
          @click="onClick(item)"
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
import { useRouter } from "vue-router";
export default {
  setup() {
    const state = reactive({
      deviceList: [
        { n: 0, path: "/video", name: "视频监控", img: sxt },
        { n: 0, path: "/ipPhone", name: "IP电话", img: ipPhone },
        { n: 0, path: "/ups", name: "电源管理", img: dy },
        { n: 0, path: "/gps", name: "GPS", img: gps },
      ],
    });

    const router = useRouter();
    function onClick(item) {
      // console.log(item);
      router.push({ path: item.path });
    }

    return { ...toRefs(state), onClick };
  },
};
</script>

<style lang="scss" scoped>
</style>