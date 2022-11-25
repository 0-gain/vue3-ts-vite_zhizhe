<template>
  <div class="home-page container-md">
    <section class="text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link
              :to="{ name: 'createPost' }"
              class="btn btn-primary my-2"
              >开始写文章</router-link
            >
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center mb-4">发现精彩</h4>
    <ColumnList :list="columnData" />
    <More v-if="!isLastPage()" @on-loading-more="loadMore"></More>
  </div>
</template>

<script setup lang="ts">
import ColumnList from "@/components/ColumnList.vue";
import { GlobalDataProps } from "@/types/interface";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import More from "@/components/More.vue";
import useLoadMore from "@/hooks/useLoadMore";

// 专栏信息
const store = useStore<GlobalDataProps>();
const columnData = computed(() => store.getters.getColumns);
const total = computed(() => store.state.columns.total);

onMounted(() => {
  store.dispatch("getColumnList", {
    currentPage: 1,
    pageSize: 6,
  });
});
// 点击加载更多专栏信息
const { loadMore, isLastPage } = useLoadMore("getColumnList", total, {
  currentPage: 2,
  pageSize: 6,
});
</script>
<style scoped lang="less"></style>
