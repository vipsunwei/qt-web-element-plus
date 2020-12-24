<template>
  <el-container style="height: 100vh">
    <el-aside class="left" width="200px">
      <el-menu
        style="height: 100%"
        background-color="#009ac6"
        text-color="#fff"
        active-text-color="#fff"
        :default-active="active"
      >
        <el-menu-item index="/home" @click="navTo('/home')">
          探空仪数据查询
        </el-menu-item>
        <el-menu-item index="/alert" @click="navTo('/alert')">
          告警信息管理
        </el-menu-item>
        <el-menu-item index="/devices" @click="navTo('/devices')">
          设备监控
        </el-menu-item>
        <el-menu-item index="/env" @click="navTo('/env')">
          环境检测
        </el-menu-item>
        <el-menu-item index="/seven-needles" @click="navTo('/seven-needles')">
          七针监测
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const active = ref("");
    onMounted(() => (active.value = location.href.split("#")[1]));
    const router = useRouter();
    function navTo(path) {
      router.push({ path });
    }
    return {
      navTo,
      active,
    };
  },
};
</script>

<style lang="scss" scoped>
.left ::v-deep(.el-menu-item.is-active) {
  background-color: #026a8e !important;
}
</style>