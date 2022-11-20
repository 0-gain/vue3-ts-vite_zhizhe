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
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
    >
      加载更多
    </button>
  </div>
</template>

<script setup lang="ts">
import ColumnList from "@/components/ColumnList.vue";
import { GlobalDataProps } from "@/types/interface";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

// 专栏信息
const store = useStore<GlobalDataProps>();
const columnData = computed(() => store.getters.getColumns);

onMounted(() => {
  store.dispatch("getColumnList");
});
</script>
<style scoped lang="less"></style>
