<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="item in columnList" :key="item.id">
      <div class="card h-100 shadow-sm" style="width: 18rem">
        <div class="card-body text-center">
          <img
            :src="item.avatar"
            class="rounded-circle border border-light w-25 my-3"
            :alt="item.title"
          />

          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">
            {{ item.description }}
          </p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { ColumnProps } from "@/types/interface";
import columnImg from "@/assets/column.jpg";

const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
});

// 设置默认的图片
const columnList = computed(() => {
  return props.list.map((item) => {
    if (!item.avatar) item.avatar = columnImg;
    return item;
  });
});

</script>
<style scoped lang="less"></style>
