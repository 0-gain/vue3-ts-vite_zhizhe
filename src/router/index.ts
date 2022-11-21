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
    {
      path:'/column/:id',
      name:'column',
      component:()=>import('@/view/ColumnDetail.vue')
    },
    {
      path:'/posts/:id',
      name:'posts',
      component:()=>import('@/view/PostDetail.vue')
    }
  ],
});
export default router;
