import { v4 as uuid } from 'uuid';
import { IBoard, IColumn } from '../../types/interface-types';

/** Class representing a board. */
class Board {
  id?: string;

  title: string;

  columns?: IColumn[] | null;

  /**
   * Creates a board.
   * 
   * @param  title - board's title
   * @param columns - board's columns
   */
  constructor({ id = uuid(), title = 'Board', columns = null } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
