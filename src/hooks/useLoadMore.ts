import { ref, ComputedRef, computed } from "vue";
import { useStore } from "vuex";

interface LoadParams {
  id?: string;
  currentPage: number;
  pageSize: number;
}
export default (
  dispatchName: string,
  total: ComputedRef<number>,
  params: LoadParams
) => {
  const store = useStore();
  const currentPage = ref(params.currentPage);
  const payload = computed(() => {
    return {
      id: params.id || "",
      currentPage: currentPage.value,
      pageSize: params.pageSize,
    };
  });

  // 加载内容
  const loadMore = () => {
    store.dispatch(dispatchName, payload.value).then(() => {
      currentPage.value++;
    });
  };

  // 是否是最后一页
  const isLastPage = (): boolean => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value;
  };
  return {
    loadMore,
    isLastPage,
  };
};
