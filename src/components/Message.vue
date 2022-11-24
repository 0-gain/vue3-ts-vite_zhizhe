<template>
  <div
    class="alert message-info fixed-top w-25 mx-auto d-flex justify-content-between mt-2"
    :class="`alert-${type}`"
  >
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { MessageType } from "@/types/interface";
import { PropType } from "vue";
defineProps({
  type: {
    type: String as PropType<MessageType>,
    default: "primary",
  },
  message: String,
});
</script>
<style scoped></style>
