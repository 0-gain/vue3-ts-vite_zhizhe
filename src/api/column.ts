import request from "@/utils/request";

// 获取专栏列表
export const reqColumnList = (currentPage: number, pageSize: number) =>
  request.get("/columns", { params: { currentPage, pageSize } });

// 获取一个专栏详情
export const reqColumnDetailInfo = (id:string)=>request.get(`columns/${id}`)
