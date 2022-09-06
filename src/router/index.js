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
        meta: {
          authRequired: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("[router] New route requested", to.path);
  const authStore = useAuthStore();
  console.debug("[router] Displaying auth for debug", authStore);

  const routeRequiresAuth = to.matched.some(
    (record) => record.meta?.authRequired
  );
  if (!authStore?.isAuthenticated && routeRequiresAuth) {
    console.log("[router] Protected route. Requesting authentication");
    authStore.originalDestination = to.path;
    return next("/login");
  } else {
    if (routeRequiresAuth)
      console.log("[router] Access granted for protected route.");
    return next();
  }
});

export default router;
