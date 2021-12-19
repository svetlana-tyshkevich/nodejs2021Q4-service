import { v4 as uuid } from 'uuid';
import { IBoard, IColumn } from '../../types/interface-types';

class Board {
  id?: string;

  title: string;

  columns?: IColumn[] | null;

  constructor({ id = uuid(), title = 'Board', columns = null } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
