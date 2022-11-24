<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <router-link :to="{name:pathName}" class="dropdown-item"><slot></slot></router-link>
  </li>
</template>

<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  pathName:{
    type:String,
    default:''
  }
});
</script>
<style scoped>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
