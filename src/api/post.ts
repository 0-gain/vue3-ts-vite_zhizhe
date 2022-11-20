import request from '@/utils/request'

// 获取专栏文章列表
export const reqPostList = (id:string,page?:string,size?:string)=>request.get(`columns/${id}/posts?currentPage=${page}&pageSize=${size}`)