export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface RulesProp{
  type:'required' | 'email' | 'password',
  message:string
}