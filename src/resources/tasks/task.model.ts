import { v4 as uuid } from 'uuid';
import { ITask } from '../../types/interface-types';

/** Class representing a task. */
class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  /**
   * Creates a task.
   * 
   * @param title - task's title
   * @param order - task's order
   * @param description - task's description
   * @param userId - user to which the task is assigned
   * @param boardId - board to which the task is assigned
   * @param columnId - column to which the task is assigned
   */
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
