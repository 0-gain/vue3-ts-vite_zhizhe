import { createRouter, createWebHistory } from "vue-router";
import home from "@/view/Home.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/Login.vue"),
    },
  ],
});
export default router;