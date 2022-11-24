<template>
  <div class="signup-page mx-auto p-3 w-25">
    <h5 class="my-4 text-center">注册智者账户</h5>
    <ValidateForm>
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput
          placeholder="请输入邮箱地址"
          type="text"
          v-model="formData.email"
          :rules="emailRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <ValidateInput
          placeholder="请输入昵称"
          type="text"
          v-model="formData.nickName"
          :rules="nickNameRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput
          placeholder="请输入密码"
          type="password"
          v-model="formData.password"
          :rules="passwordRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <ValidateInput
          placeholder="请再次输入密码"
          type="password"
          v-model="formData.repeatPassword"
          :rules="repeatPasswordRules"
        />
      </div>

      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          注册新用户
        </button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import ValidateForm from "@/components/validateForm.vue";
import ValidateInput from "@/components/validateInput.vue";
import { RulesProp } from "@/types/interface";
import { reactive } from "vue";

const formData = reactive({
  email: "",
  nickName: "",
  password: "",
  repeatPassword: "",
});
// 邮箱
const emailRules: RulesProp[] = [
  {
    type: "required",
    message: "邮箱地址不能为空",
  },
  { type: "email", message: "请输入正确的邮箱地址" },
];

// 名称
const nickNameRules: RulesProp[] = [
  { type: "required", message: "昵称不能为空" },
];

// 密码
const passwordRules: RulesProp[] = [
  { type: "required", message: "密码不能为空" },
  { type: "password", message: "密码长度需要在6-16位之间" },
];
// 重复密码
const repeatPasswordRules: RulesProp[] = [
  { type: "required", message: "重复密码不能为空" },
  {
    type: "custom",
    validator: () => formData.password === formData.repeatPassword,
    message: "2次密码输入不一样",
  },
];
</script>
<style scoped></style>
