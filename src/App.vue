<template>
  <layout></layout>
  <setting></setting>
  <PlayWarning />
</template>

<script>
import Layout from "./views/Layout.vue";
import Setting from "./views/Setting.vue";
import PlayWarning from "./components/PlayWarning.vue";
export default {
  components: {
    Layout,
    Setting,
    PlayWarning,
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  min-width: 1240px;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: auto;
}
#app {
  height: 100%;
  display: flex;
}
</style>
