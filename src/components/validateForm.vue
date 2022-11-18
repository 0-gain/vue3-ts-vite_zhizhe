<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue";
import { ValidateFunc, emitter } from "@/emitter";
const emit = defineEmits(["on-submitForm"]);
// 存储每个验证规则的回调函数
let funcArr: ValidateFunc[] = [];
// 提交表单
const submitForm = () => {
  console.log(funcArr);
  const res = funcArr.map((func) => func()).every((res) => res);
  emit("on-submitForm", res);
};
const callBack = (func?: ValidateFunc) => {
  if (func) {
    funcArr.push(func);
  }
};

// 监听事件
emitter.on("form-login", callBack);
onUnmounted(() => {
  // 解绑事件
  emitter.off("form-login", callBack);
  funcArr = [];
});
</script>
<style scoped></style>
