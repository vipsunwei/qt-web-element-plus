import { createRouter, createWebHashHistory } from "vue-router";

import Empty from "../views/Empty.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
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
    component: () =>
      import(/* webpackChunkName: "alert" */ "../views/Alert.vue"),
  },
  {
    path: "/devices",
    name: "Devices",
    component: () =>
      import(/* webpackChunkName: "devices" */ "../views/DeviceMonitor.vue"),
  },
  {
    path: "/env",
    name: "Env",
    component: () =>
      import(/* webpackChunkName: "env" */ "../views/EnvCheck.vue"),
  },
  {
    path: "/",
    name: "Empty",
    component: Empty,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
