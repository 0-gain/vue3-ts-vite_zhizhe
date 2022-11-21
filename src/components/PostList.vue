<template>
  <div class="post-list">
    <article class="card mb-3 shadow-sm" v-for="post in list" :key="post.id">
      <div class="card-body">
        <h4>
          <router-link :to="{name:'posts',params:{id:post._id}}">{{ post.title }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div class="col-4">
            <img
              :src="post.image?.url"
              class="rounded-lg w-100"
              :alt="post.title"
            />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">
            {{ post.excerpt }}
          </p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
defineProps({
  list: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
</style>
