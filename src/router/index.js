import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("@/layouts/DashboardView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
