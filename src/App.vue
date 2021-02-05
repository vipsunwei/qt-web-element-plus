<template>
  <layout></layout>
  <setting></setting>
</template>

<script>
import Layout from "./views/Layout.vue";
import Setting from "./views/Setting.vue";
export default {
  components: {
    Layout,
    Setting,
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  height: 100%;
  display: flex;
}
</style>
