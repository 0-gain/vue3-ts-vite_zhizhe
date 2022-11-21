<template>
  <div class="column-detail-page" style="width: 690px; margin: 0 auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img
          :src="column.avatar?.url"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="posts"></PostList>
    <More></More>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { GlobalDataProps } from "@/types/interface";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import More from "@/components/More.vue";
const store = useStore<GlobalDataProps>();
const route = useRoute();
const currentId = ref(route.params.id);
onMounted(() => {
  store.dispatch("getColumnDetailInfo", currentId.value);
  store.dispatch("getPostsList", { id: currentId.value });
});

// 检测变化
watch(
  () => route.params,
  (newVal) => {
    console.log(newVal);
  }
);
const column = computed(() => store.getters.getColumById(currentId.value));

const posts = computed(() => store.getters.getPostsById(currentId.value));
</script>
<style scoped></style>
