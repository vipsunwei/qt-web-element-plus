import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import globalEventBus from "./eventbus/globalEventBus";
import channels, { mockOptions } from "./eventbus/channels";

import lang from "element-plus/lib/locale/lang/zh-cn";
import locale from "element-plus/lib/locale";
import useElementUi from "./element-ui.js";

// 设置语言
locale.use(lang);
// 模拟eventbus开关
const IS_MOCK = true;
const app = createApp(App);

useElementUi(app);

app
  .use(router)
  .use(store)
  .use(globalEventBus, {
    host: process.env.VUE_APP_EVENT_BUS,
    channels: channels,
    IS_MOCK: IS_MOCK,
    mockOptions,
  })
  .mount("#app");
