<template>
  <nav class="navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <a class="navbar-brand" href="#">智者专栏</a>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <Router-link
            :to="{ name: 'login' }"
            class="btn btn-outline-light my-2"
            >登陆</Router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link
            :to="{ name: 'signup' }"
            class="btn btn-outline-light my-2"
            >注册</router-link
          >
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <Dropdown :title="user.nickName ?? ''">
            <DropdownItem>
              <router-link to="/createPost">新建文章</router-link>
            </DropdownItem>
            <DropdownItem>
            <router-link :to="{name:'column',params: { id: user.column }}">我的专栏</router-link>
            </DropdownItem>
            <DropdownItem disabled>编辑资料</DropdownItem>
            <DropdownItem @click="loginOut">退出登录</DropdownItem>
          </Dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { UserProps, GlobalDataProps } from "@/types/interface";
import { PropType } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import Message from "./Message";
defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true,
  },
});
const store = useStore<GlobalDataProps>();
const router = useRouter();
// 退出登录
const loginOut = () => {
  store.commit("SET_LOGIN_OUT");
  Message({ type: "success", message: "退出登录成功" });
  router.replace('/');
};


</script>
<style scoped>
.navbar-brand {
  color: #fff;
}
</style>
