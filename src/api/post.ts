import request from "@/utils/request";
import { CreatePostProps } from "@/types/interface";

// 获取专栏文章列表
export const reqPostList = (id: string, page?: string, size?: string) =>
  request.get(`columns/${id}/posts?currentPage=${page}&pageSize=${size}`);

// 获取单个文章信息
export const reqPostDetail = (id: string) => request.get(`posts/${id}`);

// 新建一篇文章
export const reqCreatePost = (data: CreatePostProps) =>
  request.post("posts", data);

// 更新单个文章
export const reqUpdatePost = (id: string, data: object) =>
  request.patch(`posts/${id}`, data);

// 删除单个文章
export const reqDeletePost = (id:string) => request.delete(`posts/${id}`);
