import db  from '../../common/db';
import { ITask } from '../../types/interface-types';

let taskDB: ITask[] = db.tasks;

/**
 * Gets all tasks.
 * @param boardId - board to which the task is assigned
 * @returns list of all tasks
 */
const getAll = async (boardId: string): Promise<ITask[]> => {
  const tasks = taskDB.filter((task) => task.boardId === boardId);
  return tasks;
};

/**
 * Saves new task to tasks' list.
 * @param task - new task
 * @returns new task
 */
const createTask = async (task: ITask): Promise<ITask> => {
  taskDB.push(task);

  return task;
};

/**
 * Gets task with specified ID.
 * @param boardId - board to which the task is assigned
 * @param taskId - task's ID
 * @returns found task
 */
const getTaskByID = async (boardId: string, taskId: string): Promise<ITask> => {
  const task = taskDB.find(
    (item) => item.boardId === boardId && item.id === taskId
  );
  if (!task) throw Error('error');
  return task;
};

/**
 * Updates specific task with new data.
 * @param boardId - board to which the task is assigned
 * @param id - board's ID
 * @param taskBody - new data for task
 * @returns updated task
 */
const updateTask = async (
  _boardId: string,
  id: string,
  taskBody: ITask
): Promise<ITask | undefined> => {
  const currentIndex = taskDB.findIndex((item) => item.id === id);
  taskDB[currentIndex] = { ...taskBody };
  return taskDB[currentIndex];
};

/**
 * Deletes task from tasks' list.
 * @param boardId - board to which the task is assigned
 * @param taskId - task's ID
 * @returns deleted task
 */
const deleteTask = async (
  _boardId: string,
  taskId: string
): Promise<ITask | undefined> => {
  const currentIndex = [...taskDB].findIndex(
    (item) => item && item.id === taskId
  );
  if (currentIndex === -1) throw Error('error');
  const currentItem = taskDB[currentIndex];
  taskDB.splice(currentIndex, 1);
  return currentItem;
};

/**
 * Deletes all tasks which are assigned to the board for board deleting.
 * @param boardId - board's ID
 */
const deleteBoardTasks = async (boardId: string): Promise<void> => {
  taskDB = taskDB.filter((item) => item.boardId !== boardId);
};

/**
 * Unassign all tasks from the user for board deleting.
 * @param userId - user's ID
 */
const deleteUserTasks = async (userId: string): Promise<void> => {
  taskDB
    .filter((item) => item.userId === userId)
    .forEach((item) => {
      const copy = item;
      copy.userId = null;
      return copy;
    });
};

export default {
  getAll,
  createTask,
  getTaskByID,
  deleteTask,
  updateTask,
  deleteBoardTasks,
  deleteUserTasks,
};
