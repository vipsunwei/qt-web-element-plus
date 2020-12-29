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
    const routes = router.options.routes;
    function navTo(path) {
      router.push({ path });
    }
    return {
      navTo,
      active,
      routes,
    };
  },
};
</script>

<style lang="scss" scoped>
.left ::v-deep(.el-menu-item.is-active) {
  background-color: #026a8e !important;
}
</style>