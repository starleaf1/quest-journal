import { useAuthStore } from "@/store/authStore";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/DashboardView.vue"),
      },
    ],
    meta: {
      authRequired: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const routeRequiresAuth = to.matched.some(
    (record) => record.meta?.authRequired
  );
  if (!auth.isAuthenticated && routeRequiresAuth) {
    return next("/login");
  } else {
    return next();
  }
});

export default router;
