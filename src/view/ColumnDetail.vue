<template>
  <div class="column-detail-page" style="width: 690px; margin: 0 auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar?.url || imgDefault"
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
    <More v-if="!isLastPage()" @on-loading-more="loadMore"></More>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { GlobalDataProps } from "@/types/interface";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import More from "@/components/More.vue";
import imgDefault from "@/assets/column.jpg";
import useLoadMore from "@/hooks/useLoadMore";
const store = useStore<GlobalDataProps>();
const route = useRoute();
const currentId = ref(route.params.id as string);
onMounted(() => {
  store.dispatch("getColumnDetailInfo", currentId.value);
  store.dispatch("getPostsList", { id: currentId.value });
});

const column = computed(() => store.getters.getColumById(currentId.value));
const posts = computed(() => store.getters.getPostsById(currentId.value));
const total = computed(() => store.state.posts.total);
const { loadMore, isLastPage } = useLoadMore("getPostsList", total, {
  id: currentId.value,
  currentPage: 2,
  pageSize: 5,
});

</script>
<style scoped></style>
