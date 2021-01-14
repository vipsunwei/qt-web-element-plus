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
    </el-aside>

    <el-container>
      <el-header height="60px" class="my-header">
        <el-dropdown @command="handleCommand">
          <el-button type="primary" plain>
            系统模式：{{ systemMode }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="AUTO">自动模式</el-dropdown-item>
              <el-dropdown-item command="MANUAL">手动模式</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const systemMode = computed(() => {
      return store.getters.systemMode;
    });
    store.dispatch("getSystemMode");
    function handleCommand(command) {
      store.dispatch("setSystemMode", command);
    }
    const active = ref("");
    onMounted(() => (active.value = location.href.split("#")[1]));
    const router = useRouter();
    const routes = router.options.routes;
    function navTo(path) {
      router.push({ path });
    }
    return {
      navTo,
      active,
      routes,
      systemMode,
      handleCommand,
    };
  },
};
</script>

<style lang="scss" scoped>
.left ::v-deep(.el-menu-item.is-active) {
  background-color: #026a8e !important;
}

.my-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>