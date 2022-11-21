<template>
  <div class="login-page mx-auto p-3 w-25">
    <h5 class="my-4 text-center">登录到智者</h5>
    <ValidateForm @on-submitForm="onSubmitForm">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <ValidateInput
          :rules="emailRules"
          type="text"
          v-model="emailVal"
        ></ValidateInput>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <ValidateInput
          :rules="passwordRules"
          type="password"
          v-model="password"
        ></ValidateInput>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          登录
        </button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import ValidateForm from "@/components/validateForm.vue";
import ValidateInput from "@/components/validateInput.vue";
import Message from "@/components/Message";
import { RulesProp } from "@/types/interface";
import { useStore } from "vuex";
import { ref } from "vue";

const emailVal = ref("");
// 邮箱验证规则
const emailRules: RulesProp[] = [
  { type: "required", message: "电子邮箱地址不能为空" },
  { type: "email", message: "请输入正确的电子邮箱格式" },
];
const password = ref("");
// 密码验证规则
const passwordRules: RulesProp[] = [
  { type: "required", message: "密码不能为空" },
  { type: "password", message: "密码输入格式不正确" },
];

// 提交表单
const store = useStore();
const onSubmitForm = (validate: boolean) => {
  if (!validate) {
    return;
  }
  const payload = {
    email: emailVal.value,
    password: password.value,
  };
  store
    .dispatch("LoginAndGetUserInfo", payload)
    .then(() => {
      Message({ type: "success", message: "登录成功 2秒后跳转首页" });
    })
    .catch((e) => {
      console.log(e, "e");
      Message({ type: "danger", message: e });
    });
};
</script>
<style scoped></style>
