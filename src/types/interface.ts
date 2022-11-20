export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface RulesProp {
  type: "required" | "email" | "password";
  message: string;
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
  column?:string
}
interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalDataProps {
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<ColumnProps> };
}
