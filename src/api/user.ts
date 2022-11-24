import request from "@/utils/request";

// 用户登录
export const reqUserLogin = (data: object) => request.post("user/login", data);

// 获取当前用户信息
export const reqCurrentUserInfo = () => request.get("user/current");

// 注册新用户
export const reqRegisterUser = (data: object) => request.post("users", data);
