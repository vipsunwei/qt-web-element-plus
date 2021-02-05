<template>
  <el-container>
    <el-aside class="left" width="200px">
      <el-menu
        background-color="#009ac6"
        text-color="#fff"
        active-text-color="#fff"
        :default-active="active"
      >
        <template v-for="item in routes" :key="item.path">
          <el-menu-item
            v-if="!item.hidden"
            :index="item.path"
            @click="navTo(item.path)"
          >
            {{ item.meta.name }}
          </el-menu-item>
        </template>
      </el-menu>
      <!-- <el-button @click="toWSL">维色拉</el-button> -->
    </el-aside>

    <el-container>
      <el-header height="60px" class="my-header">
        <release-steps></release-steps>
        <system-mode></system-mode>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SystemMode from "../components/SystemMode.vue";
import ReleaseSteps from "../components/ReleaseSteps.vue";
export default {
  components: {
    SystemMode,
    ReleaseSteps,
  },
  setup() {
    const active = ref("");
    onMounted(() => (active.value = location.href.split("#")[1]));
    const router = useRouter();
    const routes = router.options.routes;
    function navTo(path) {
      router.push({ path });
    }
    // function toWSL() {
    //   window.open("https://192.168.0.1:9443");
    // }
    return {
      navTo,
      active,
      routes,
      // toWSL,
    };
  },
};
</script>

<style lang="scss" scoped>
.left {
  background-color: #009ac6;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.left ::v-deep(.el-menu) {
  border-right: 0;
}
.left ::v-deep(.el-menu-item.is-active) {
  background-color: #026a8e !important;
}

.my-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaecef;
}
</style>