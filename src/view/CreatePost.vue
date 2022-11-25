<template>
  <!-- 新建文章 -->
  <!-- 上传地址、上传前校验规则、上传成功和失败的回调 -->
  <div class="create-post-page container">
    <h4>{{ route.query.id ? "编辑文章" : "新建文章" }}</h4>
    <Uploader
      action="upload"
      :beforeUpload="uploadCheck"
      :upload="uploadImg"
      @on-fileUpload="handleFileUploaded"
    >
      <h2>点击上传图片</h2>
      <template #loading>
        <button class="btn btn-primary">正在上传...</button>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadData && dataProps.uploadData.url" alt="" />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </Uploader>

    <ValidateForm @on-submitForm="onSubmitPost">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          v-model="titleVal"
          :rules="titleRules"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <Editor
          v-model:mdValue="mdValue"
          @on-blur="handleBlur"
          :class="{ 'is-invalid': !editorStatus.isValid }"
        ></Editor>
        <span
          v-if="!editorStatus.isValid"
          class="invalid-feedback mt-1"
          style="display: block"
        >
          {{ editorStatus.message }}</span
        >
      </div>

      <template #submit>
        <button type="submit" class="btn btn-primary">
          {{ route.query.id ? "更新文章" : "创建文章" }}
        </button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import Message from "@/components/Message";
import Uploader from "@/components/Uploader.vue";
import Editor from "@/components/Editor.vue";
import ValidateForm from "@/components/validateForm.vue";
import ValidateInput from "@/components/validateInput.vue";
import { reqUpdatePost } from "@/api/post";
import { beforeUploadValidate } from "@/utils/helper";
import { ImageProps, RulesProp, CreatePostProps } from "@/types/interface";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

// markdown编写得内容
const mdValue = ref("");
// 标题内容
const titleVal = ref("");
const titleRules: RulesProp[] = [
  {
    type: "required",
    message: "文章标题不能为空",
  },
];

const editorStatus = reactive({
  isValid: true,
  message: "文章详情不能为空",
});

// 是否为编辑文章状态
const isEditor = ref(false);
// 图片信息
const uploadImg = ref({});
const imageId = ref("");
const uploadCheck = (file: File) => {
  const condition = { format: ["image/jpeg", "image/png"], size: 100 };
  const { passed, error } = beforeUploadValidate(file, condition);

  switch (error) {
    case "format":
      Message({ type: "danger", message: "图片格式只能是jpg/png" });
      break;
    case "size":
      Message({ type: "danger", message: "图片大小不可以超过1MB" });
      break;
  }
  return passed;
};
// 上传成功的回调
const handleFileUploaded = (rawData: ImageProps) => {
  if (rawData._id) {
    imageId.value = rawData._id;
  }
};

// 失去焦点事件
const handleBlur = () => {
  editorStatus.isValid = mdValue.value !== "";
};

// 提交
const store = useStore();
const router = useRouter();
const route = useRoute();
const onSubmitPost = (flag: boolean) => {
  if (!mdValue.value) {
    editorStatus.isValid = false;
  }

  if (!flag && !editorStatus.isValid) {
    return;
  }

  const payload: CreatePostProps = {
    title: titleVal.value,
    content: mdValue.value,
    author: store.state.user._id,
    column: store.state.user.column,
    image: imageId.value,
  };
  // 判断当前是编辑状态还是新建
  if (isEditor.value) {
    const { image, title, content } = payload;
    const queryId = route.query.id as string;
    reqUpdatePost(queryId, { title, content, image }).then(() => {
      Message({ type: "success", message: "更新文章成功，2秒后跳转至专栏" });
      setTimeout(() => {
        router.push({ name: "column", params: { id: payload.column } });
      }, 2000);
    });
  } else {
    store.dispatch("getCreatePost", payload).then(() => {
      Message({ type: "success", message: "新建文章成功，2秒后跳转至专栏" });
      setTimeout(() => {
        router.replace({ name: "column", params: { id: payload.column } });
      }, 2000);
    });
  }
};

onMounted(() => {
  if (route.query.id) {
    // 说明当前为编辑状态 获取文章信息
    isEditor.value = true;
    store.dispatch("getPostDetail", route.query.id).then(() => {
      const postDetail = store.getters.getPostDetailById(route.query.id);
      uploadImg.value = { url: postDetail.image.url };
      titleVal.value = postDetail.title;
      mdValue.value = postDetail.content;
    });
  }
});
</script>
<style scoped>
.create-post-page :deep(.file-upload-container) {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page :deep(.file-upload-container img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
  z-index: 9;
}
</style>
