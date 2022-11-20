<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="item in list" :key="item._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="item.avatar?.url || columnImg"
            class="rounded-circle border border-light my-3"
            :alt="item.title"
          />

          <h5 class="card-title text-truncate">{{ item.title }}</h5>
          <p class="card-text text-left description text-secondary">
            {{ item.description }}
          </p>
          <router-link
            :to="{ name: 'column', params: { id: item._id } }"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ColumnProps } from "@/types/interface";
import columnImg from "@/assets/column.jpg";

defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
});
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
