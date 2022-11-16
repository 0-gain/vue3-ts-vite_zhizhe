<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <a class="dropdown-item" href="#">
      <slot></slot>
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
