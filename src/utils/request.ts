import axios from "axios";
import store from "@/store";
const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    store.commit("SET_ERROR_MESSAGE", { status: false, message: "" });
    // 设置loading为true
    store.commit("SET_LOADING", true);
    // 添加token
    const token = store.state.token;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 设置loading为false
    store.commit("SET_LOADING", false);
    return res.data;
  },
  (err) => {
    // 设置loading为false
    store.commit("SET_LOADING", false);
    const { error } = err.response.data;
    store.commit("SET_ERROR_MESSAGE", { status: true, message: error });
    return Promise.reject(error);
  }
);

export default instance;
