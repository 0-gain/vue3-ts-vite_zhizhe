<template>
  <div class="validate-input-container pb-3 position-relative">
    <input
      class="form-control"
      v-bind="$attrs"
      v-model="inputData.val"
      :class="{ 'is-invalid': inputData.error }"
      @blur="validateInput"
    />
    <span
      v-if="inputData.error"
      style="display: block"
      class="invalid-feedback"
      >{{ inputData.message }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, onMounted, computed } from "vue";
import { RulesProp } from "@/types/interface";
import { emitter } from "@/emitter";

// 邮箱验证规则
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 密码验证规则
const passwordReg = /^\w{6,16}$/;
const props = defineProps({
  modelValue: String,
  rules: Array as PropType<RulesProp[]>,
});
const emit = defineEmits(["update:modelValue", "on-isSame"]);

const inputData = reactive({
  val: computed({
    get: () => props.modelValue || "",
    set: (val) => {
      emit("update:modelValue", val);
    },
  }),
  error: false,
  message: "",
});
// 验证规则
const validateInput = () => {
  if (props.rules) {
    const allPassed = props.rules.every((rule) => {
      let passed = true;
      inputData.message = rule.message;
      switch (rule.type) {
        case "required":
          passed = inputData.val.trim() !== "";
          break;
        case "email":
          passed = emailReg.test(inputData.val);
          break;
        case "password":
          passed = passwordReg.test(inputData.val);
          break;
        case "custom":
          passed = rule.validator?.() || false;
          break;
        default:
          break;
      }
      return passed;
    });
    inputData.error = !allPassed;
    return allPassed;
  }
  return true;
};

onMounted(() => {
  // 触发事件
  emitter.emit("form-login", validateInput);
});
</script>
<script lang="ts">
export default {
  name: "ValidateInput",
  // 关闭组件attribute透传行为,setup语法糖不能使用,配合v-bind="$attrs"使用
  inheritAttrs: false,
};
</script>
<style scoped></style>
