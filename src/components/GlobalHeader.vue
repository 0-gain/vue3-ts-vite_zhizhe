<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">智者专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <Router-link :to="{name:'login'}" class="btn btn-outline-light my-2"
          >登陆</Router-link
        >
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="user.name ?? ''">
          <DropdownItem>新建文章</DropdownItem>
          <DropdownItem>我的专栏</DropdownItem>
          <DropdownItem disabled>编辑资料</DropdownItem>
          <DropdownItem>退出登录</DropdownItem>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { UserProps } from "@/types/interface";
import { PropType } from "vue";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true,
  },
});
</script>
<style scoped lang="less"></style>
