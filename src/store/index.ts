import { createStore } from "vuex";
import { GlobalDataProps } from "@/types/interface";
import { reqColumnList, reqColumnDetailInfo } from "@/api/column";
import { reqPostList } from "@/api/post";
import { objToArr, arrToObj } from "@/utils/helper";
const store = createStore<GlobalDataProps>({
  state: {
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {} },
  },
  mutations: {
    // 获取首页专栏
    COLUMNS(state, rawData) {
      const { data } = state.columns;
      const { list, count, currentPage } = rawData.data;
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1,
      };
    },
    // 获取单独专栏信息
    COLUMN(state, rawData) {
      state.columns.data[rawData._id] = rawData;
    },
    // 获取专栏信息
    POSTS_LIST(state, rawData) {
      state.posts = {
        data: {
          ...state.posts.data,
          ...arrToObj(rawData.data.list),
        },
      };
    },
  },
  actions: {
    // 获取专栏信息
    async getColumnList({ commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params;
      const res = await reqColumnList(currentPage, pageSize);
      commit("COLUMNS", res);
    },
    // 获取一个专栏详情
    async getColumnDetailInfo({ commit, state }, id) {
      // 判断当前的id是否存在state.columns中
      if (state.columns.data[id]) {
        return;
      }
      const res = await reqColumnDetailInfo(id);
      commit("COLUMN", res.data);
    },
    // 获取专栏文章
    async getPostsList({ commit }, params = {}) {
      const { id, size = 5, page = 1 } = params;
      const res = await reqPostList(id, page, size);
      commit("POSTS_LIST", res);
    },
  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.columns.data);
    },
    // 通过ID获取文章
    getColumById: (state) => (id: string) => {
      return state.columns.data[id];
    },
    // 通过ID获取专栏文章
    getPostsById: (state) => (id: string) => {
      // 将state.posts.data转换为数组，通过filter找出column等于id的数据
      return objToArr(state.posts.data).filter((post) => post.column === id);
    },
  },
});

export default store;
