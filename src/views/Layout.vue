<template>
  <el-container>
    <el-aside class="left" width="200px">
      <el-menu
        background-color="#009ac6"
        text-color="#fff"
        active-text-color="#fff"
        :default-active="active"
        @select="onSelect"
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
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
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
    onUnmounted(() =>
      window.removeEventListener("hashchange", hashChangeHandler)
    );
    const router = useRouter();
    const route = useRoute();
    const routes = router.getRoutes();
    function navTo(path) {
      router.push({ path });
    }
    function onSelect(index, indexPath) {
      active.value = index;
    }
    function hashChangeHandler(e) {
      active.value = e.newURL.split("#")[1];
    }
    window.addEventListener("hashchange", hashChangeHandler);
    return {
      navTo,
      active,
      routes,
      onSelect,
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