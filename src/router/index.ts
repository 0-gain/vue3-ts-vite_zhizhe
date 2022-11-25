import { createRouter, createWebHistory } from "vue-router";
import home from "@/view/Home.vue";
import store from "@/store";
import request from "@/utils/request";
import Message from "@/components/Message";
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
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/column/:id",
      name: "column",
      component: () => import("@/view/ColumnDetail.vue"),
    },
    {
      path: "/posts/:id",
      name: "posts",
      component: () => import("@/view/PostDetail.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/view/Signup.vue"),
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/createPost",
      name: "createPost",
      component: () => import("@/view/CreatePost.vue"),
      meta: { requiredLogin: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { requiredLogin, redirectAlreadyLogin } = to.meta;
  if (!user.isLogin) {
    if (token) {
      request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      store
        .dispatch("getCurrentUserInfo")
        .then(() => {
          if (redirectAlreadyLogin) {
            next("/");
          } else {
            next();
          }
        })
        .catch((e) => {
          console.log(e);
          // 清除token
          store.commit("SET_LOGIN_OUT");
          next("login");
        });
    } else {
      if (requiredLogin) {
        Message({type:'warning',message:'请先登录'})
        next("login");
      } else {
        next();
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next("/");
    } else {
      next();
    }
  }
});
export default router;
