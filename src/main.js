import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
// import "../mock/index";

import lang from "element-plus/lib/locale/lang/zh-cn";
import locale from "element-plus/lib/locale";
import useElementUi from "./element-ui.js";

// 设置语言
locale.use(lang);

const app = createApp(App);

useElementUi(app);

app
  // .use(store)
  .use(router)
  .mount("#app");
