<template>
  <div class="dropdown" ref="dropdownCom">
    <a
      href="javascript:;"
      class="btn btn-outline-light my-2 dropdown-toggle"
      >你好 {{ title }}</a
    >
    <ul
      class="dropdown-menu"
      :style="{ display: 'block' }"
      aria-labelledby="dropdownMenuButton1"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref,watch } from "vue";
import useClickOutside from '@/hooks/useClickOutside'
defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);


// 点击外部区域自动隐藏
const dropdownCom = ref<null | HTMLElement>(null);
const isClickOutside = useClickOutside(dropdownCom)
isOpen.value = isClickOutside.value

watch(isClickOutside,(newVal)=>{
  isOpen.value = newVal
  
})
</script>
<style scoped lang="less"></style>
