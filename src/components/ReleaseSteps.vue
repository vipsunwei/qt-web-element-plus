<template>
  <div class="release_steps">
    <el-steps :style="{ flex: 1 }" align-center>
      <el-step
        :title="item.title"
        icon="el-icon-sunny"
        :status="item.status ? 'finish' : 'wait'"
        v-for="item in steps"
        :key="item.id"
      ></el-step>
    </el-steps>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ReleaseSteps",
  setup() {
    const store = useStore();
    store.dispatch("getReleaseStep");
    const steps = computed(() => {
      return store.state.steps;
    });

    return { steps };
  },
};
</script>

<style lang="scss" scoped>
.release_steps {
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
}
</style>