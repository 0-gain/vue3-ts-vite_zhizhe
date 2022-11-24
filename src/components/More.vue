<template>
  <div class="more-content">
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
      @click="clickMore"
    >
      加载更多
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['on-loading-more'])

const clickMore = ()=>{
  emit('on-loading-more')
}
</script>
<style scoped></style>
