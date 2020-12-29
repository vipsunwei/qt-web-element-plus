import { createRouter, createWebHashHistory } from "vue-router";

import Empty from "../views/Empty.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    meta: { name: "探空仪数据查询" },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/alert",
    name: "Alert",
    meta: { name: "告警信息管理" },
    component: () =>
      import(/* webpackChunkName: "alert" */ "../views/Alert.vue"),
  },
  {
    path: "/devices",
    name: "Devices",
    meta: { name: "设备监控" },
    component: () =>
      import(/* webpackChunkName: "devices" */ "../views/DeviceMonitor.vue"),
  },
  {
    path: "/ups",
    name: "Ups",
    hidden: true,
    component: () => import(/* webpackChunkName "ups" */ "../views/Ups.vue"),
  },
  {
    path: "/env",
    name: "Env",
    meta: { name: "环境检测" },
    component: () =>
      import(/* webpackChunkName: "env" */ "../views/EnvCheck.vue"),
  },
  {
    path: "/seven-needles",
    name: "SevenNeedles",
    meta: { name: "七针监测" },
    component: () =>
      import(
        /* webpackChunkName: "seven-needles" */ "../views/SevenNeedles.vue"
      ),
  },
  {
    path: "/",
    name: "Empty",
    hidden: true,
    component: Empty,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
