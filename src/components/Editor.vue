<template>
  <div class="vue-easymde-editor">
    <textarea ref="textArea"></textarea>
  </div>
</template>

<script setup lang="ts">
import EasyMDE from "easymde";
import { ref, onMounted, watch } from "vue";

// 类型，属性以及事件
interface EditorProps {
  mdValue?: string;
}
interface EditorEvents {
  (type: "update:mdValue", value: string): void;
  (type: "on-blur"): void;
}
const props = defineProps<EditorProps>();
const emit = defineEmits<EditorEvents>();
const textArea = ref<null | HTMLTextAreaElement>(null);
const initialContent = ref(props.mdValue || "");

let easyMDEInstance: EasyMDE | null = null;
onMounted(() => {
  if (textArea.value) {
    easyMDEInstance = new EasyMDE({
      element: textArea.value,
      spellChecker: false,
      initialValue: initialContent.value,
    });
    easyMDEInstance.codemirror.on("change", () => {
      if (easyMDEInstance) {
        initialContent.value = easyMDEInstance.value();
        emit("update:mdValue", easyMDEInstance.value());
      }
    });
    easyMDEInstance.codemirror.on("blur", () => {
      emit("on-blur");
    });
  }
});

watch(
  () => props.mdValue,
  (newVal) => {
    if (easyMDEInstance) {
      if (newVal !== initialContent.value) {
        easyMDEInstance.value(newVal || "");
      }
    }
  }
);
</script>
<style scoped>
.vue-easymde-editor.is-invalid {
  border: 1px solid #dc3545;
}
</style>
