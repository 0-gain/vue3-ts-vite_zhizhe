import { createStore,Commit } from "vuex";
import { GlobalDataProps } from "@/types/interface";
import { reqColumnList, reqColumnDetailInfo } from "@/api/column";
import {
  reqPostList,
  reqPostDetail,
  reqCreatePost,
  reqDeletePost,
} from "@/api/post";
import { reqUserLogin, reqCurrentUserInfo, reqRegisterUser } from "@/api/user";
import { objToArr, arrToObj } from "@/utils/helper";

const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem("token") || "",
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, total: 0 },
    isLoading: false,
    user: { isLogin: false },
    error: { status: false, message: "" },
  },
  mutations: {
    // 获取首页专栏
    SET_COLUMNS(state, rawData) {
      const { data } = state.columns;
      const { list, count, currentPage } = rawData.data;
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1,
      };
    },
    // 获取单独专栏信息
    SET_COLUMN(state, rawData) {
      state.columns.data[rawData._id] = rawData;
    },
    // 获取专栏信息
    SET_POSTS_LIST(state, rawData) {
      state.posts = {
        data: {
          ...state.posts.data,
          ...arrToObj(rawData.data.list),
        },
        total: rawData.data.count,
      };
    },
    // 设置Loading状态
    SET_LOADING(state, flag) {
      state.isLoading = flag;
    },
    // 获取文章详情
    SET_POST_DETAIL(state, post) {
      state.posts.data[post.data._id] = post.data;
    },
    // 设置token
    SET_TOKEN(state, token) {
      state.token = token;
      // 持久化token
      localStorage.setItem("token", token);
    },
    // 设置用户信息
    SET_USER_INFO(state, info) {
      state.user = {
        isLogin: true,
        ...info,
      };
    },
    // 设置错误信息
    SET_ERROR_MESSAGE(state, error) {
      state.error = error;
    },
    // 退出登录
    SET_LOGIN_OUT(state) {
      state.token = "";
      state.user = { isLogin: false };
      localStorage.removeItem("token");
    },
    // 删除文章
    SET_DELETE_POST(state, rawData) {
      delete state.posts.data[rawData.data._id];
    },
    // 新建文章
    SET_CREATE_POST(state,newPost){
      state.posts.data[newPost._id] = newPost
    }
  },
  actions: {
    // 获取专栏信息
    async getColumnList({ commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params;
      const res = await reqColumnList(currentPage, pageSize);
      commit("SET_COLUMNS", res);
    },
    // 获取一个专栏详情
    async getColumnDetailInfo({ commit, state }, id) {
      // 判断当前的id是否存在state.columns中
      if (state.columns.data[id]) {
        return;
      }
      const res = await reqColumnDetailInfo(id);
      commit("SET_COLUMN", res.data);
    },
    // 获取专栏文章
    async getPostsList({ commit }, params = {}) {
      const { id, pageSize: size = 5, currentPage: page = 1 } = params;
      const res = await reqPostList(id, page, size);
      commit("SET_POSTS_LIST", res);
    },

    // 获取单个文章信息
    async getPostDetail({ commit }, id) {
      const res = await reqPostDetail(id);
      commit("SET_POST_DETAIL", res);
    },

    // 用户登录
    async getUserLogin({ commit }, payload) {
      /* 
        111@test.com
        111111
      */
      const res = await reqUserLogin(payload);
      commit("SET_TOKEN", res.data.token);
    },
    // 获取当前用户的信息
    async getCurrentUserInfo({ commit }) {
      const res = await reqCurrentUserInfo();
      commit("SET_USER_INFO", res.data);
    },
    // 用户登录并获取当前用户信息
    LoginAndGetUserInfo({ dispatch }, payload) {
      return dispatch("getUserLogin", payload).then(() => {
        return dispatch("getCurrentUserInfo");
      });
    },

    // 注册新用户(接口没用)
    async getRegisterUser({ commit }, payload) {
      const res = await reqRegisterUser(payload);
      console.log(res);
    },

    // 新建文章
    async getCreatePost({ commit }, payload) {
      const res = await reqCreatePost(payload);
      commit('SET_CREATE_POST',res.data)
    },
    // 删除文章
    async getDeletePost({ commit }, id) {
      const res = await reqDeletePost(id);
      commit("SET_DELETE_POST", res);
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
    // 通过ID获取文章详情
    getPostDetailById: (state) => (id: string) => {
      return state.posts.data[id];
    },
  },
});

export default store;
