import { v4 as uuid } from 'uuid';
import { ITask } from '../../types/interface-types';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor(
    {
      id = uuid(),
      title = 'Autotest task',
      order = 0,
      description = 'Lorem ipsum',
      userId = null,
      boardId = null,
      columnId = null,
    } = {} as ITask
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
