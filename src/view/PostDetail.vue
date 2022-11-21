<template>
  <div class="post-detail-page mx-auto">
    <article class="mb-5 pb-3" v-if="postDetail">
      <img
        :src="postDetail.image?.url"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
      />
      <h2 class="mb-4">{{ postDetail.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <div class="user-profile-component" v-if="postDetail.author">
            <div class="d-flex align-items-center">
              <img
                :src="postDetail.author?.avatar?.url"
                alt=""
                class="rounded-circle img-thumbnail"
                style="width: 50px; height: 50px"
              />
              <div class="detail ml-2">
                <h6 class="d-block mb-0">{{ postDetail.author?.nickName }}</h6>
                <span class="text-truncate text-muted d-block">{{
                  postDetail.author?.description
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ postDetail.createdAt }}</span
        >
      </div>
      <div v-html="handleContent"></div>
      <div class="btn-group mt-5"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { GlobalDataProps } from "@/types/interface";
const store = useStore<GlobalDataProps>();
const route = useRoute();
const currentId = ref(route.params.id);
const postDetail = computed(() => {
  return store.getters.getPostDetailById(currentId.value);
});
onMounted(() => {
  store.dispatch("getPostDetail", currentId.value);
});
const handleContent = computed(() => {
  if (postDetail.value && postDetail.value.content) {
    const { content } = postDetail.value;
    return content;
  } else {
    return "";
  }
});
</script>
<style scoped>
.post-detail-page {
  width: 690px;
}
</style>
