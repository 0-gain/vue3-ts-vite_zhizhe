<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ text || "loading" }}</span>
        </div>
        <p class="text-primary small">{{ text || "loading" }}</p>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue";
defineProps({
  text: {
    type: String,
  },
  background: {
    type: String,
  },
});

// 创建DOM节点
const node = document.createElement("div");
node.id = "back";
document.body.appendChild(node);

onUnmounted(() => {
  document.body.removeChild(node);
});
</script>
<style scoped>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
