export interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[] | null | undefined;
}