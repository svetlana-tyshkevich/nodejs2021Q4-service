import { v4 as uuid } from 'uuid';

class Board {
  constructor({ id = uuid(), title = 'Board', columns = null } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
