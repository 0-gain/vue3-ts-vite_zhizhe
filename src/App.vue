<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <GlobalHeader :user="userData"></GlobalHeader>
    <Loading v-if="isLoading"></Loading>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-auto">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022 智者专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";
import { GlobalDataProps } from "@/types/interface";
import { useStore } from "vuex";
import { computed } from "vue";
import Loading from "./components/Loading.vue";

const store = useStore<GlobalDataProps>();

const userData = computed(() => store.state.user);
const isLoading = computed(() => store.state.isLoading);

</script>

<style scoped></style>
