export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface RulesProp {
  type: "required" | "email" | "password" | "nickName" | "custom";
  message: string;
  validator?: () => boolean;
}

export interface ImageProps {
  _id?: string;
  url?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
  column?: string;
}
interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalError {
  status: boolean;
  message: string;
}
export interface GlobalDataProps {
  token: string;
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<ColumnProps> };
  isLoading: boolean;
  user: UserProps;
  error: GlobalError;
}

export type MessageType = "primary" | "success" | "danger" | "warning";

export interface CreatePostProps{
  title:string,
  content:string,
  image?:string,
  column:string,
  author:string
}
