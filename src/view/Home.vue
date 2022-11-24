<template>
  <div class="home-page container-md">
    <section class="text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center mb-4">发现精彩</h4>
    <ColumnList :list="columnData" />
    <More @on-loading-more="handleMore"></More>
  </div>
</template>

<script setup lang="ts">
import ColumnList from "@/components/ColumnList.vue";
import { GlobalDataProps } from "@/types/interface";
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import More from "@/components/More.vue";

// 专栏信息
const store = useStore<GlobalDataProps>();
const columnData = computed(() => store.getters.getColumns);
const currentPage = ref<number>(1);
const pageSize = ref<number>(6);
onMounted(() => {
  store.dispatch("getColumnList", {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  });
});

// 点击加载更多专栏信息
const handleMore = () => {
  currentPage.value++;
  pageSize.value++;
  store.dispatch("getColumnList", {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  });
};
</script>
<style scoped lang="less"></style>
