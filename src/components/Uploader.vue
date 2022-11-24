<template>
  <div class="file-upload">
    <div
      class="file-upload-container d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      @click.prevent="triggerUpload"
    >
      <slot v-if="uploadStatus === 'loading'" name="loading"></slot>
      <slot
        v-else-if="uploadStatus === 'success'"
        :uploadData="uploadData"
        name="uploaded"
      ></slot>
      <slot v-else name="default"></slot>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      class="file-input d-none"
      @change="handleFieChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ImageProps } from "@/types/interface";
import request from "@/utils/request";
import { PropType, ref, watch } from "vue";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
const props = defineProps({
  // 上传地址
  action: {
    type: String,
    required: true,
  },
  // 上传之前校验
  beforeUpload: {
    type: Function as PropType<CheckFunction>,
  },
  // 编辑文章时，传入img
  upload: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const emit = defineEmits(["on-fileUpload"]);

const uploadData = ref<ImageProps>(props.upload);
const uploadStatus = ref<UploadStatus>("ready");
const fileInputRef = ref<null | HTMLInputElement>(null);
// 图片状态,当前为编辑状态

const triggerUpload = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};
const handleFieChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  // 获取上传的图片信息,fileInputRef.value.files返回伪数组
  if (!currentTarget.files) {
    return;
  }
  // 转换为正真的数组
  const fileList = Array.from(currentTarget.files);

  const upLoadFile = fileList[0];

  if (props.beforeUpload) {
    let passed = props.beforeUpload(upLoadFile);
    if (!passed) return;
  }
  uploadStatus.value = "loading";
  // 使用FormData对象
  const formData = new FormData();
  formData.append(upLoadFile.name, upLoadFile);
  request
    .post(props.action, formData)
    .then((res) => {
      uploadStatus.value = "success";
      uploadData.value = res.data;
      emit("on-fileUpload", res.data);
    })
    .catch((error) => {
      uploadStatus.value = "error";
      console.log(error);
    });
};

watch(
  () => props.upload,
  (newVal) => {
    if (props.upload.url) uploadStatus.value = "success";
    uploadData.value = newVal;
  }
);
</script>
<style scoped></style>
